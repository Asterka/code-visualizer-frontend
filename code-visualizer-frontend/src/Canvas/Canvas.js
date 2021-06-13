import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { GUI } from "../GUI";

import { useEffect, useRef } from "react";
import { LOC } from "../helpers/displayMetrics";
let rendering = false;

function renderBase(data, metric, levelState) {
  function main() {
    const canvas = document.getElementById("canvas");
    const renderer = new THREE.WebGLRenderer({ canvas });

    renderer.setSize(window.innerWidth, window.innerHeight);
    const fov = 45;
    const aspect = window.innerWidth / window.innerHeight; // the canvas default
    const near = 0.1;
    const far = 300;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 100, 100);

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0);
    controls.update();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#060A27");
    const planeSize = 40;
    {
      const loader = new THREE.TextureLoader();
      const texture = loader.load(
        "https://im0-tub-ru.yandex.net/i?id=56d24402bb1ed0a0e3df9628efebb217-l&n=13"
      );
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.magFilter = THREE.NearestFilter;
      const repeats = planeSize / 2;
      texture.repeat.set(repeats, repeats);

      const planeGeo = new THREE.PlaneGeometry(planeSize*2, planeSize*2);
      const planeMat = new THREE.MeshPhongMaterial({
        map: texture,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(planeGeo, planeMat);
      mesh.rotation.x = Math.PI * -0.5;
      scene.add(mesh);
    }
    {
      switch(metric){
        case 'LOC':
          LOC(THREE, data, scene, levelState, planeSize)
      }
    }

    class ColorGUIHelper {
      constructor(object, prop) {
        this.object = object;
        this.prop = prop;
      }
      get value() {
        return `#${this.object[this.prop].getHexString()}`;
      }
      set value(hexString) {
        this.object[this.prop].set(hexString);
      }
    }

    {
      const skyColor = 0xb1e1ff; // light blue
      const groundColor = 0xb97a20; // brownish orange
      const intensity = 1;
      const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
      scene.add(light);

      const gui = new GUI();
      gui
        .addColor(new ColorGUIHelper(light, "color"), "value")
        .name("skyColor");
      gui
        .addColor(new ColorGUIHelper(light, "groundColor"), "value")
        .name("groundColor");
      gui.add(light, "intensity", 0, 2, 0.01);
    }

    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }

    function render() {
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      renderer.render(scene, camera);

      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
    cancelAnimationFrame(render);

    var animate = function () {
      requestAnimationFrame(animate);
      scene.rotateY(0.001);
      renderer.setAnimationLoop(null);
      renderer.render(scene, camera);
    };
    if (!rendering) {
      animate();
      rendering=true;
    }
  }
  main();
}

const Canvas = (props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (props.projectData !== null) {
      let metric = props.projectData.config.url.split("/");
      renderBase(
        props.projectData.data,
        metric[metric.length - 1],
        props.levelState
      );
    } else {
      renderBase([], null);
    }
  }, [props.projectData, props.levelState]);

  return (
    <canvas
      id={"canvas"}
      ref={canvasRef}
      width={"100vw"}
      height={"100vh"}
    ></canvas>
  );
};

export default Canvas;
