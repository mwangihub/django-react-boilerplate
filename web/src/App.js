import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { connect } from 'react-redux'
import * as authActions from './utility/auth/authActions'

import Home from './Home';
import Profile from './Profile';
import Admin from './Admin';
import AuthPages from './AuthPages'
import NotFound from './NotFound';
import Nav from './container/Nav';
import Footer from './container/Footer';
import Signup from './auth/Signup';
import Login from './auth/Login';
function App(props) {
  const { is_authenticated } = props
  useEffect(() => {
    props.checkAuth();
  })
  return (
    <main>
      <Nav {...props} />
      <Routes>
        {props.userAdmin && <Route path="/admin" element={<Admin {...props} />} />}
        {is_authenticated && <Route path="/profile" element={<Profile {...props} />} />}
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home {...props} />} />
          <Route path="/authentication/*" element={<AuthPages {...props} />}>
            <Route path="signup" element={<Signup {...props} />} />
            <Route path="login" element={<Login />} />
          </Route>
      </Routes>
      <Footer />
    </main>
  );
}

const mapStateToProps = state => {
  const { token, userAdmin, userFName, userLName, authLoader, authError } = state.authReducer
  const is_authenticated = token !== null;
  return {
    /**
     * !== checks for equality without performing any type conversions.
     */
    is_authenticated, userAdmin, userFName, userLName, authLoader, authError
  }
}
const mapDispatchToProps = dispatch => {
  return {
    checkAuth: () => dispatch(authActions.checkTokenState()),
    authLogout: () => dispatch(authActions.logout()),
    authSignUp: (email, password1, password2) => dispatch(authActions.authSignUp(email, password1, password2)),
    authFail: error => dispatch(authActions.authFail(error)),
  }
}
/**
 * connect() method from react-redux maps methods and application state from reducer
 * It takes two positional args. first being state object and second is dispatch methods
 * Without the first arg, null MUST be supplied as default arg to allow the second arg
 */
export default connect(mapStateToProps, mapDispatchToProps)(App);
