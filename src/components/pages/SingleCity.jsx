import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Post from "../singleComponents/Post";
import User from "../singleComponents/User";
import { Context } from "../../context/UserContext";
const { VITE_URL_API } = import.meta.env;

const SingleCity = () => {
    const { user } = useContext(Context);

    const [city, setCity] = useState({});
    const [posts, setPosts] = useState({});
    const [users, setUsers] = useState({});
    const [error, setError] = useState();
    const { id } = useParams();
    const name = city.name;

    //get city data
    useEffect(() => {
        axios
            .get(`${VITE_URL_API}/cities/${id}`)
            .then((res) => {
                console.log(res.data);
                setCity(res.data);
            })
            .catch((error) => {
                console.log(error);
                setError(true);
            });
    }, [id]);

    //get city posts
    useEffect(() => {
        axios
            .get(`${VITE_URL_API}/posts?city=${name}`)
            .then((res) => {
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
                console.log(error);
                setError(true);
            });
    }, [name, user]);

    //get city users
    useEffect(() => {
        axios
            .get(`${VITE_URL_API}/users?city=${name}`)
            .then((res) => {
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
                console.log(error);
                setError(true);
            });
    }, [name, user]);

    return (
        <div className="page citys">
            {error && <div>{error}</div>}

            {!error && city && (
                <>
                    <div className="single-data-container">
                        <figure>
                            <img src={city.img} alt="" />
                        </figure>
                        <span>Name: {city.name}</span>
                        <span>Country: {city.country}</span>
                        <span>Continent: {city.continent}</span>
                        <span>Population:{city.population}</span>
                        <span>Internet Speed: {city.internet_speed}</span>
                        <span>Sefety Level: {city.sefety_level}</span>
                        <span>
                            Cost of living- one mounth:{" "}
                            {city.cost_of_living_month}
                        </span>
                    </div>
                    {posts.length === 0 && <div>No Posts yet </div>}
                    {users.length === 0 && <div>No Users from this city </div>}
                    {posts.length > 0 && (
                        <div className="page data">
                            <div className="data-container">
                                <h1>Digital Nomad experiences</h1>
                                {posts.map((post) => (
                                    <div key={post._id}>
                                        <Post post={post} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {users.length > 0 && (
                        <div className="page data">
                            <div className="data-container users">
                                <h1>Users from this city</h1>
                                {users.map((user) => (
                                    <div key={user._id}>
                                        <User user={user} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default SingleCity;
