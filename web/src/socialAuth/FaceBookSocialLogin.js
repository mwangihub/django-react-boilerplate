import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import Api from '../Api'
import * as authActions from '../utility/auth/authActions';
import { connect } from 'react-redux';
import { Navigate } from "react-router-dom"

/**
 * npm install react-facebook-login
 */
class FaceBookSocialLogin extends Component {
    render(){
        const responseFacebook = (response) => {
            console.log(response);
          }
        return (
            <div className="googleBtn">
                <FacebookLogin
                    appId="1026941931509651"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={responseFacebook} 
                    icon="fa-facebook"
                />
            </div>
        )
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
        authWithFaceBook: (access_token) => dispatch(authActions.authWithFaceBook(access_token)),
        authFail: error => dispatch(authActions.authFail(error)),
        authStart: () => dispatch(authActions.authStart()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FaceBookSocialLogin);
