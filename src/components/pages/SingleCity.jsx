import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Post from "../singleComponents/Post";
const { VITE_URL_API } = import.meta.env;

const SingleCity = () => {
    const [city, setCity] = useState({});
    const [posts, setPosts] = useState({});
    const [error, setError] = useState();
    const { id } = useParams();

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

    useEffect(() => {
        axios
            .get(`${VITE_URL_API}/posts?city=${city.name}`)
            .then((res) => {
                console.log(res.data);
                setCity(res.data);
            })
            .catch((error) => {
                console.log(error);
                setError(true);
            });
    }, []);

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
                    {posts.length > 0 && (
                        <div className="data-container">
                            {posts.map((post) => (
                                <div key={post._id}>
                                    <Post post={post} />
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default SingleCity;
