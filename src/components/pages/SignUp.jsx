import { useEffect, useState } from "react";
import axios from "axios";
const { VITE_URL_API } = import.meta.env;
import { Link, useNavigate } from "react-router-dom";
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
            <div className="title-text">
                <div>
                    <h1>Sign Up</h1>
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
            <div className="log-container">
                <div className="log">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div>
                                <span>Username</span>
                                <input
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    className="data-input"
                                />
                            </div>
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
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="data-input"
                                />
                            </div>
                            <div>
                                <span>Url Profile image</span>
                                <input
                                    type="text"
                                    required
                                    value={profileImage}
                                    onChange={(e) =>
                                        setProfileImage(e.target.value)
                                    }
                                    className="data-input"
                                />
                            </div>
                            <div>
                                <span>Which city are you from</span>
                                <div className="city">
                                    <select
                                        required
                                        value={selectedCity}
                                        onChange={(e) =>
                                            setSelectedCity(e.target.value)
                                        }
                                        className="data-input select"
                                    >
                                        <option value="" disabled>
                                            Select a city
                                        </option>
                                        {cities.map((city) => (
                                            <option
                                                key={city._id}
                                                value={city.name}
                                                onChange={(e) =>
                                                    setSelectedCity(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                {city.name}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        className="add-city"
                                        onClick={handleModalCity}
                                    >
                                        Add New City
                                    </button>
                                </div>
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
                                    className="data-input"
                                />
                            </div>
                            <div>
                                <span>Bio</span>
                                <textarea
                                    required
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    className="data-input"
                                />
                            </div>
                        </div>
                        <button type="submit">Sign Up</button>
                        <div className="not-member">
                            <span>
                                Already a member?{" "}
                                <Link to={`auth/log-in`}>Sign Up</Link>
                            </span>
                        </div>
                        {(error || succefullMsg) && (
                            <div className="error-message">
                                {error ? error.response.data : succefullMsg}
                            </div>
                        )}
                    </form>
                </div>
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
