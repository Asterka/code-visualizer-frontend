import { useState } from "react";
import axios from "axios";
import { Chevron } from "./Chevron";
import ClickableProject from "./ClickableProject";
import { codeVisualizerServer } from "./config";

function getProjects(
  token,
  setMyProjects,
  setIsDropdownActive,
  currentProject,
  setCurrentProject,
  setProjectData,
  setShowMessage,
  showMessage,
  setMessage,
  message,
  metricPicked,
  setMetricPicked,
  setClassDependencies
) {
  axios
    .get(`${codeVisualizerServer.address}/projects`, {
      params: {
        token: token,
      },
    })
    .then(function (res) {
      setMyProjects(
        res.data.projects.map((project) => {
          return (
            <ClickableProject
              id={project}
              setIsDropdownActive={setIsDropdownActive}
              setCurrentProject={setCurrentProject}
              currentProject={currentProject}
              user_token={token}
              setProjectData={setProjectData}
              setShowMessage={setShowMessage}
              showMessage={showMessage}
              setMessage={setMessage}
              message={message}
              metricPicked={metricPicked}
              setMetricPicked={setMetricPicked}
              setClassDependencies={setClassDependencies}
            />
          );
        })
      );
      
    })
    .catch(function (e) {
      setMessage({opcode:0, msg: "Could not get to the server. Make sure the server is running, and check config.js"});
      setShowMessage(true);
    });
}

function Projects({
  isDropdownActive,
  setIsDropdownActive,
  userToken,
  MyProjects,
  setMyProjects,
  currentProject,
  setCurrentProject,
  setProjectData,
  setShowMessage,
  showMessage,
  setMessage,
  message,
  metricPicked,
  setMetricPicked,
  classDependencies,
  setClassDependencies
}) {
  return (
    <div className="projects">
      <h1
        className={`current-projects`}
        onClick={() => {
          setIsDropdownActive(!isDropdownActive);
          getProjects(
            userToken,
            setMyProjects,
            setIsDropdownActive,
            currentProject,
            setCurrentProject,
            setProjectData,
            setShowMessage,
            showMessage,
            setMessage,
            message,
            metricPicked,
            setMetricPicked,
            setClassDependencies
          );
        }}
      >
        {currentProject != null ? currentProject : "Choose project to inspect"}
        <Chevron
          isActive={!isDropdownActive}
          color={"white"}
          width={"16px"}
          height={"16px"}
        />
      </h1>
      {isDropdownActive ? <div xyz="fade duration-4 ease-in-out stagger">{MyProjects}</div> : <></>}
    </div>
  );
}

export default Projects;
