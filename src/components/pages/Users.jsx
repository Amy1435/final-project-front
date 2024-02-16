const { VITE_URL_API } = import.meta.env;
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import User from "../singleComponents/User";
import { Context } from "../../context/UserContext";

const Users = () => {
    const { user } = useContext(Context);

    const [users, setUsers] = useState();
    const [error, setError] = useState();

    //search by city
    const [city, setCity] = useState("");
    //reset
    const [reset, setReset] = useState([]);

    useEffect(() => {
        axios
            .get(`${VITE_URL_API}/users`)
            .then((res) => {
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
            });
    }, [user]);

    //search by city
    const handleSearch = (name) => {
        const cityName = name[0].toUpperCase() + name.slice(1);
        const filter = users.filter((user) => user.from_city === cityName);
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
                            <h1>Travelers</h1>
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
                    <div className="data-container users">
                        {users.map((user) => (
                            <div key={user._id}>
                                <User user={user} />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Users;
