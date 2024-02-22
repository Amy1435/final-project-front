import { useContext, useEffect, useState } from "react";
import axios from "axios";
import CityModal from "./CityCreateModal";
import { Context } from "../../context/UserContext";
const { VITE_URL_API } = import.meta.env;

const UserModal = ({ modalClose, userData, setUserData }) => {
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [formState, setFormState] = useState({
        username: userData.username,
        profile_img: userData.profile_img,
        age: userData.age,
        bio: userData.bio,
        password: userData.password,
        email: userData.email,
    });

    const id = userData._id;
    const { dispatch } = useContext(Context);
    //cities
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(userData.city._id);
    //modals
    const [modalCreateCity, setModalCreateCity] = useState(false);

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

    //changes
    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    //update user data
    const handleClick = (e) => {
        e.preventDefault();
        console.log(formState);
        axios
            .patch(`${VITE_URL_API}/users/${id}`, {
                username: formState.username,
                city: selectedCity,
                profile_img: formState.profile_img,
                age: formState.age,
                bio: formState.bio,
                password: formState.password,
                email: formState.email,
            })
            .then((res) => {
                setSuccess("Update successful");
                setUserData(res.data);
                console.log(
                    "Updated User Data:",
                    JSON.stringify(res.data, null, 2)
                );
                dispatch({
                    type: "UPDATE_USER",
                    payload: res.data,
                });
                modalClose();
            })
            .catch((error) => {
                console.error(error);
                setError(error);
            });
    };

    return (
        <>
            <div className="modal-container">
                <div className="form-container-new">
                    <div className="form-new">
                        <form onSubmit={handleClick}>
                            <div className="input-container">
                                <div>
                                    <span>Username</span>
                                    <input
                                        type="text"
                                        name="username"
                                        required
                                        value={formState.username}
                                        onChange={handleChange}
                                        className="data-input"
                                    />
                                </div>
                                <div>
                                    <span>Email</span>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formState.email}
                                        onChange={handleChange}
                                        className="data-input"
                                    />
                                </div>
                                <div>
                                    <span>Password</span>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formState.password}
                                        onChange={handleChange}
                                        className="data-input"
                                    />
                                </div>
                                <div>
                                    <span>Profile image</span>
                                    <input
                                        type="text"
                                        name="profile_img"
                                        required
                                        value={formState.profile_img}
                                        onChange={handleChange}
                                        className="data-input"
                                    />
                                </div>
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
                                <div>
                                    <span>Age</span>
                                    <input
                                        type="number"
                                        required
                                        min="18"
                                        max="100"
                                        name="age"
                                        value={formState.age}
                                        onChange={handleChange}
                                        className="data-input"
                                    />
                                </div>
                                <div>
                                    <span>Bio</span>
                                    <textarea
                                        required
                                        value={formState.bio}
                                        name="bio"
                                        onChange={handleChange}
                                        className="data-input"
                                    />
                                </div>
                            </div>
                            <div className="btn-container">
                                <button type="submit" className="btn blue">
                                    Update
                                </button>
                                <button
                                    onClick={modalClose}
                                    type="submit"
                                    className="btn"
                                >
                                    Close
                                </button>
                            </div>
                            {success && <div className="error">{success}</div>}
                            {error && (
                                <div className="error-message">
                                    {error.response.data.message}
                                </div>
                            )}
                        </form>
                    </div>
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

export default UserModal;
