import React from 'react';
import { connect } from 'react-redux'
import * as authActions from './utility/auth/authActions'
// assume Profile account has other routes
const Profile = ({ is_authenticated, userEmail, userAdmin, userFName, userLName }) => {
  const profileNames = userFName === "null" || userLName === "null";
  return (
    <section className="container py-3">
      <header>
        <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
          <a href="/" className="d-flex align-items-center text-dark text-decoration-none">
            {profileNames && <span className="fs-4 text-primary">{userEmail}</span>}
            {!profileNames && <span className="fs-4 text-primary">{userFName} {userLName}</span>}
          </a>
          <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
            <a className="me-3 py-2 text-dark text-decoration-none" href="/">Features</a>
            <a className="me-3 py-2 text-dark text-decoration-none" href="/">Enterprise</a>
            <a className="me-3 py-2 text-dark text-decoration-none" href="/">Support</a>
            {profileNames && <a className="me-3 py-2 text-dark text-decoration-none" href="/">
              <span className="badge bg-warning ms-1 text-dark rounded-pill align-text-bottom">Profile update!</span>
            </a>}

          </nav>
        </div>

        <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
          <h1 className="display-4 fw-normal">Welcome to your profile</h1>
          <p className="fs-5 text-muted">Quickly build an effective pricing table for your potential customers with this Bootstrap example. It’s built with default Bootstrap components and utilities with little customization.</p>
        </div>
      </header>

      <main>
        <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
          <div className="col">
            <div className="card mb-4 rounded-3 shadow-sm">
              <div className="card-header py-3">
                <h4 className="my-0 fw-normal">Free</h4>
              </div>
              <div className="card-body">
                <h1 className="card-title pricing-card-title">$0<small className="text-muted fw-light">/mo</small></h1>
                <ul className="list-unstyled mt-3 mb-4">
                  <li>10 users included</li>
                  <li>2 GB of storage</li>
                  <li>Email support</li>
                  <li>Help center access</li>
                </ul>
                <button type="button" className="w-100 btn btn-lg btn-outline-primary">Sign up for free</button>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card mb-4 rounded-3 shadow-sm">
              <div className="card-header py-3">
                <h4 className="my-0 fw-normal">Pro</h4>
              </div>
              <div className="card-body">
                <h1 className="card-title pricing-card-title">$15<small className="text-muted fw-light">/mo</small></h1>
                <ul className="list-unstyled mt-3 mb-4">
                  <li>20 users included</li>
                  <li>10 GB of storage</li>
                  <li>Priority email support</li>
                  <li>Help center access</li>
                </ul>
                <button type="button" className="w-100 btn btn-lg btn-primary">Get started</button>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card mb-4 rounded-3 shadow-sm border-primary">
              <div className="card-header py-3 text-white bg-primary border-primary">
                <h4 className="my-0 fw-normal">Enterprise</h4>
              </div>
              <div className="card-body">
                <h1 className="card-title pricing-card-title">$29<small className="text-muted fw-light">/mo</small></h1>
                <ul className="list-unstyled mt-3 mb-4">
                  <li>30 users included</li>
                  <li>15 GB of storage</li>
                  <li>Phone and email support</li>
                  <li>Help center access</li>
                </ul>
                <button type="button" className="w-100 btn btn-lg btn-primary">Contact us</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  )
}
const mapStateToProps = state => {
  const { token, userEmail } = state.authReducer
  return {
    /**
     * !== checks for equality without performing any type conversions.
     */
    is_authenticated: token !== null,
    token: token,
    userEmail: userEmail,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    authLogout: () => dispatch(authActions.logout())
  }
}
/**
 * connect() method from react-redux maps methods and application state from reducer
 * It takes two positional args. first being state object and second is dispatch methods
 * Without the first arg, null MUST be supplied as default arg to allow the second arg
 */
export default connect(mapStateToProps, mapDispatchToProps)(Profile);