import React from "react";
import { codeVisualizerServer } from "./config";
import axios from "axios";

export default function ClickableProject(props) {
  return (
    <h1
      key={props.id}
      className={`clickable-project${
        props.id === props.currentProject ? "-chosen" : ""
      } xyz-in`}
      /* When choosing the project from the list, up */
      onClick={() => {
        props.setIsDropdownActive(false);
        props.setCurrentProject(props.id);
        if (
          props.metricPicked.metricShortNames[props.metricPicked.chosen] !=
          "COMPLEXITY"
        ) {
          axios
            .get(
              `${codeVisualizerServer.address}/metrics/${props.user_token}/${
                props.id
              }/${
                props.metricPicked.metricShortNames[props.metricPicked.chosen]
              }`,
              {}
            )
            .then(function (res) {
              console.log(res);
              props.setProjectData(res);
              let date = new Date(res.data.timestamp);
              props.setMessage({
                opcode: 1,
                msg: `You have successfully loaded data from ${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
              });
              props.setShowMessage(true);
            })
            .catch(function (e) {
              switch (e.response.status) {
                case 404:
                  props.setMessage({
                    opcode: 0,
                    msg: `Such project was not found in the system`,
                  });
                  props.setShowMessage(true);
              }
            });
        }else{
          axios
          .get(
            `${codeVisualizerServer.address}/metrics/${props.user_token}/${props.id}/connections`,
            {}
          )
          .then((res) => {
            props.setClassDependencies(res.data);
          });
        }
      }}
    >
      {props.id}
    </h1>
  );
}
