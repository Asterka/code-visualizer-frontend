import * as React from "react";

export const Chevron = (props) => {
  return (
    <span style={{height:"100%", display:"flex", alignItems:"center", marginLeft:"20px", transform: `${props.isActive?'rotate(-180deg)':'rotate(0deg)'}`}}>
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 13L8 6L1 13"
        stroke={props.color}
        stroke-width="4"
        stroke-linejoin="round"
      />
    </svg></span>
  );
}
