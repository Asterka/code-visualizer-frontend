import React from "react";
import axios from "axios";
import { Chevron } from "./Chevron";
import { codeVisualizerServer } from "./config";

export default function MetricPicker({
  isDropdownActive,
  setMetricPicked,
  metricPicked,
  setProjectData,
  setMessage,
  setShowMessage,
  user_token,
  project_id,
  setClassDependencies
}) {
  return (
    <div className={"metric-picker"}>
      <button
        onClick={() => {
          if (user_token != null && project_id != null) {
            //console.log(project_id);
            let temp = metricPicked;
            temp.chosen != 0
              ? (temp.chosen -= 1)
              : (temp.chosen = temp.metricShortNames.length - 1);
            //console.log(temp)
            setMetricPicked(Object.assign({}, temp));
            setMessage({
              opcode: 1,
              msg: "Your files are being retrieved from the server",
            });
            setShowMessage(true);
            console.log(temp.metricShortNames[temp.chosen])
            if (
              temp.chosen != temp.metricShortNames.length - 1
            ){
            axios
              .get(
                `${
                  codeVisualizerServer.address
                }/metrics/${user_token}/${project_id}/${
                  metricPicked.metricShortNames[metricPicked.chosen]
                }`,
                {}
              )
              .then(function (res) {
                let date = new Date(res.data.timestamp);
                setMessage({
                  opcode: 1,
                  msg: `You have successfully loaded data from ${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}
                Metric: ${metricPicked.metricShortNames[metricPicked.chosen]}`,
                });
                setShowMessage(true);
                setProjectData(res);
              })
              .catch(function (e) {
                switch (e.response.status) {
                  case 404:
                    setMessage({
                      opcode: 0,
                      msg: `Such project was not found in the system`,
                    });
                    setShowMessage(true);
                }
              });
            } else{
                axios
                .get(
                  `${codeVisualizerServer.address}/metrics/${user_token}/${project_id}/connections`,
                  {}
                )
                .then((res) => {
                  setClassDependencies(res.data);
                });
              }
          } else {
            setMessage({
              opcode: 0,
              msg: `First choose the project`,
            });
            setShowMessage(true);
          }
        }}
      >
        Previous
      </button>
      <h1>{metricPicked.metricShortNames[metricPicked.chosen]}</h1>
      <button
        onClick={() => {
          if (user_token != null && project_id != null) {
            let temp = metricPicked;
            temp.chosen != temp.metricShortNames.length - 1
              ? (temp.chosen += 1)
              : (temp.chosen = 0);
            //console.log(temp)
            setMetricPicked(Object.assign({}, temp));
            if (
              temp.chosen != 0
            ){
            axios
              .get(
                `${
                  codeVisualizerServer.address
                }/metrics/${user_token}/${project_id}/${
                  metricPicked.metricShortNames[metricPicked.chosen]
                }`,
                {}
              )
              .then(function (res) {
                setProjectData(res);
              })
              .catch(function (e) {
                switch (e.response.status) {
                  case 404:
                    setMessage({
                      opcode: 0,
                      msg: `Such project was not found in the system`,
                    });
                    setShowMessage(true);
                }
              });
            }else{
                axios
                .get(
                  `${codeVisualizerServer.address}/metrics/${user_token}/${project_id}/connections`,
                  {}
                )
                .then((res) => {
                  setClassDependencies(res.data);
                });
              }
          } else {
            setMessage({
              opcode: 0,
              msg: `First choose the project`,
            });
            setShowMessage(true);
          }
        }}
      >
        Next
      </button>
    </div>
  );
}
