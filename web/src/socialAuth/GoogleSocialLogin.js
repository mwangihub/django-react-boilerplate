import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

class GoogleSocialAuth extends Component {

    render() {
        const googleSuccess = (response) => {
            console.log(response);
        }
        const googleFailure = (response) => {
            console.log(response);
        }
        return (
            <div className="googleBtn">
                <GoogleLogin
                    /**
                     * Api to retrieve clientID
                     */
                    clientId="133361017441-qnmh2vfq3v7c71nk2iba8e8r0nq6t9k3.apps.googleusercontent.com"
                    buttonText="Login with google"
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        );
    }
}

export default GoogleSocialAuth;