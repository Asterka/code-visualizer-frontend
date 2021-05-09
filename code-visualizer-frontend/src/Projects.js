import { useState } from "react";
import axios from "axios";

function getProjects(token, setMyProjects) {
  axios
    .get("http://localhost:5000/projects", {
      params: {
        token: token,
      },
    })
    .then(function (res) {
      setMyProjects(res.data.projects.map((project) => {
        return <h1>{project}</h1>
      }));
    })
    .catch(function (e) {
      console.log(e);
    });
}

function Projects({ userToken, MyProjects, setMyProjects }) {
  return (
    <div className="projects">
      <h1>Projects</h1>
      <button onClick={() => getProjects(userToken, setMyProjects)}>
        Get my projects
      </button>
      {MyProjects}
    </div>
  );
}

export default Projects;
