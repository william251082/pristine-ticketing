export default () => {
    return (
        <div className="container">
            <form>
            <h1>Sign Up</h1>
            <div className="form-group">
                <label>Email Address</label>
                <input type="text" className="form-control"/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control"/>
            </div>
            <button className="btn btn-primary">Sign Up</button>
        </form>
        </div>
    );
};