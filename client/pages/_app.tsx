import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '@components/header'

const AppComponent = ({ Component, pageProps, currentUser }) => {
    return (
        <div>
            <Header currentUser={currentUser}/>
                <div className="container">
                   <Component currentUser={currentUser} {...pageProps} />
                </div>
        </div>
    );
};

AppComponent.getInitialProps = async (appContext) => {
    const client = buildClient(appContext.ctx)
    let pageProps = {}
    let resData = {currentUser: null}
    try {
        const { data } = await client.get('/api/users/currentuser')
        resData = data
    } catch (err) {
        console.error(err)
    }
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(
            appContext.ctx,
            client,
            resData.currentUser
        )
    }
    return {
        pageProps,
        ...resData
    }
}

export default AppComponent
