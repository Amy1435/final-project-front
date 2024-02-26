import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
const { VITE_URL_API } = import.meta.env;

const SinglePost = () => {
    const [post, setPost] = useState({});
    const [error, setError] = useState();
    //Loading
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    useEffect(() => {
        axios
            .get(`${VITE_URL_API}/posts/${id}`)
            .then((res) => {
                setIsLoading(false);
                setPost(res.data);
            })
            .catch((error) => {
                setIsLoading(false);
                console.error(error);
                setError(true);
            });
    }, [id]);

    return (
        <div className="page posts">
            <>
                <div className="title-text">
                    <div className="title">
                        <h1>{post.title}</h1>
                    </div>
                    {error && <div className="no-data">Server Error</div>}
                </div>
                <div className="single-post-container">
                    {isLoading && <div className="no-data">Loading...</div>}
                    {!isLoading && post.length === 0 && (
                        <div className="no-data">No Post available</div>
                    )}
                    {!error && !isLoading && post && (
                        <div className="post">
                            <figure>
                                <img
                                    src={
                                        post.img.includes(`https://`)
                                            ? post.img
                                            : `https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png`
                                    }
                                />
                            </figure>
                            <div className="complite-post">
                                <div className="post-title">
                                    <span> {post.title}</span>
                                </div>
                                <div className="posts-details">
                                    <span>
                                        City:
                                        <Link to={`/cities/${post.city?._id}`}>
                                            {post.city?.name}
                                        </Link>
                                    </span>
                                    <span>
                                        User:{" "}
                                        <Link to={`/users/${post.user?._id}`}>
                                            {post.user?.username}
                                        </Link>
                                    </span>
                                    <span>
                                        Created :{" "}
                                        {dayjs(post.createdAt).format(
                                            "DD/MM/YYYY"
                                        )}
                                    </span>
                                </div>
                                <div>
                                    <span>{post.post}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </>
        </div>
    );
};

export default SinglePost;
