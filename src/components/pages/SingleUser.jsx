import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
const { VITE_URL_API } = import.meta.env;

const SingleUser = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    useEffect(() => {
        axios
            .get(`${VITE_URL_API}/users/${id}`)
            .then((res) => {
                setIsLoading(false);
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
            <>
                <div className="title-text">
                    <div>
                        <h1>{user.username}</h1>
                    </div>

                    {error && <div>{error.message}</div>}
                </div>
                <div className="user-data-container">
                    {isLoading && <div className="no-data">Loading...</div>}
                    {!isLoading && user.length === 0 && (
                        <div className="no-data">No user</div>
                    )}
                    {!error && !isLoading && user && (
                        <>
                            <section className="user-data">
                                <figure>
                                    <img
                                        src={
                                            user.profile_img.includes(
                                                `https://`
                                            )
                                                ? user.profile_img
                                                : `https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png`
                                        }
                                        alt="profile_img"
                                    />
                                </figure>
                                <div className="data">
                                    <span>UserName: {user.username}</span>
                                    <div>
                                        <span>From: </span>
                                        <span>
                                            <Link
                                                to={`/cities/${user.city?._id}`}
                                                className="city"
                                            >
                                                {" "}
                                                {user.city?.name}
                                            </Link>
                                        </span>
                                    </div>
                                    <span>Age: {user.age}</span>

                                    <span>
                                        User since:{" "}
                                        {dayjs(user.createdAt).format(
                                            "DD/MM/YYYY"
                                        )}
                                    </span>
                                    <span>{user.bio}</span>
                                </div>
                            </section>

                            <section className="user-data posts">
                                <div>
                                    <h2>{user.username} Posts</h2>
                                </div>
                                <div className="post-container">
                                    {isLoading && (
                                        <div className="no-data">
                                            Loading...
                                        </div>
                                    )}
                                    {!isLoading && user.posts.length === 0 && (
                                        <div className="no-data">No Posts</div>
                                    )}
                                    {!isLoading &&
                                        user.posts.length > 0 &&
                                        user.posts.map((post) => (
                                            <div
                                                key={post._id}
                                                className="data"
                                            >
                                                <Link to={`/posts/${post._id}`}>
                                                    <div className="title-post">
                                                        <p>{post.title}</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))}
                                </div>
                            </section>
                        </>
                    )}
                </div>
            </>
        </div>
    );
};

export default SingleUser;
