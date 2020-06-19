import buildClient from '../api/build-client'

const LandingPage = ({ currentUser }) => {
    // // request on browser
    // axios.get('/api/users/currentuser');
    console.log('curr user', currentUser);
    return <h1>Index Page!!!!!!</h1>;
};

LandingPage.getInitialProps = async context => {
    const client = buildClient(context);
    const { data } = await client.get('api/users/currentuser');

    return data;
};

export default LandingPage;