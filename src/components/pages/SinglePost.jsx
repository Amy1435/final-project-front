import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
const { VITE_URL_API } = import.meta.env;

const SinglePost = () => {
    const [post, setPost] = useState({});
    const [error, setError] = useState();
    const { id } = useParams();
    console.log(id);
    useEffect(() => {
        axios
            .get(`${VITE_URL_API}/posts/${id}`)
            .then((response) => {
                setPost(response.data);
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
                    <div className="post-container">
                        <figure>
                            <img src={post.img} alt="" />
                        </figure>
                        <span>{post.title}</span>

                        <span>{post.city}</span>
                        <span>{post.username}</span>
                        <span>
                            {dayjs(post.createdAt).format("DD/MM/YYYY")}
                        </span>
                        <span>{post.post}</span>
                    </div>
                </>
            )}
        </div>
    );
};

export default SinglePost;
