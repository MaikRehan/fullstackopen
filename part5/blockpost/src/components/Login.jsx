import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

const Login = ({user, loginForm}) => {
    if (user === null) {
        return (
            <div>
                <h2>Log in to application</h2>
                {loginForm()}
            </div>)
    } else {
        return (
            <div>
                user still logged in
            </div>
        )
    }
}

export default Login

