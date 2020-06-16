const LandingPage = ({ color }) => {
    console.log('I am the component', color);
    return <h1>Index Page!!!!!!</h1>;
};

// nextjs will call getInitialProps  while attempting to render the app on the server
// opportunity to fetch some data that the component needs
LandingPage.getInitialProps = () => {
    console.log('I am on the server!');

    return { color: 'red' }
};

export default  LandingPage;