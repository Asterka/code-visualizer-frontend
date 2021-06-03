import { useState } from "react";
import axios from "axios";
import { Chevron } from "./Chevron";
import ClickableProject from "./ClickableProject";

function getProjects(
  token,
  setMyProjects,
  isDropdownActive,
  setIsDropdownActive,
  currentProject,
  setCurrentProject
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
            isDropdownActive,
            setIsDropdownActive,
            currentProject,
            setCurrentProject
          );
        }}
      >
        {currentProject!=null?currentProject:"Choose project to inspect"}
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
