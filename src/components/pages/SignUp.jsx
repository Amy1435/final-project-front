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
    //loading
    const [isLoading, setIsLoading] = useState(false);
    //navigate
    const navigate = useNavigate();

    //sign up user
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        axios
            .post(`${VITE_URL_API}/auth/sign-up`, {
                username: username,
                email: email,
                password: password,
                profile_img: profileImage,
                city: selectedCity,
                age: age,
                bio: bio,
            })
            .then((res) => {
                setSuccefullMsg("Sign up successful");
                console.log(`sign up` + res.data);
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
        setIsLoading(false);
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
            <section className="title-text">
                <div>
                    <h1>Sign Up</h1>
                </div>
                <div>
                    <p>
                        Join the community of digital nomads and embark on a
                        journey of shared experiences. Sign up to connect with
                        fellow travelers, access exclusive content, and
                        contribute your own stories. Create a profile, and
                        become part of a vibrant network of individuals working
                        and exploring from anywhere in the world.
                    </p>
                </div>
            </section>
            <section className="form-container-new">
                <div className="form-new">
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
                                        className="data-input"
                                    >
                                        <option value="" disabled>
                                            Select a city
                                        </option>
                                        {cities.map((city) => (
                                            <option
                                                key={city._id}
                                                value={city._id}
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
                        <button
                            type="submit"
                            className={isLoading ? "loading" : ""}
                            disabled={isLoading}
                        >
                            Sign Up
                        </button>
                        <div className="not-member">
                            <span>
                                Already a member?{" "}
                                <Link to={`/auth/log-in`}>Log in</Link>
                            </span>
                        </div>
                        {(error || succefullMsg) && (
                            <div className="error-message">
                                {error ? error.response.data : succefullMsg}
                            </div>
                        )}
                    </form>
                </div>
            </section>
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
