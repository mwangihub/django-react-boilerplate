import React, { useState, useEffect } from 'react'


const Signup = ({ authSignUp, authError, authFail }) => {

    const [inputType, setInputType] = useState(true)
    const [signUpError, setSignUpError] = useState(undefined)
    const viewPassword = e => {
        var el = e.target;
        el.classList.toggle("bi-eye-slash-fill");
        setInputType(!inputType);
    }
    useEffect(() => {
        if (authError) {
            setSignUpError(authError);
            setTimeout(() => {
                setSignUpError(undefined);
            }, 10000);
        } else {
            document.querySelector("#signUpForm").reset()
        }
    }, [authError])
    const handleSignUP = e => {
        e.preventDefault();
        setSignUpError(undefined);
        const email = e.target.email.value;
        const password1 = e.target.password1.value;
        const password2 = e.target.password2.value;
        password1 !== password2 ? authFail('Password did not match!') : authSignUp(email, password1, password2);
    }
    const is_obj = typeof signUpError === 'object';
    const is_str = typeof signUpError === 'string';
    return (
        <div className="form-signin">
            <div className="modal-content">
                <div className="modal-header pb-4 border-bottom-0 ">
                    <h2 className="fw-bold mb-0">Sign up for free</h2>
                </div>
                <div className="modal-body pt-0">
                    {
                        signUpError &&
                        <div className={`alert alert-danger ${is_str ? " text-center" : ""}`}>
                            {
                                is_obj &&
                                Object.keys(signUpError).map((key, index) => {
                                    return (
                                        <dl className="row " key={index}>
                                            <dt className="col-sm-3 text-capitalize">{key}</dt>
                                            <dd className="col-sm-9">
                                                {signUpError[key].map((e, index) => { return (<p key={index}>{e}</p>) })}
                                            </dd>
                                        </dl>
                                    );
                                })
                            }
                            {is_str && signUpError} 
                        </div>
                    }
                    <form method="post" autoComplete='off' onSubmit={e => handleSignUP(e)} id="signUpForm">
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control rounded-4" placeholder="name@example.com" required name="email" />
                            <label>Email address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type={inputType ? "password" : "text"} className="form-control rounded-4" placeholder="Password" required name="password1" />
                            <label>Password</label>
                            <span className='fw-bold'>
                                <i className="bi-eye-fill fs-5" onClick={e => viewPassword(e)} />
                            </span>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control rounded-4" placeholder="Password" required name="password2" />
                            <label>Password again</label>
                        </div>
                        <button className="w-100 mb-2 btn btn-lg rounded-4 btn-primary" type="submit">Sign up</button>
                        <small className="text-muted">By clicking Sign up, you agree to the terms of use.</small>
                    </form>

                    {/*<hr className="my-4" />
                    <h2 className="fs-5 fw-bold mb-3">Or use a third-party</h2>
                     Social authentication ***
                    
                    */}
                    
                    {/* <a href="/home" className="w-100 py-2 mb-2 btn btn-outline-primary rounded-4">
                        Sign up with Twitter
                    </a> */}
                </div>
            </div>
        </div>

    )
}
export default Signup;
