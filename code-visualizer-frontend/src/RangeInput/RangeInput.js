import React from 'react'
import {RangeStepInput} from 'react-range-step-input';

export default function RangeInput(props) {
    return (
             <div style={{width: '400px', height:"200px", backgroundColor:"none", pointerEvents:"all"}}>
                <RangeStepInput
                    min={0} max={15}
                    value={props.levelState} step={1}
                    onChange={(e)=>{props.setLevelState(e.target.value)}}
                />
            </div>
    )
}     