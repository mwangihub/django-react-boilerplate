import React, { useEffect, } from 'react'

export default function NotFound() {
  useEffect(() => {
    var preloader = document.querySelector("#preloader");
    setTimeout(() => {
      if (preloader) {
        preloader.remove()
      }
    }, 1000);
  }, [])
  return (
    <section >
      <div className="container " style={{ marginTop: "200px" }}>
        <div className="bg-light p-5 rounded">
          <h1>404 Not found</h1>
          <p className="lead">This example is a quick exercise to illustrate how fixed to top navbar works. As you scroll, it will remain fixed to the top of your browsers viewport.</p>
          <a className="btn btn-lg btn-primary" href="/" >Home »</a>
        </div>
      </div>
      <div id="preloader"></div>
    </section>

  )
}
