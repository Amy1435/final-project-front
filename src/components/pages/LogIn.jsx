import { useState } from "react";
import axios from "axios";
const { VITE_URL_API } = import.meta.env;
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../context/UserContext.jsx";
import { useContext } from "react";

const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { dispatch } = useContext(Context);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            axios
                .post(`${VITE_URL_API}/auth/log-in`, {
                    email: email,
                    password: password,
                })
                .then((res) => {
                    const user = res.data.user;
                    const token = res.data.token;
                    console.log(`user` + user);
                    console.log(`token` + token);
                    dispatch({ type: "LOGIN", payload: { user, token } });
                    navigate("/posts");
                })
                .catch((error) => {
                    console.error(error);
                    setError(error);
                });
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
            <section className="title-text">
                <div>
                    <h1>Log in</h1>
                </div>
                <div>
                    <p>
                        Welcome back, nomad! Log in to your account and
                        reconnect with the global community of digital
                        wanderers. Share your experiences, discover new
                        destinations, and engage with like-minded individuals.
                        If you are new here, consider signing up to unlock the
                        full potential of our platform.
                    </p>
                </div>
            </section>
            <section className="form-container-new">
                <div className="form-new">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <span>Email</span>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="data-input"
                            />
                        </div>
                        <div>
                            <span>Password</span>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="data-input"
                            />
                        </div>
                        <button
                            type="submit"
                            className={isLoading ? "loading" : ""}
                            disabled={isLoading}
                        >
                            Log in
                        </button>
                        <div className="not-member">
                            <span>
                                Not a member yet?{" "}
                                <Link to={`/auth/sign-up`}>Sign Up</Link>
                            </span>
                        </div>
                        {error && (
                            <div className="error-message">
                                {error.response.data}
                            </div>
                        )}
                    </form>
                </div>
            </section>
        </>
    );
};

export default LogIn;
