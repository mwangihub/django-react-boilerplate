import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import * as authActions from '../utility/auth/authActions';
import { connect } from 'react-redux';
import { Navigate } from "react-router-dom"
import Api from '../Api'

class GoogleSocialAuth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clientID: null
        }
    }
    componentDidMount() {
        Api.requestSocialAppKey('google')
            .then(response => {
                const { config, status, statusText, data, request, headers } = response;
                this.setState({ clientID: data.client_id })
            }).catch(error => {
                console.log(error);
            })
    }
    render() {
        const { clientID } = this.state;
        const { authLoader, authWithGoogle, authFail, authStart } = this.props;
        const requestGoogleLogin = access_token => {
            authStart();
            authWithGoogle(access_token);
            return <Navigate to='/profile' replace={true} />
        }
        const googleSuccess = (response) => {
            const access_token = response.accessToken;
            const profile_obj = response.profileObj
            access_token ? requestGoogleLogin(access_token) : authFail("Google API failed")
        }
        const googleFailure = (response) => {
            console.log(response);
        }
        return (
            <div className="googleBtn">
                {authLoader &&
                    <div className="d-flex justify-content-center my-2">
                        <div className="spinner-border text-success text-center" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>}

                {
                    !authLoader && clientID &&
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
const mapStateToProps = state => {
    const { authLoader, token } = state.authReducer
    return {
        authLoader
    }
}
const mapDispatchToProps = dispatch => {
    return {
        authWithGoogle: (access_token) => dispatch(authActions.authWithGoogle(access_token)),
        authFail: error => dispatch(authActions.authFail(error)),
        authStart: () => dispatch(authActions.authStart()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GoogleSocialAuth);