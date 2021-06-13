/* Helper function to sort the metrics data for LOC metric
 * @param {Array} data - metrics in their entireity as described in the paper
 * @param {number} levelState - Report level state, obtained in the RangeInput Component
 * @param {Object} scene - ThreeJS scene Object to render into Canvas
 * @param {number} planeSize - Size of the target scene plane
 */
exports.LOC = (THREE, data, scene, levelState, planeSize) => {
  let meshX = -planeSize / 2;
  let meshY = meshX;
  let maxViolations = 0;
  let minViolations = 0;
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

    for (var i = 0; i < data.length; i++) {
      var building = new THREE.Mesh(
        new THREE.BoxGeometry(
          cubeSide,
          (10 * data[i].violations.length) / maxViolations,
          cubeSide
        ),
        new THREE.MeshLambertMaterial({
          color: `#${Math.floor(
            (data[i].violations.length / maxViolations) * 255
          ).toString(16)}0000`,
        })
      );
      building.position.x = meshX;
      building.position.y =
        1 + (10 * data[i].violations.length) / maxViolations / 2;
      building.position.z = meshY;
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
