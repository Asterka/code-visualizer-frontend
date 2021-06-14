import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { GUI } from "../GUI";

import { useEffect, useRef } from "react";
import { LOC } from "../helpers/displayMetrics";
let rendering = false;
let camera = null;
let controls = null;
let plane = null;
function renderBase(
  data,
  metric,
  levelState,
  inspectedClass,
  setInspectedClass = () => {},
  isListening,
  setIsListening,
  setMessage = () => {},
  setShowMessage = () => {}
) {
  function main() {
    const canvas = document.getElementById("canvas");
    const renderer = new THREE.WebGLRenderer({ canvas });
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#060A27");
    const fov = 45;
    const aspect = window.innerWidth / window.innerHeight; // the canvas default
    const near = 0.1;
    const far = 300;
    renderer.setSize(window.innerWidth, window.innerHeight);

    var selectedObject;
    var raycaster = new THREE.Raycaster();
    function listenClick(event, renderer) {
      setIsListening(false);
      var mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      var intersects = raycaster.intersectObjects(scene.children); //array
      if (intersects.length > 0) {
        selectedObject = intersects[0];
        /* if the object is not the plane underneath */
        if (selectedObject.object.geometry.type != "PlaneGeometry") {
          if (
            Object.keys(inspectedClass) < 0 ||
            inspectedClass.className != selectedObject.object.metrics.filename
          ) {
            setInspectedClass({
              metrics: selectedObject.object.metrics,
              className: selectedObject.object.metrics.filename,
            });
            setMessage({
              opcode: 1,
              msg: `${selectedObject.object.metrics.filename}`,
            });
            setShowMessage(true);
          }
        } else {
          setInspectedClass({
            metrics: [],
            className: "NONE",
          });
          setMessage({ opcode: 1, msg: `No class selected` });
          setShowMessage(true);
        }
      } else {
        setInspectedClass({
          metrics: [],
          className: "NONE",
        });
      }
    }

    if (!isListening) {
      setIsListening(true)
      renderer.domElement.addEventListener(
        "click",
        (event) => listenClick(event, renderer),
        { once: true }
      );
    }

    if (!camera) {
      camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.set(0, 100, 100);
      controls = new OrbitControls(camera, canvas);
      controls.target.set(0, 5, 0);
      controls.update();
    }

    const planeSize = 40;
    {
      switch (metric) {
        /* We can add more and more metrics here */
        case "LOC":
          LOC(THREE, data, scene, levelState, planeSize, inspectedClass);
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
      rendering = true;
    }
  }
  main();
}

const Canvas = (props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (props.projectData !== null) {
      let metric = props.projectData.config.url.split("/");
      {
        renderBase(
          props.projectData.data,
          metric[metric.length - 1],
          props.levelState,
          props.inspectedClass,
          props.setInspectedClass,
          props.isListening,
          props.setIsListening,
          props.setMessage,
          props.setShowMesseage
        );
      }
    } else {
      renderBase(
        [],
        [],
        undefined,
        undefined,
        undefined,
        props.isListening,
        props.setIsListening
      );
    }
  }, [props.projectData, props.levelState, props.inspectedClass, props.isListening]);

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
