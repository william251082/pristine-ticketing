import axios from "axios";

const LandingPage = ({ color }) => {
    console.log('I am the component', color);
    // request on browser
    axios.get('/api/users/currentuser');
    return <h1>Index Page!!!!!!</h1>;
};

LandingPage.getInitialProps = async () => {
    // request on server
    const response = await axios.get('/api/users/currentuser');

    return response.data;
};

export default  LandingPage;