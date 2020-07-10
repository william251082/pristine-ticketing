import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';

const AppComponent = ({ Component, pageProps }) => {
    return (
        <div>
            <h1>Header</h1>
            <Component {...pageProps} />
        </div>
    );
};

AppComponent.getInitialProps = async (appContext) => {
    // console.log('appContext attrs ', Object.keys(appContext));
    // ctx is intended to go to Component.getInitialProps page,
    // appContext is intended to go to AppComponent.getInitialProps
    // console.log('appContext', appContext);
    const client = buildClient(appContext.ctx);
    const { data } = await client.get('/api/users/currentuser');

    let pageProps;
    if (appContext.Component.getInitialProps) {
        const pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }

    // console.log('current user', data);
    console.log('pageProps', pageProps);

    return data;
};

export default AppComponent;