import React, { Component } from 'react';
import TwitterLogin from 'react-twitter-login';
import Api from '../Api'
import * as authActions from '../utility/auth/authActions';
import { connect } from 'react-redux';
import { Navigate } from "react-router-dom"


class TwitterSocialLogin extends Component {

    render() {
        const authHandler = response => {
            console.log(response)
        }
        return (
            <div className='googleBtn'>
                <TwitterLogin
                    authCallback={authHandler}
                    consumerKey={"RHd2SUI5T05qUmtBY3JiUDFhTjM6MTpjaQ"}
                    consumerSecret={"JhIDUsMCGXsLoH3CZ2YypSKhEFTZ70LA8ds2MmkYobnAW_YgjD"}
                />
            </div>
        )
    }
}
export default TwitterSocialLogin