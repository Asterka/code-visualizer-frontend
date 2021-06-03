import React from 'react'

export default function ClickableProject(props) {
    return (
        <h1 className={`clickable-project${props.id===props.currentProject?'-chosen':''}`} onClick={()=>{
            props.setIsDropdownActive(false);
            props.setCurrentProject(props.id);
        }}>
            {props.id}
        </h1>
    )
}
