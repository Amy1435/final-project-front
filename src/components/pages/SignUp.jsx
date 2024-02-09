import { useState } from "react";
import axios from "axios";
const { VITE_URL_API } = import.meta.env;

const SinglePost = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState();
    const [succefullMsg, setSuccefullMsg] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`${VITE_URL_API}/auth/sign-up`, {
                username: username,
                email: email,
                password: password,
            })
            .then((res) => {
                setSuccefullMsg("Sign up successful, go to log-in page");
                console.log(res.data);
                setUsername("");
                setEmail("");
                setPassword("");
            })
            .catch((error) => {
                console.error(error);
                setError(error);
            });

        setError("");
    };
    return (
        <>
            <div>
                <div>
                    <h1>Sign Up</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <span>Username</span>
                        <input
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Email</span>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Password</span>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        onClick={() => console.log(username, password, email)}
                    >
                        Sign Up
                    </button>

                    {(error || succefullMsg) && (
                        <div>{error ? error.response.data : succefullMsg}</div>
                    )}
                </form>
            </div>
        </>
    );
};

export default SinglePost;
