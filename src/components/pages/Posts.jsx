const { VITE_URL_API } = import.meta.env;
import Post from "../singleComponents/Post";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/UserContext";

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
                            <h1>Post</h1>
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
                    <div className="data-container">
                        {posts.map((post) => (
                            <div key={post._id}>
                                <Post post={post} />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Posts;
