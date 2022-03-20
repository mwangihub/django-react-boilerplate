import React from 'react';
import {Link, Outlet} from "react-router-dom";
function App() {
    return (
            <section>
                <div className="container">
                    <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                        <p  className="mb-md-0 me-md-auto"/>
                        <ul className="nav">
                            <li className="nav-item"><Link to="signup" className="nav-link">Sign up</Link></li>
                            <li className="nav-item"><Link to="login" className="nav-link">Sign in</Link></li>
                            <li className="nav-item"><a href="/" className="nav-link">Forgot password?</a></li>
                            <li className="nav-item"><a href="/" className="nav-link">FAQs</a></li>
                            <li className="nav-item"><a href="/" className="nav-link">About</a></li>
                            <li className="nav-item"><a href="/" className="nav-link">Terms of use</a></li>
                        </ul>
                    </header>
                </div>
                <Outlet/>
            </section>
    );
}

export default App;
