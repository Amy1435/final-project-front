const { VITE_URL_API } = import.meta.env;
import axios from "axios";
import { useEffect, useState } from "react";
import User from "../singleComponents/User";

const Users = () => {
    const [users, setUsers] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        axios
            .get(`${VITE_URL_API}/users`)
            .then((res) => {
                console.log(res.data);
                setUsers(res.data);
            })
            .catch((error) => {
                console.log(error);
                setError(true);
            });
    }, []);

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
                        <span>Cerca per Cita</span>
                        <div>
                            <input type="text" />
                            <button>Search</button>
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
