import React from "react";
const personUI = ({person,deleteOP})=>{
    return(
        <div>
            <span key={person.id}>{person.name} {person.number}</span>
            <button onClick={()=>deleteOP(person.id,person.name)}>delete</button>
        </div>
    )
}

export default personUI