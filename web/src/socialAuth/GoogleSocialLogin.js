import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import SocialLogin from './SocialLogin';
import * as authActions from '../utility/auth/authActions';
import { connect } from 'react-redux';
import { Navigate } from "react-router-dom"


class GoogleSocialAuth extends Component {

    render() {
        const { clientID, authLoader, authWithGoogle, authFail, authStart } = this.props;
        const requestGoogleLogin = access_token => {
            authStart();
            authWithGoogle(access_token);
            return <Navigate to='/profile' replace={true} />
        }
        const googleSuccess = (response) => {
            const access_token = response.accessToken;
            // const profile_obj = response.profileObj
            access_token ? requestGoogleLogin(access_token) : authFail("Google API failed")
        }
        const googleFailure = (response) => {
            console.log(response);
        }
        return (
            <div className="googleBtn">
                {authLoader&&
                    <div className="d-flex justify-content-center my-2">
                        <div className="spinner-border text-success text-center" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>}

                {!authLoader && clientID &&
                    <GoogleLogin
                        clientId={clientID}
                        buttonText="Login with google"
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={'single_host_origin'}
                    />
                }
            </div>
        );
    }
}

const GoogleButton = SocialLogin(GoogleSocialAuth, {
    name:'google'
})

const mapStateToProps = state => {
    const { authLoader, token } = state.authReducer
    return {
        authLoader, token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        socialLoginMethod: (access_token) => dispatch(authActions.authWithGoogle(access_token)),
        authFail: error => dispatch(authActions.authFail(error)),
        authStart: () => dispatch(authActions.authStart()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleButton);