import FileUpload from "./FileUpload";
import "../src/styles/compiled/main.css";
import Canvas from "./Canvas";
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
  return (
    <body>
      <div className="App">
        <FileUpload userToken={userToken} />
        <Canvas />
        <Projects userToken={userToken} MyProjects={MyProjects} setMyProjects={setMyProjects} />
      </div>
    </body>
  );
}

export default App;
