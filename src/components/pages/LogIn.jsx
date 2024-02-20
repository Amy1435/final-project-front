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
    const navigate = useNavigate();
    const { dispatch } = useContext(Context);

    //aggiungi is loading per il bottone
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            axios
                .post(`${VITE_URL_API}/auth/log-in`, {
                    email: email,
                    password: password,
                })
                .then((res) => {
                    const user = res.data;

                    dispatch({ type: "LOGIN", payload: user });

                    navigate("/posts");
                })
                .catch((error) => {
                    console.log(error);
                    setError(error);
                });
        } catch (error) {
            console.log(error);
            setError(error);
        }
    };
    return (
        <>
            <div className="title-text">
                <div>
                    <h1>Log in</h1>
                </div>
                <div>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the standard
                        dummy text ever since the 1500s, when an unknown printer
                        took a galley of type and scrambled it to make a type
                        specimen book. It has survived not only five centuries,
                        but also the leap into electronic typesetting, remaining
                        essentially unchanged.
                    </p>
                </div>
            </div>
            <div className="form-container-new">
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
                        <button type="submit">Log in</button>
                        <div className="not-member">
                            <span>
                                Not a member yet?{" "}
                                <Link to={`auth/sign-up`}>Sign Up</Link>
                            </span>
                        </div>
                        {error && (
                            <div className="error-message">
                                {error.response.data}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
};

export default LogIn;
