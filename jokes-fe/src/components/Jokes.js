import React from 'react'


const Jokes = (props) => {
    console.log("MAPPED DATA", props)
    return (
        <div>
            <h1>{props.data[1].username}</h1>
            
        </div>
    )
}

export default Jokes