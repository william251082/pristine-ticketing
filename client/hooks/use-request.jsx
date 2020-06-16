export default ({ url, method, body }) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        try {
            const response = await axios[method](url, body);
        } catch (err) {
            setErrors(
                <div className="alert alert-danger">
                    <h4>Oooops...</h4>
                    <ul className="my-0">
                        {err.response.data.errors.map(err => (<li key={err.message}>{err.message}</li>))}
                    </ul>
                </div>
            );
        }
    };

    return { doRequest, errors };
};