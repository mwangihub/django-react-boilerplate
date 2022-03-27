import React,{Component} from 'react';
import * as authActions from '../utility/auth/authActions';
import { connect } from 'react-redux';
import Api from '../Api'
import InstagramLogin from 'react-instagram-login';

class InstagramSocialLogin extends Component{
    
    render(){
        const responseInstagram = (response) => {
            console.log(response);
          }
        return(
            <InstagramLogin
                clientId="5fd2f11482844c5eba963747a5f34556"
                buttonText="Login"
                onSuccess={responseInstagram}
                onFailure={responseInstagram}
            />
        )
    }
}
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
export default connect(mapStateToProps, mapDispatchToProps)(InstagramSocialLogin);
