import React from "react";
import Person from "./person";
const Filterr=({search,persons,delPerson})=>{
    return(
        <div>
            {persons.filter(person=>{
                    if (search === "") {
                        return person
                    }else if (person.name.toLowerCase().includes(search.toLowerCase())) {
                        return person
                    }
                    return undefined
            })
                    .map(pp=><p key={pp.id}><Person person={pp} deleteOP={delPerson}/></p>)}
        </div>
    )
}

export default Filterr