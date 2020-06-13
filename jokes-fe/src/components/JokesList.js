import React, {useEffect, useState} from 'react'
import Jokes from './Jokes'
import {axiosWithAuth} from '../utils/AxiosWithAuth'

const JokesList = () => {

    
    const [user, setUser] = useState([])
    useEffect(() => {
        axiosWithAuth().get('http://localhost:3300/api/jokes', null, {params: {token: localStorage.getItem("token")}})
        .then(res => {
            setUser(res.data)
            console.log("res", res)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
    
    console.log("poweruser", typeof(user))
    // return (<div>things</div>)
    if (user.length === 0) {
        return (<div>loading...</div>)
    } else {
        return (
            <div>
            { user.map((data, index) => {
                return <Jokes data={data} key={index}/>
            })}
            </div>
            
        )
    }
    
 
}

export default JokesList