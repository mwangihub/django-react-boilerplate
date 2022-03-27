import React, { Component } from 'react';
import Api from '../Api'

const SocialLogin = (SocialLoginMethod, data) => {
    return class extends Component {
        constructor(props) {
            super(props)
            this.state = {
                clientID: null,
                clientSecret: null,
                key:null
            }
        }
        componentDidMount() {
            Api.requestSocialAppKey(data.name)
                .then(response => {
                    const { config, status, statusText, data, request, headers } = response;
                    this.setState({ clientID: data.client_id, clientSecret: data.client_secret, key:data.key })
                }).catch(error => {
                    console.log(error);
                })
        }

        render() {
            return <SocialLoginMethod {...this.state}/>
        }
    }
}


export default SocialLogin