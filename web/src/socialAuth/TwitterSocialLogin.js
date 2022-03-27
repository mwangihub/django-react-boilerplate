import React, { Component } from 'react';
import TwitterLogin from 'react-twitter-login';
import SocialLogin from './SocialLogin';
import * as authActions from '../utility/auth/authActions';
import { connect } from 'react-redux';
// import { Navigate } from "react-router-dom"


class TwitterSocialLogin extends Component {

    render() {
        const { clientID, clientSecret, authLoader, authWithGoogle, authFail, authStart } = this.props;
        const authHandler = response => {
            console.log(response)
        }
        return (
            <div className='googleBtn'>
                <TwitterLogin
                    authCallback={authHandler}
                    consumerKey={clientID}
                    consumerSecret={clientSecret}
                />
            </div>
        )
    }
}
const TwitterButton = SocialLogin(TwitterSocialLogin, {
    name:'twitter'
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

export default connect(mapStateToProps, mapDispatchToProps)(TwitterButton);