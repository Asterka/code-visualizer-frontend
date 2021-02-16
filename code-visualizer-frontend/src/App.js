import FileUpload from "./FileUpload";
import "../src/styles/compiled/main.css";
import Canvas from "./Canvas";
import {useState} from "react";
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [userToken, setUserToken] = useState(uuidv4());

  return (
    <body>
      <div className="App">
        <FileUpload userToken={userToken}/>
        <Canvas/>
        
      </div>
    </body>
  );
}

export default App;
