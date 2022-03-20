import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as authActions from '../utility/auth/authActions'

const Login = ({ login, token, authError, is_authenticated }) => {
    const [inputType, setInputType] = useState(true)
    const viewPassword = e => {
        var el = e.target;
        el.classList.toggle("bi-eye-slash-fill");
        setInputType(!inputType);
    }
    const navigate = useNavigate()
    const handleLogin = e => {
        e.preventDefault()
        login(e.target.email.value, e.target.password.value)
    }
    useEffect(() => {
        /**
         * UseEffect is not neccessary for now.
         */
        if (token) {
            navigate("/profile");
        }
    })
    return (
        <div className="text-center">
            <main className="form-signin">
                <h2 className="fw-bold mb-4">Sign in</h2>
                {authError && <div className="alert alert-danger" role="alert" id="authError">{authError}</div>}
                <form onSubmit={e => handleLogin(e)}>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control rounded-4" placeholder="name@example.com" name='email' />
                        <label>Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type={inputType ? "password" : "text"} className="form-control rounded-4" placeholder="Password" name='password' />
                        <label>Password</label>
                        <span className='fw-bold'>
                            <i className="bi-eye-fill fs-5" onClick={e => viewPassword(e)} />
                        </span>
                    </div>
                    <button className="w-100 mb-2 btn btn-lg rounded-4 btn-primary" type="submit">Sign in</button>
                    <small className="text-muted">By clicking Sign in, you agree to the terms of use.</small>
                </form>
            </main>
        </div>
    )
}
const mapStateToProps = state => {
    const { token, authError } = state.authReducer
    return {
        token, authError
    }
}
const mapDispatchToProps = dispatch => {
    return {
        login: (email, password) => dispatch(authActions.authLogin(email, password))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);