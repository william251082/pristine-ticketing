import axios from "axios";

const LandingPage = ({ currentUser }) => {
    // console.log('I am the component', color);
    // // request on browser
    // axios.get('/api/users/currentuser');
    console.log('curr user', currentUser);
    return <h1>Index Page!!!!!!</h1>;
};

LandingPage.getInitialProps = async ({ req }) => {
    // console.log('headers', req.headers);
    if (typeof window === 'undefined') {
        // we are on the server
        // requests should be made to http://ingress-nginx.....
        const { data } = await axios.get(
           'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', {
                headers: req.headers
            }
        );
        console.log('data', data);
        return data;
    } else {
        // we are on the browser
        // request can be made with a base url of '
        const { data } = await axios.get('/api/users/currentuser');

        return data;
    }
};

export default  LandingPage;