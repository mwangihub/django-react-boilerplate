/* Easy selector helper function */
const select = (el, all = false) => {
    el = el.trim()
    if (all) {
        return [...document.querySelectorAll(el)]
    } else {
        return document.querySelector(el)
    }
}

/* Easy event listener function */
const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
        if (all) {
            selectEl.forEach(e => e.addEventListener(type, listener))
        } else {
            selectEl.addEventListener(type, listener)
        }
    }
}

/* Easy on scroll event listener */
const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
}


/* CALLABLE METHODS */
const ajaxCall = {

    getCookie: (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    },

    ws: () => {
        let http = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
        var socket = new WebSocket(http + window.location.host + window.location.pathname);
        return socket
    },

    sendRequest: (method, url, data) => {
        console.log(data);
        // Remember there is use of Async for best performance in the callee of this.
        //create a new promise object then promisify the XMLHTTResuest with resolve and reject
        const promise = new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);
            // Required by Django
            xhr.setRequestHeader('HTTP_X_REQUEST_WITH', 'XMLHttpRequest');
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            // Django needs csrf token
            xhr.setRequestHeader("X-CSRFToken", ajaxCall.getCookie("csrftoken"));
            xhr.onload = () => {
                    //We have to check for status codes here from the server then reject them or resolve
                    // However Django can be set to do that by logically handling that in the backend hence,
                    // no need to write all status codes here with if else 
                    if (xhr.status >= 400) reject(xhr.response);
                    // For the case of django returns this
                    // return JsonResponse(serialized, status=200, safe=False)
                    if (xhr.status === 200) resolve(xhr.response)
                }
                //  For failure of network connection but not from the server
            xhr.onerror = () => {
                    reject('Something went wrong!')
                }
                //not neccesary. Just for testing
                // data = { 'request': 'I am requesting to delete this' }
                //we only send JSON data if we passed real data
            if (data) xhr.send(JSON.stringify(data));
            else xhr.send();
        });
        return promise
    },
}

const authAjax = {
    removeEmailAddress: () => {
        select("[data-bs-dismiss]").onclick = e => {
            select(".email-remove").classList.remove("show");
        }
        select("[data-bs-confirm]").addEventListener('click', e => {
            select('.form-check-input', true).forEach(e => {
                if (e.checked) {
                    select("#email_target").innerHTML = e.value;
                    select("#removed_email").value = e.value;
                    select(".email-remove").classList.add("show");
                } else return
            });
        })
    }
}
const navTabs = () => {
    /* in a lazy way*/
    const checkTabPath = () => {
        console.log((window.location.pathname))
        switch (window.location.pathname) {

            case "/accounts/email/":
                return "emails";
            case "/accounts/password/change/":
                return "password_change";
            case "/accounts/password/reset/":
                return "password_reset";
            case "/accounts/login/":
                return "login";
            case "/accounts/signup/":
                return "signup";
            case "/accounts/social/signup/":
                return "signup";
            default:
                return "/home";
        }
    }
    if (select(".nav_tabs")) {
        var tabs = [...select(".nav_tabs").children]
        tabs.forEach(element => {
            element.classList.remove("nav_disabled");
            if (element.getAttribute("data-to") === checkTabPath()) {
                element.classList.add("nav_disabled")
            }
        });
    }
}