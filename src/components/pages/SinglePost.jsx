import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
const { VITE_URL_API } = import.meta.env;

const SinglePost = () => {
    const [post, setPost] = useState({});
    const [error, setError] = useState();
    const { id } = useParams();
    useEffect(() => {
        axios
            .get(`${VITE_URL_API}/posts/${id}`)
            .then((res) => {
                console.log(res.data);
                setPost(res.data);
            })
            .catch((error) => {
                console.log(error);
                setError(true);
            });
    }, [id]);

    return (
        <div className="page posts">
            <>
                <div className="title-text">
                    <div>
                        <h1>Post</h1>
                    </div>
                    <div>
                        <p>
                            Sharing your travel experiences helps create a sense
                            of community among travelers. Your insights may
                            prove invaluable to someone planning a similar trip,
                            providing them with guidance and support. Travel is
                            not just about places but also about people and
                            cultures. Sharing your encounters and interactions
                            can foster a greater understanding of different
                            lifestyles, traditions, and customs, promoting
                            cultural exchange.
                        </p>
                    </div>
                    {error && <div className="no-data">Server Error</div>}
                    {!post && <div className="no-data">Loading...</div>}
                </div>
                {!error && post && (
                    <div className="single-post-container">
                        <div className="post">
                            <figure>
                                <img src={post.img} alt="" />
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
                    </div>
                )}
            </>
        </div>
    );
};

export default SinglePost;
