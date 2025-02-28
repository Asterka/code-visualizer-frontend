import FileUpload from "./FileUpload";
import "../src/styles/compiled/main.css";
import Canvas from "./Canvas/Canvas";
import Projects from "./Projects";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import MetricPicker from "./MetricPicker";
import RangeInput from "./RangeInput/RangeInput";
import { render } from "@testing-library/react";

function App() {
  const [userToken, setUserToken] = useState(
    localStorage.getItem("user")
      ? localStorage.getItem("user")
      : localStorage.setItem("user", uuidv4().split("-").join("").slice(0, 10))
  );
  const [MyProjects, setMyProjects] = useState([]);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [projectData, setProjectData] = useState(null);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(true);
  const [levelState, setLevelState] = useState(0);
  const [inspectedClass, setInspectedClass] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [canvasGeneral, setCanvasGeneral] = useState(null)
  const [classDependencies, setClassDependencies] = useState(null);
  /* User-chosen metric */
  const [metricPicked, setMetricPicked] = useState({
    chosen: 0,
    metricShortNames: ["LOC", "CBO", "CYCOMP", "COMPLEXITY"],
  });

  return (
    <body>
      <div className="App">
        <div className={"controls"}>
          <FileUpload
            userToken={userToken}
            setShowMessage={setShowMessage}
            showMessage={showMessage}
            setMessage={setMessage}
            message={message}
          />
          <Projects
            userToken={userToken}
            isDropdownActive={isDropdownActive}
            setIsDropdownActive={setIsDropdownActive}
            MyProjects={MyProjects}
            setMyProjects={setMyProjects}
            currentProject={currentProject}
            setCurrentProject={setCurrentProject}
            setProjectData={setProjectData}
            setShowMessage={setShowMessage}
            showMessage={showMessage}
            setMessage={setMessage}
            message={message}
            metricPicked={metricPicked}
            setMetricPicked={setMetricPicked}
            classDependencies={classDependencies}
            setClassDependencies={setClassDependencies}
          />
          <MetricPicker
            isDropdownActive={isDropdownActive}
            metricPicked={metricPicked}
            setMetricPicked={setMetricPicked}
            setProjectData={setProjectData}
            project_id={currentProject}
            user_token={userToken}
            setShowMessage={setShowMessage}
            setMessage={setMessage}
            setClassDependencies={setClassDependencies}
          />

          <RangeInput levelState={levelState} setLevelState={setLevelState} />
        </div>
        <Canvas
          projectData={projectData}
          levelState={levelState}
          inspectedClass={inspectedClass}
          setInspectedClass={setInspectedClass}
          isListening={isListening}
          setIsListening={setIsListening}
          setMessage={setMessage}
          setShowMessage={setShowMessage}
          canvasGeneral={canvasGeneral}
          setCanvasGeneral={setCanvasGeneral}
          classDependencies={classDependencies}
        />

      </div>
    </body>
  );
}

export default App;
