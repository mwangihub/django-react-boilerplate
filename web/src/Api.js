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
const gooleLogin = (data) => {
    return http().post("/rest/google/", data);
};
const requestSocialAppKey = (socialName) => {
    return http().get(`/social/key/${socialName}/`);
};
const Api = {
    userDetails, 
    gooleLogin, 
    requestSocialAppKey,
};
export default Api