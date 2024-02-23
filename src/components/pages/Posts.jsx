const { VITE_URL_API } = import.meta.env;
import Post from "../singleComponents/Post";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowsRotate,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const Posts = () => {
    const { user } = useContext(Context);

    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");
    //Loading
    const [isLoading, setIsLoading] = useState(true);
    //search by city
    const [city, setCity] = useState("");
    //reset
    const [reset, setReset] = useState([]);

    useEffect(() => {
        axios
            .get(`${VITE_URL_API}/posts`)
            .then((res) => {
                setIsLoading(false);
                console.log(res.data);
                //filter post if logged
                if (user) {
                    const filterPosts = res.data.filter(
                        (post) => post.user._id !== user._id
                    );
                    setPosts(filterPosts);
                    setReset(filterPosts);
                } else {
                    setPosts(res.data);
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
        const filter = posts.filter((post) => post.city?.name === cityName);
        setPosts(filter);
    };

    //reset
    const handleReset = () => {
        setPosts(reset);
        setCity("");
    };
    return (
        <div className="page data">
            {error && <div>{error}</div>}
            {!error && posts && (
                <>
                    <div className="title-text">
                        <div>
                            <h1>Posts</h1>
                        </div>
                        <div>
                            <p>
                                Dive into the experiences of fellow digital
                                nomads on this page. Read inspiring stories,
                                travel tips, and firsthand accounts from
                                globetrotters who have explored the world while
                                working remotely. Whether you are seeking advice
                                or looking to share your own journey, this is
                                the space to connect with like-minded
                                individuals.
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
                    {!isLoading && posts.length === 0 && (
                        <div className="no-data">No users</div>
                    )}
                    {!isLoading && posts.length > 0 && (
                        <div className="data-container posts">
                            {posts.map((post) => (
                                <div key={post._id} className="posts-data">
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

export default Posts;
