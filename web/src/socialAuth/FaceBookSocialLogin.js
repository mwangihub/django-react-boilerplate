import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import * as authActions from '../utility/auth/authActions';
import { connect } from 'react-redux';
import SocialLogin from './SocialLogin';
// import { Navigate } from "react-router-dom"

class FaceBookSocialLogin extends Component {
    
    render() {
        const { clientID, authLoader, authWithGoogle, authFail, authStart } = this.props;
        const responseFacebook = (response) => {
            console.log(response);
        }
        return (
            <div className="">
                {authLoader &&
                    <div className="d-flex justify-content-center my-2">
                        <div className="spinner-border text-success text-center" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>}

                {!authLoader && clientID &&
                    <div className="googleBtn">
                        <FacebookLogin
                            appId="1026941931509651"
                            autoLoad={false}
                            fields="name,email,picture"
                            callback={responseFacebook}
                            icon="fa-facebook"
                        />
                    </div>}
            </div>
        )
    }
}
const FaceBookButton = SocialLogin(FaceBookSocialLogin, {
    name:'facebook'
})
const mapStateToProps = state => {
    const { authLoader, token } = state.authReducer
    return {
        authLoader, token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        authWithFaceBook: (access_token) => dispatch(authActions.authWithFaceBook(access_token)),
        authFail: error => dispatch(authActions.authFail(error)),
        authStart: () => dispatch(authActions.authStart()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FaceBookButton);
