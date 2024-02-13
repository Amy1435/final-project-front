import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
const { VITE_URL_API } = import.meta.env;

const SingleUser = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState();
    const { id } = useParams();
    useEffect(() => {
        axios
            .get(`${VITE_URL_API}/users/${id}`)
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch((error) => {
                console.log(error);
                setError(true);
            });
    }, [id]);

    return (
        <div className="page users">
            {error && <div>{error}</div>}

            {!error && user && (
                <>
                    <div className="single-data-container">
                        <figure>
                            <img src={user.profile_img} alt="" />
                        </figure>
                        <span>UserName:{user.username}</span>

                        <span>City: {user.from_city}</span>
                        <span>Age: {user.age}</span>
                        <span>
                            User since:{" "}
                            {dayjs(user.createdAt).format("DD/MM/YYYY")}
                        </span>
                        <span>Bio: {user.bio}</span>
                        <div>
                            {user.posts && user.posts.length > 0 ? (
                                <div>
                                    <span>{user.username} Posts:</span>
                                    <ul>
                                        {user.posts.map((post) => (
                                            <li key={post._id}>
                                                <Link to={`/posts/${post._id}`}>
                                                    {post.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <p>No posts available</p>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default SingleUser;
