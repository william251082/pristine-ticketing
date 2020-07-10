import axios from "axios";

export default ({ req }) => {
    if (typeof window === 'undefined') {
        // console.log('req server', req);
        console.log('req server', req.headers);
        // we are on the server
        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        });
    } else {
        // we are on the browser
        // console.log('req browser', req);
        console.log('req browser', req);
        return axios.create({
            baseURL: '/'
        });
    }
};