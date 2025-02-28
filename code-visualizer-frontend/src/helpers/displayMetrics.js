/* Helper function to sort the metrics data for LOC metric
 * @param {Array} data - metrics in their entireity as described in the paper
 * @param {number} levelState - Report level state, obtained in the RangeInput Component
 * @param {Object} scene - ThreeJS scene Object to render into Canvas
 * @param {number} planeSize - Size of the target scene plane
 */
exports.LOC = (THREE, data, scene, levelState, planeSize, inspectedClass) => {
  let meshX = -planeSize / 2;
  let meshY = meshX;
  let maxViolations = 0;
  let minViolations = 0;
  let dataObjects = [];
  while (scene.children.length > 0) {
    scene.remove(scene.children[0]);
  }

  /* If there are no files, no need to bother ourleves with looking */
  if (data.files ?? [].length > 0) {
    /* map all the files from the input, which represents an Array of classes, files is an Array of Objects each representing a number
    of violations*/
    data = data.files.map((element) => {
      /*Sort all the violations in each file in a descending order TODO, write a comparator module*/
      return {
        violations: element.violations.filter((volation) => {
          return volation.endline - volation.beginline < levelState;
        }),
        filename: element.filename,
      };
    });

    /* From the previous step, filter all the LOC reports with threshold criteria more than two for each class: 
    TODO, add criteria UI component*/
    data = data.filter((element) => {
      return element.violations.length > 2;
    });
    /* Calculate the dimension criteria for each building in the report */
    let cubeSide = Math.ceil(planeSize / (Math.sqrt(data.length) * 2));
    for (var i = 0; i < data.length; i++) {
      if (data[i].violations.length >= maxViolations) {
        maxViolations = data[i].violations.length;
      }
      if (data[i].violations.length <= minViolations) {
        minViolations = data[i].violations.length;
      }
    }
    const lineMaterial = new THREE.LineBasicMaterial( { color: 0x00bbff, linewidth: 200} );
    for (var i = 0; i < data.length; i++) {
      let color = Math.floor(
        (data[i].violations.length / maxViolations) * 255
      ).toString(16);
      color = color.length == 1 ? "0" + color : color;

      var building = new THREE.Mesh(
        new THREE.BoxGeometry(
          cubeSide,
          (10 * data[i].violations.length) / maxViolations,
          cubeSide
        ),
        !inspectedClass.className ||
        inspectedClass.className != data[i].filename
          ? new THREE.MeshLambertMaterial({
              color: `#${color}00AA`,
            })
          : new THREE.MeshLambertMaterial({
              color: `#FFBF00`,
            })
      );

      const points = [];
      
      points.push( new THREE.Vector3( meshX, 1 + (10 * data[i].violations.length) / maxViolations, meshY ) );
      points.push( new THREE.Vector3( meshX, 3 + (10 * data[i].violations.length) / maxViolations, meshY ) );
      
      const lineGeometry = new THREE.BufferGeometry().setFromPoints( points );
      const line = new THREE.Line( lineGeometry, lineMaterial );
      scene.add( line );
      building.position.x = meshX;
      building.position.y =
        1 + (10 * data[i].violations.length) / maxViolations / 2;
      building.position.z = meshY;
      building.metrics = data[i];
      scene.add(building);
      if (meshX > planeSize / 2) {
        meshX = Math.floor(-planeSize / 2);
        meshY += cubeSide * 2;
      } else {
        meshX += cubeSide * 2;
      }
    }
  }
  return scene;
};

exports.CBO = (THREE, data, scene, levelState, planeSize, inspectedClass) => {
  let meshX = -planeSize / 2;
  let meshY = meshX;
  let maxViolations = 0;
  let minViolations = 0;
  let dataObjects = [];

  while (scene.children.length > 0) {
    scene.remove(scene.children[0]);
  }

  /* If there are no files, no need to bother ourleves with looking */
  if (data.files ?? [].length > 0) {
    /* map all the files from the input, which represents an Array of classes, files is an Array of Objects each representing a number
    of violations*/
    data = data.files.map((element) => {
      return {
        violations: element.violations,
        filename: element.filename
      }
    });

    console.log(data);

    /* From the previous step, filter all the LOC reports with threshold criteria more than two for each class: 
    TODO, add criteria UI component*/
    // data = data.filter((element) => {
      
    // });
    /* Calculate the dimension criteria for each building in the report */
    let cubeSide = Math.ceil(planeSize / (Math.sqrt(data.length) * 2));
    for (var i = 0; i < data.length; i++) {
      if (data[i].violations.length >= maxViolations) {
        maxViolations = data[i].violations.length;
      }
      if (data[i].violations.length <= minViolations) {
        minViolations = data[i].violations.length;
      }
    }

    for (var i = 0; i < data.length; i++) {
      let color = Math.floor(
        (data[i].violations.length / maxViolations) * 255
      ).toString(16);
      color = color.length == 1 ? "0" + color : color;

      var building = new THREE.Mesh(
        new THREE.BoxGeometry(
          cubeSide,
          (10 * data[i].violations.length) / maxViolations,
          cubeSide
        ),
        !inspectedClass.className ||
        inspectedClass.className != data[i].filename
          ? new THREE.MeshLambertMaterial({
              color: `#${color}00AA`,
            })
          : new THREE.MeshLambertMaterial({
              color: `#FFBF00`,
            })
      );
      building.position.x = meshX;
      building.position.y =
        1 + (10 * data[i].violations.length) / maxViolations / 2;
      building.position.z = meshY;
      building.metrics = data[i];
      scene.add(building);
      if (meshX > planeSize / 2) {
        meshX = Math.floor(-planeSize / 2);
        meshY += cubeSide * 2;
      } else {
        meshX += cubeSide * 2;
      }
    }
  }
  return scene;
};
