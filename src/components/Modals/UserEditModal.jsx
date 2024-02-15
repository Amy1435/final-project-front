import { useState } from "react";
import axios from "axios";
const { VITE_URL_API } = import.meta.env;

const UserModal = ({ modalClose, userData, setUserData }) => {
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [formState, setFormState] = useState({
        username: userData.username,
        from_city: userData.from_city,
        profile_img: userData.profile_img,
        age: userData.age,
        bio: userData.bio,
        password: userData.password,
        email: userData.email,
    });

    const id = userData._id;

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
            .patch(`${VITE_URL_API}/users/${id}`, formState)
            .then((res) => {
                setSuccess("Update successful");
                setUserData(res.data);
                console.log(res.data);
                modalClose();
            })
            .catch((error) => {
                console.error(error);
                setError(error);
            });

        setError("");
    };

    return (
        <div className="modal-container">
            <div className="form modal">
                <form onSubmit={handleClick}>
                    <h1>Update settings</h1>
                    <div className="input-container">
                        <div>
                            <span>Username</span>
                            <input
                                type="text"
                                name="username"
                                required
                                value={formState.username}
                                onChange={handleChange}
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
                            />
                        </div>
                        <div>
                            <span>Password</span>
                            <input
                                type="password"
                                name="password"
                                value={formState.password}
                                onChange={handleChange}
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
                            />
                        </div>
                        <div>
                            <span>City</span>
                            <input
                                type="text"
                                required
                                name="from_city"
                                value={formState.from_city}
                                onChange={handleChange}
                            />
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
                            />
                        </div>
                        <div>
                            <span>Bio</span>
                            <textarea
                                required
                                value={formState.bio}
                                name="bio"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="btn-modal">
                        <button type="submit">Update</button>
                        <button onClick={modalClose} type="submit">
                            Close
                        </button>
                    </div>
                    {success && <div className="error">{success}</div>}
                    {error && (
                        <div className="error">
                            {error.response.data.message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default UserModal;