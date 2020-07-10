import buildClient from '../api/build-client'

const LandingPage = ({ currentUser }) => {
    // // request on browser
    // axios.get('/api/users/currentuser');
    console.log('req on browser curr user,', currentUser);
    return currentUser ?  <h1>You are signed in</h1> : <h1>You are signed out</h1>;
};

LandingPage.getInitialProps = async context => {
    // console.log('landing page');
    const client = buildClient(context);
    const { data } = await client.get('/api/users/currentuser');

    return data;
};

export default LandingPage;