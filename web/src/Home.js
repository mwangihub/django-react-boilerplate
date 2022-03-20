import React from 'react'
import Signup from './auth/Signup';
// assume Home has other routes

const Home = (props) => {
    const { is_authenticated } = props;
    return (
        <section>
            <div className="container py-4">
                <div className="px-5 mb-4 bg-light rounded-3">
                    <div className="container-fluid py-3">
                        <h1 className="pb-4">Custom React Project</h1>
                        <p className="col-md-10 fs-4">Using a series of utilities, you can create this jumbotron, just like the one in previous versions of Bootstrap. Check out the examples below for how you can remix and restyle it to your liking.</p>
                        <button className="btn btn-primary btn-lg px-5" type="button">Action</button>
                    </div>
                </div>
                <div className="row align-items-md-stretch">
                    <div className="col-md-6">
                        <div className="p-lg-5 text-white bg-dark rounded-3" style={{ padding: "20px" }}>
                            <h2>Change the background</h2>
                            <p>Swap the background-color utility and add a `.text-*` color utility to mix up the jumbotron look. Then, mix and match with additional component themes and more.</p>
                            <button className="btn btn-outline-light px-5" type="button">Action button</button>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className=" px-lg-5">
                            {!is_authenticated && <Signup {...props} />}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home