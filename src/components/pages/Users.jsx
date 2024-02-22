const { VITE_URL_API } = import.meta.env;
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import User from "../singleComponents/User";
import { Context } from "../../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowsRotate,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const Users = () => {
    const { user } = useContext(Context);

    const [users, setUsers] = useState([]);
    const [error, setError] = useState();

    //Loading
    const [isLoading, setIsLoading] = useState(true);
    //search by city
    const [city, setCity] = useState("");
    //reset
    const [reset, setReset] = useState([]);

    useEffect(() => {
        axios
            .get(`${VITE_URL_API}/users`)
            .then((res) => {
                setIsLoading(false);
                console.log(res.data);
                //remove the user logged in from the user list
                if (user) {
                    const filteredUsers = res.data.filter(
                        (currUser) => currUser._id !== user._id
                    );
                    setUsers(filteredUsers);
                    setReset(filteredUsers);
                } else {
                    setUsers(res.data);
                    setReset(res.data);
                }
            })
            .catch((error) => {
                console.log(error);
                setError(true);
                setIsLoading(false);
            });
    }, [user]);

    //search by city
    const handleSearch = (name) => {
        const cityName = name[0].toUpperCase() + name.slice(1);
        const filter = users.filter((user) => user.city.name === cityName);
        setUsers(filter);
    };

    //reset
    const handleReset = () => {
        setUsers(reset);
        setCity("");
    };

    return (
        <div className="page data">
            {error && <div>{error}</div>}
            {!error && users && (
                <>
                    <div className="title-text">
                        <div>
                            <h1>Users</h1>
                        </div>
                        <div>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the standard dummy text ever since the 1500s,
                                when an unknown printer took a galley of type
                                and scrambled it to make a type specimen book.
                                It has survived not only five centuries, but
                                also the leap into electronic typesetting,
                                remaining essentially unchanged.
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
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </button>
                                <button
                                    onClick={handleReset}
                                    className="searchButton resetIcon"
                                >
                                    <FontAwesomeIcon icon={faArrowsRotate} />
                                </button>
                            </div>
                        </div>
                    </div>
                    {isLoading && <div className="no-data">Loading...</div>}
                    {!isLoading && users.length === 0 && (
                        <div className="no-data">No users</div>
                    )}
                    {!isLoading && users.length > 0 && (
                        <div className="data-container users">
                            {users.map((user) => (
                                <div key={user._id} className="users-data">
                                    <User user={user} />
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Users;
