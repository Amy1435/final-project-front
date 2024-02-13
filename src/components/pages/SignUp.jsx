import { useState } from "react";
import axios from "axios";
const { VITE_URL_API } = import.meta.env;
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [city, setCity] = useState("");
    const [age, setAge] = useState("");
    const [bio, setBio] = useState("");
    const [error, setError] = useState();
    const [succefullMsg, setSuccefullMsg] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`${VITE_URL_API}/auth/sign-up`, {
                username: username,
                email: email,
                password: password,
                profile_img: profileImage,
                from_city: city,
                age: age,
                bio: bio,
            })
            .then((res) => {
                setSuccefullMsg("Sign up successful");
                console.log(res.data);
                setUsername("");
                setEmail("");
                setPassword("");
                setProfileImage("");
                setCity("");
                setAge("");
                setBio("");
                navigate("/auth/log-in");
            })
            .catch((error) => {
                console.error(error);
                setError(error);
            });

        setError("");
    };
    return (
        <>
            <div className="sign-up form">
                <form onSubmit={handleSubmit}>
                    <div>
                        <h1>Sign Up</h1>
                    </div>
                    <div>
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
                        <div>
                            <span>Profile image</span>
                            <input
                                type="text"
                                required
                                value={profileImage}
                                onChange={(e) =>
                                    setProfileImage(e.target.value)
                                }
                            />
                        </div>
                        <div>
                            <span>Which city are you from?</span>
                            <input
                                type="text"
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div>
                            <span>How old are you?</span>
                            <input
                                type="number"
                                required
                                min="18"
                                max="100"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </div>
                        <div>
                            <span>Bio</span>
                            <textarea
                                required
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            />
                        </div>
                    </div>
                    <button>Sign Up</button>

                    {(error || succefullMsg) && (
                        <div>{error ? error.response.data : succefullMsg}</div>
                    )}
                </form>
            </div>
        </>
    );
};

export default SignUp;
