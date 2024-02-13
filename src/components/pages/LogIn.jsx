import { useState } from "react";
import axios from "axios";
const { VITE_URL_API } = import.meta.env;
import { useNavigate } from "react-router-dom";
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
            <div className="log-in form">
                <form onSubmit={handleSubmit}>
                    <div>
                        <h1>Log in</h1>
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
                    <button type="submite">Log in</button>

                    {error && <div>{error.response.data}</div>}
                </form>
            </div>
        </>
    );
};

export default LogIn;
