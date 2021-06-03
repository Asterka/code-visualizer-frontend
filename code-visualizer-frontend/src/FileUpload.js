import React, { Fragment, useState } from "react";
import Message from "./Message/Message";
import axios from "axios";

const FileUpload = ({ userToken }) => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState(null);
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(true);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("token", userToken);
    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { fileName, filePath } = res.data;

      setFilename(null);
      setMessage({opcode: 1, msg:`File ${fileName} has successfully been uploaded`});
      setShowMessage(true);

    } catch (err) {
      if (err.response.status === 500) {
        setMessage({opcode: 0, msg:`Critical error on the server: ${JSON.stringify(err.response.data.data)}`});
        setShowMessage(true);
      } else {
        setMessage({opcode: 0, msg:err.response.data});
        setShowMessage(true);
      }
    }
  };

  return (
    <div>
      {message ? (
        <Message
          msg={message.msg}
          showMessage={showMessage}
          setShowMessage={setShowMessage}
          ok={message.opcode}
        />
      ) : null}
      <form onSubmit={onSubmit}>
        <label className="custom-file-upload">
          <input
            type="file"
            accept="application/java-archive"
            id="customFile"
            style={{
              color: "white",
              fontFamily: "Roboto",
              fontSize: "20px",
            }}
            onChange={onChange}
          />
          {"Choose project file to upload"}
        </label>
        <h1 style={{color:'white'}}>{filename ? "File " + filename + " has been chosen" : ''}</h1>

        <input
          type="submit"
          value="Upload file"
          style={{backgroundColor:"white", color:"black"}}
          className={`${filename ? "visible" : "hidden"}`}
        />
      </form>
    </div>
  );
};

export default FileUpload;
