import axios from "axios";

const LandingPage = ({ color }) => {
    // console.log('I am the component', color);
    // // request on browser
    // axios.get('/api/users/currentuser');
    return <h1>Index Page!!!!!!</h1>;
};

LandingPage.getInitialProps = async () => {
    if (typeof window === 'undefined') {
        // we are on the server
        // requests should be made to http://ingress-nginx.....
    } else {
        // we are on the browser
        // request can be made with a base url of '
    }

    return {};
};

export default  LandingPage;