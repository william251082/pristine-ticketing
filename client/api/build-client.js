import axios from "axios";

export default ({ req }) => {
    if (typeof window === 'undefined') {
        // we are on the server
        return axios.create({
            basURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
            headers: req.headers
        });
    } else {
        // we are on the browser
        return axios.create({
            baseURL: '/'
        });
    }
};