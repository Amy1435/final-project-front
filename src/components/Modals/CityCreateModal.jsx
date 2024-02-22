import { useState } from "react";
import axios from "axios";
const { VITE_URL_API } = import.meta.env;

const CityModal = ({ modalClose, setCities }) => {
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    //loading disable btn
    const [isLoading, setIsLoading] = useState(false);
    const [formState, setFormState] = useState({
        name: "",
        country: "",
        continent: "",
        population: "",
        img: "",
        internet_speed: "",
        sefety_level: "",
        cost_of_living_month: "",
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
        setIsLoading(true);
        axios
            .post(`${VITE_URL_API}/cities`, formState)
            .then((res) => {
                console.log(res.data);
                const newCity = res.data;
                setCities((prevCities) => [...prevCities, newCity]);
                setSuccess("City created successful");
                modalClose();
            })
            .catch((error) => {
                console.error(error);
                setError(error);
            });
        setIsLoading(false);
    };

    return (
        <div className="modal-container">
            <div className="form-container-new">
                <div className="form-new">
                    <form onSubmit={handleClick}>
                        <div className="input-container">
                            <div>
                                <span>City Name</span>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formState.name}
                                    onChange={handleChange}
                                    className="data-input"
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
                                    className="data-input"
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
                                    className="data-input"
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
                                    className="data-input"
                                />
                            </div>
                            <div>
                                <span>Image</span>
                                <input
                                    type="text"
                                    name="img"
                                    required
                                    value={formState.img}
                                    placeholder="Url img"
                                    onChange={handleChange}
                                    className="data-input"
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
                                    className="data-input"
                                />
                            </div>
                            <div>
                                <span>Safety Level</span>
                                <input
                                    type="number"
                                    name="sefety_level"
                                    min="0"
                                    max="10"
                                    required
                                    value={formState.sefety_level}
                                    placeholder="From 0 to 10"
                                    onChange={handleChange}
                                    className="data-input"
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
                                    className="data-input"
                                />
                            </div>
                        </div>
                        <div className="btn-container">
                            <button
                                type="submit"
                                className={isLoading ? "loading" : "btn blue"}
                                disabled={isLoading}
                            >
                                Create
                            </button>
                            <button onClick={modalClose} className="btn">
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
        </div>
    );
};

export default CityModal;
