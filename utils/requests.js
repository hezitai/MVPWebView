import axios from "axios";
// axios.defaults.withCredentials = true;
axios.defaults.timeout = 20000;
if (process.env !== "production") {
    // axios.defaults.baseURL = "http://localhost:8080/api/";
    // axios.defaults.baseURL = "http://172.20.10.4:8080/api/";
    axios.defaults.baseURL = "http://192.168.0.7:8080/api/";
    // axios.defaults.baseURL = "http://10.255.22.126:8080/api/";
}
if (process.env.VUE_APP_FLAG === "buildtest") {
    // axios.defaults.baseURL = "http://shyc.dccnet.com.cn/res/network";
}
if (process.env.VUE_APP_FLAG === "prod") {
    // axios.defaults.baseURL = "http://shyc.dccnet.com.cn/res/network";
}
axios.defaults.headers.post["Content-Type"] = "application/json";

function request(options) {
    return axios(options)
        .then(res => {
            return res;
        })
        .catch(error => {
            return Promise.reject(error);
        });
}

export default request;