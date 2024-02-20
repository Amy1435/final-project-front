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
            {error && <div>{error}</div>}

            {!error && post && (
                <>
                    <div className="single-data-container">
                        <figure>
                            <img src={post.img} alt="" />
                        </figure>
                        <span>Title: {post.title}</span>

                        <span>
                            City:
                            <Link to={`/cities/${post.user?._id}`}>
                                {post.city}
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
                            {dayjs(post.createdAt).format("DD/MM/YYYY")}
                        </span>
                        <span>Post:{post.post}</span>
                    </div>
                </>
            )}
        </div>
    );
};

export default SinglePost;
