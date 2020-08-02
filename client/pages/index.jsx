const LandingPage = ({ currentUser }) => {
    console.log('current user', currentUser);
    return currentUser ?  (<h1>You are signed in</h1>) : (<h1>You are signed out</h1>);
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
    return {}
};

export default LandingPage;