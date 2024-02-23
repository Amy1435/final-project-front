import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../context/UserContext";
const { VITE_URL_API } = import.meta.env;

const SingleCity = () => {
    const { user } = useContext(Context);

    const [city, setCity] = useState({});
    const [posts, setPosts] = useState({});
    const [users, setUsers] = useState({});
    const [error, setError] = useState();
    //Loading
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useParams();

    //get city data
    useEffect(() => {
        axios
            .get(`${VITE_URL_API}/cities/${id}`)
            .then((res) => {
                setIsLoading(false);
                console.log(res.data);
                setCity(res.data);
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error);
                setError(true);
            });
    }, [id]);

    //get city posts
    useEffect(() => {
        axios
            .get(`${VITE_URL_API}/posts?city=${id}`)
            .then((res) => {
                setIsLoading(false);
                console.log(res.data);
                //if user logged in filter
                if (user) {
                    const filterUsers = res.data.filter(
                        (post) => post.user._id !== user._id
                    );
                    setPosts(filterUsers);
                } else {
                    setPosts(res.data);
                }
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error);
                setError(true);
            });
    }, [id, user]);

    //get city users
    useEffect(() => {
        axios
            .get(`${VITE_URL_API}/users?city=${id}`)
            .then((res) => {
                setIsLoading(false);
                //filter post if logged
                console.log(res.data);
                if (user) {
                    const filterPosts = res.data.filter(
                        (currUser) => currUser._id !== user._id
                    );
                    setUsers(filterPosts);
                } else {
                    setUsers(res.data);
                }
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error);
                setError(true);
            });
    }, [id, user]);

    return (
        <div className="page citys">
            <div className="title-text">
                <div>
                    <h1>{city.name}</h1>
                </div>
            </div>
            {error && <div className="no-data">Server Error</div>}

            {!error && (
                <>
                    <div className="single-city-container">
                        {isLoading && <div className="no-data">Loading...</div>}
                        {!isLoading && city.length === 0 && (
                            <div className="no-data">No Post available</div>
                        )}
                        {!isLoading && city && (
                            <>
                                <section className="basic-info">
                                    <div className="title">
                                        <span>Basic Information</span>
                                    </div>

                                    <div className="data">
                                        <span>Name</span>
                                        <span>{city.name}</span>
                                    </div>
                                    <div className="data">
                                        <span>Country</span>
                                        <span>{city.country}</span>
                                    </div>
                                    <div className="data">
                                        <span>Continent</span>
                                        <span>{city.continent}</span>
                                    </div>
                                    <div className="data">
                                        <span>Population</span>
                                        <span>{city.population} people</span>
                                    </div>
                                </section>
                                <section className="nomad-info">
                                    <div className="title">
                                        <span>Digital Nomad Information</span>
                                    </div>
                                    <div className="data">
                                        <span>Internet Speed</span>
                                        <span>{city.internet_speed} Mbps</span>
                                    </div>
                                    <div className="data">
                                        <span>Sefety Level</span>
                                        <span>{city.sefety_level}/10</span>
                                    </div>

                                    <div className="data">
                                        <span> Cost of living</span>
                                        <span>
                                            {" "}
                                            {city.cost_of_living_month} dollars/
                                            per month
                                        </span>
                                    </div>
                                </section>
                            </>
                        )}

                        <section className="city-posts-container">
                            <div className="title">
                                <span>Digital Nomad Experiences</span>
                            </div>

                            {isLoading && (
                                <div className="no-data">Loading...</div>
                            )}
                            {!isLoading && posts.length === 0 && (
                                <div className="no-data">No Post available</div>
                            )}
                            {!isLoading &&
                                posts.length > 0 &&
                                posts.map((post) => (
                                    <div key={post._id} className="city-post">
                                        <Link to={`/posts/${post._id}`}>
                                            <figure>
                                                <img src={post.img} alt="" />
                                            </figure>
                                            <span>{post.title}</span>
                                        </Link>
                                    </div>
                                ))}
                        </section>

                        <section className="city-users-container">
                            <div className="title">
                                <span>Users from this city</span>
                            </div>
                            {isLoading && (
                                <div className="no-data">Loading...</div>
                            )}
                            {!isLoading && users.length === 0 && (
                                <div className="no-data">No Post available</div>
                            )}
                            <div className="city-users-grid">
                                {!isLoading &&
                                    users.length > 0 &&
                                    users.map((user) => (
                                        <div key={user._id} className="user2">
                                            <Link to={`/users/${user._id}`}>
                                                <figure>
                                                    <img
                                                        src={user.profile_img}
                                                        alt=""
                                                    />
                                                </figure>
                                                <span> {user.username}</span>
                                            </Link>
                                        </div>
                                    ))}
                            </div>
                        </section>
                    </div>
                </>
            )}
        </div>
    );
};

export default SingleCity;
