import axios from "axios";
let http = (token = null, c_type = "application/json") => {
    return axios.create({
        baseURL: "http://localhost:8000/api/",
        headers: {
            "Content-type": c_type,
            Authorization: token ? `Token ${token}` : ''
        }
    });
}


const userDetails = (token) => {
    return http(token).get("/user/");
};


const Api = {
    userDetails
};
export default Api