const { VITE_URL_API } = import.meta.env;
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";

const Cities = () => {
    const [cities, setCities] = useState([]);
    const [error, setError] = useState();
    //Loading
    const [isLoading, setIsLoading] = useState(true);
    //search by city
    const [city, setCity] = useState("");
    //reset
    const [reset, setReset] = useState([]);

    //get cities
    useEffect(() => {
        axios
            .get(`${VITE_URL_API}/cities`)
            .then((res) => {
                setIsLoading(false);
                console.log(res.data);
                setCities(res.data);
                setReset(res.data);
            })
            .catch((error) => {
                setIsLoading(false);
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
        <>
            <div className="page data">
                {error && <div>{error}</div>}

                {!error && (
                    <>
                        <div className="title-text">
                            <div>
                                <h1>Cities</h1>
                            </div>
                            <div>
                                <p>
                                    Welcome, here you can explore destinations
                                    perfect for digital nomads. Discover
                                    information about each citys like cost of
                                    living, internet speed, and more. Find your
                                    next adventure and gather insights from
                                    fellow nomads who have shared their
                                    experiences in these vibrant locations.
                                </p>
                            </div>
                        </div>

                        <div className="search-filter">
                            <div className="searchBox">
                                <input
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="searchInput"
                                    placeholder="Search by city"
                                />
                                <div className="search-btn">
                                    <button
                                        onClick={() => handleSearch(city)}
                                        className="searchButton searchIcon"
                                    >
                                        <FontAwesomeIcon
                                            icon={faMagnifyingGlass}
                                        />
                                    </button>
                                    <button
                                        onClick={handleReset}
                                        className="searchButton resetIcon"
                                    >
                                        <FontAwesomeIcon
                                            icon={faArrowsRotate}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {isLoading && <div className="no-data">Loading...</div>}
                        <div className="data-container cities">
                            {!isLoading && cities.length === 0 && (
                                <div className="no-data">No users</div>
                            )}
                            {!isLoading && cities.length > 0 && (
                                <>
                                    {cities.map((city) => (
                                        <div key={city._id} className="cities">
                                            <Link to={`/cities/${city._id}`}>
                                                <figure>
                                                    <img
                                                        src={
                                                            city.img.includes(
                                                                `https://`
                                                            )
                                                                ? city.img
                                                                : `https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png`
                                                        }
                                                        alt="city-img"
                                                    />
                                                    <div>
                                                        <span>{city.name}</span>
                                                    </div>
                                                </figure>
                                            </Link>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Cities;
