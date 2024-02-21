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

    //search by city
    const [city, setCity] = useState("");
    //reset
    const [reset, setReset] = useState([]);

    useEffect(() => {
        axios
            .get(`${VITE_URL_API}/posts`)
            .then((res) => {
                //filter post if logged
                console.log(res.data);
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
            });
    }, [user]);

    //search by city
    const handleSearch = (name) => {
        const cityName = name[0].toUpperCase() + name.slice(1);
        const filter = posts.filter((post) => post.city === cityName);
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
                    {!posts && <div className="no-data">Loading...</div>}
                    {posts.length > 0 ? (
                        <div className="data-container posts">
                            {posts.map((post) => (
                                <div key={post._id} className="posts-data">
                                    <Post post={post} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-data">No post available</div>
                    )}
                </>
            )}
        </div>
    );
};

export default Posts;
