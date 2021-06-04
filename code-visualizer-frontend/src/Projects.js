import { useState } from "react";
import axios from "axios";
import { Chevron } from "./Chevron";
import ClickableProject from "./ClickableProject";

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
  setMetricPicked
) {
  axios
    .get("http://localhost:5000/projects", {
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
            />
          );
        })
      );
    })
    .catch(function (e) {
      console.log(e);
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
            setMetricPicked
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
      {isDropdownActive ? MyProjects : <></>}
    </div>
  );
}

export default Projects;
