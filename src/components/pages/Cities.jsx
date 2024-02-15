const { VITE_URL_API } = import.meta.env;
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Cities = () => {
    const [cities, setCities] = useState([]);
    const [error, setError] = useState();

    //search by city
    const [city, setCity] = useState("");
    //reset
    const [reset, setReset] = useState([]);

    useEffect(() => {
        axios
            .get(`${VITE_URL_API}/cities`)
            .then((response) => {
                console.log(response.data);
                setCities(response.data);
                setReset(response.data);
            })
            .catch((error) => {
                console.log(error);
                setError(true);
            });
    }, []);

    //search by city function
    const handleSearch = (name) => {
        const cityName = name[0].toUpperCase() + name.slice(1);
        const filter = cities.filter((city) => city.name === cityName);
        setCities(filter);
    };

    //reset
    const handleReset = () => {
        setCities(reset);
        setCity("");
    };

    return (
        <div className="page data">
            {error && <div>{error}</div>}

            {!error && cities && (
                <>
                    <div className="title-text">
                        <div>
                            <h1>Cities</h1>
                            <div>
                                <p>
                                    Lorem Ipsum is simply dummy text of the
                                    printing and typesetting industry. Lorem
                                    Ipsum has been the standard dummy text ever
                                    since the 1500s, when an unknown printer
                                    took a galley of type and scrambled it to
                                    make a type specimen book. It has survived
                                    not only five centuries, but also the leap
                                    into electronic typesetting, remaining
                                    essentially unchanged.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="search-filter">
                        <span>Search by city</span>
                        <div>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <button onClick={() => handleSearch(city)}>
                                Search
                            </button>
                            <button onClick={handleReset}>Reset</button>
                        </div>
                    </div>
                    <div className="data-container cities">
                        {cities.map((city) => (
                            <div key={city._id} className="cities">
                                <Link to={`/cities/${city._id}`}>
                                    <figure>
                                        <img src={city.img} alt="city-img" />
                                        <div>
                                            <span>{city.name}</span>
                                        </div>
                                    </figure>
                                </Link>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Cities;
