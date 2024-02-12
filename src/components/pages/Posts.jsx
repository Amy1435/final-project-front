const { VITE_URL_API } = import.meta.env;
import Post from "../post/post";
import axios from "axios";
import { useEffect, useState } from "react";

const Posts = () => {
    const [posts, setPosts] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        axios
            .get(`${VITE_URL_API}/posts`)
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => {
                console.log(error);
                setError(true);
            });
    }, []);

    return (
        <div className="page posts">
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
                        <span>Cerca per Cita</span>
                        <div>
                            <input type="text" />
                            <button>Search</button>
                        </div>
                    </div>
                    <div className="posts-container">
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
