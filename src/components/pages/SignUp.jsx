import { useEffect, useState } from "react";
import axios from "axios";
const { VITE_URL_API } = import.meta.env;
import { useNavigate } from "react-router-dom";
import CityModal from "../Modals/CityCreateModal";

const SignUp = () => {
    //sign up components
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [age, setAge] = useState("");
    const [bio, setBio] = useState("");
    const [error, setError] = useState();
    const [succefullMsg, setSuccefullMsg] = useState("");
    //modals
    const [modalCreateCity, setModalCreateCity] = useState(false);

    //navigate
    const navigate = useNavigate();

    //sign up user
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`${VITE_URL_API}/auth/sign-up`, {
                username: username,
                email: email,
                password: password,
                profile_img: profileImage,
                from_city: selectedCity,
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
                setSelectedCity("");
                setAge("");
                setBio("");
                navigate("/auth/log-in");
            })
            .catch((error) => {
                console.error(error);
                setError(error);
            });
    };

    //get cities
    useEffect(() => {
        axios
            .get(`${VITE_URL_API}/cities`)
            .then((response) => {
                console.log(response.data);
                setCities(response.data);
            })
            .catch((error) => {
                console.log(error);
                setError(true);
            });
    }, []);

    //open modal to create city
    const handleModalCity = () => {
        setModalCreateCity(true);
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
                            <span>Which city are you from</span>
                            <select
                                required
                                value={selectedCity}
                                onChange={(e) =>
                                    setSelectedCity(e.target.value)
                                }
                            >
                                <option value="" disabled>
                                    Select a city
                                </option>
                                {cities.map((city) => (
                                    <option
                                        key={city._id}
                                        value={city.name}
                                        onChange={(e) =>
                                            setSelectedCity(e.target.value)
                                        }
                                    >
                                        {city.name}
                                    </option>
                                ))}
                            </select>
                            <button className="btn" onClick={handleModalCity}>
                                New City
                            </button>
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
                    <button type="submit">Sign Up</button>

                    {(error || succefullMsg) && (
                        <div>{error ? error.response.data : succefullMsg}</div>
                    )}
                </form>
            </div>
            {modalCreateCity && (
                <CityModal
                    modalClose={() => {
                        setModalCreateCity(false);
                    }}
                    setCities={setCities}
                />
            )}
        </>
    );
};

export default SignUp;
