import { useState } from "react";
import axios from "axios";
const { VITE_URL_API } = import.meta.env;

const CityModal = ({ modalClose, setCities }) => {
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [formState, setFormState] = useState({
        name: "",
        country: "",
        continent: "",
        population: 0,
        img: "",
        internet_speed: 0,
        sefety_level: 0,
        cost_of_living_month: 0,
    });

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
            .post(`${VITE_URL_API}/cities`, formState)
            .then((res) => {
                console.log(res.data);
                const newCity = res.data;
                setCities((prevCities) => [...prevCities, ...newCity]);
                setSuccess("City created successful");
                modalClose();
            })
            .catch((error) => {
                console.error(error);
                setError(error);
            });
    };

    return (
        <div className="modal-container">
            <div className="form">
                <form onSubmit={handleClick}>
                    <h1>Create City</h1>
                    <div className="input-container">
                        <div>
                            <span>City Name</span>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formState.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <span>Country</span>
                            <input
                                type="text"
                                name="country"
                                required
                                value={formState.country}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <span>Continent</span>
                            <input
                                type="text"
                                name="continent"
                                required
                                value={formState.continent}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <span>Population</span>
                            <input
                                type="number"
                                name="population"
                                min="0"
                                required
                                value={formState.population}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <span>Image</span>
                            <input
                                type="text"
                                name="img"
                                required
                                value={formState.img}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <span>Internet Spead</span>
                            <input
                                type="number"
                                name="internet_speed"
                                min="0"
                                required
                                placeholder={"Mbps"}
                                value={formState.internet_speed}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <span>Safety Level: from 0 to 10</span>
                            <input
                                type="number"
                                name="sefety_level"
                                min="0"
                                max="10"
                                required
                                value={formState.sefety_level}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <span>Cost of one month of living</span>
                            <input
                                type="number"
                                name="cost_of_living_month"
                                min="0"
                                required
                                value={formState.cost_of_living_month}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="btn-modal">
                        <button type="submit">Create</button>
                        <button onClick={modalClose}>Close</button>
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

export default CityModal;
