import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header'

const AppComponent = ({ Component, pageProps, currentUser }) => {
    return (
        <div>
            <Header currentUser={currentUser}/>
            <Component currenUser={currentUser} {...pageProps} />
        </div>
    );
};

AppComponent.getInitialProps = async (appContext) => {
    // console.log('appContext attrs ', Object.keys(appContext));
    // ctx is intended to go to Component.getInitialProps page,
    // appContext is intended to go to AppComponent.getInitialProps
    // console.log('appContext', appContext);
    const client = buildClient(appContext.ctx);
    // console.log('client', client);
    const { data } = await client.get('/api/users/currentuser');

    let pageProps = {};
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(
          appContext.ctx,
          client,
          data.currentUser
        );
    }

    // console.log('current user', data);
    // console.log('pageProps', pageProps);

    // will show on the args of AppComponent
    return {
        pageProps,
        ...data
    };
};

export default AppComponent;