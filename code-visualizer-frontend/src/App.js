import FileUpload from "./FileUpload";
import "../src/styles/compiled/main.css";
import Canvas from "./Canvas/Canvas";
import Projects from "./Projects";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [userToken, setUserToken] = useState(
    localStorage.getItem("user")
      ? localStorage.getItem("user")
      : localStorage.setItem("user", uuidv4().split("-").join("").slice(0, 10))
  );
  const [MyProjects, setMyProjects] = useState([]);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  console.log(currentProject);
  return (
    <body>
      <div className="App">
        <div className={"controls"}>
          <FileUpload userToken={userToken} />
          <Projects
            userToken={userToken}
            isDropdownActive={isDropdownActive}
            setIsDropdownActive={setIsDropdownActive}
            MyProjects={MyProjects}
            setMyProjects={setMyProjects}
            currentProject={currentProject}
            setCurrentProject={setCurrentProject}
          />
        </div>
        <Canvas />
      </div>
    </body>
  );
}

export default App;
