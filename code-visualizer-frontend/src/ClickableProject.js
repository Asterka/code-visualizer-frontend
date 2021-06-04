import React from "react";
import axios from "axios";

export default function ClickableProject(props) {
  return (
    <h1
      className={`clickable-project${
        props.id === props.currentProject ? "-chosen" : ""
      }`}
      /* When choosing the project from the list, up */
      onClick={() => {
        props.setIsDropdownActive(false);
        props.setCurrentProject(props.id);
        axios
          .get(
            `http://localhost:5000/metrics/${props.user_token}/${props.id}/${props.metricPicked.metricShortNames[props.metricPicked.chosen]}`,
            {}
          )
          .then(function (res) {
            props.setProjectData(res);
          })
          .catch(function (e) {
            switch (e.response.status) {
              case 404:
                props.setMessage({ opcode: 0, msg: `Such project was not found in the system` });
                props.setShowMessage(true);
            }
          });
      }}
    >
      {props.id}
    </h1>
  );
}
