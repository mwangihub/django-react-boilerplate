import React, { Component } from 'react';
import * as authActions from '../utility/auth/authActions';
import { connect } from 'react-redux';
import SocialLogin from './SocialLogin';
import InstagramLogin from 'react-instagram-login';

class InstagramSocialLogin extends Component {
   
    render() {
        const { clientID, clientSecret, authLoader, authWithGoogle, authFail, authStart } = this.props;
        const responseInstagram = (response) => {
            console.log(response);
        }
        return (
            <div>
                {authLoader &&
                    <div className="d-flex justify-content-center my-2">
                        <div className="spinner-border text-success text-center" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>}
                {!authLoader && clientID && 
                <InstagramLogin
                    clientId={clientID}
                    buttonText="Login"
                    onSuccess={responseInstagram}
                    onFailure={responseInstagram}
                />}
            </div>
        )
    }
}
const InstagramButton = SocialLogin(InstagramSocialLogin, {
    name:'Instagram'
})
const mapStateToProps = state => {
    const { authLoader, token } = state.authReducer
    return {
        authLoader, token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        authWithGoogle: (access_token) => dispatch(authActions.authWithGoogle(access_token)),
        authFail: error => dispatch(authActions.authFail(error)),
        authStart: () => dispatch(authActions.authStart()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(InstagramButton);
