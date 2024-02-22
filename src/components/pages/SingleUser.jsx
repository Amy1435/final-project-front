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
                    {error && <div>{error.message}</div>}
                </div>
                <div className="user-data-container">
                    {isLoading && <div className="no-data">Loading...</div>}
                    {!isLoading && user.length === 0 && (
                        <div className="no-data">No user</div>
                    )}
                    {!error && !isLoading && user && (
                        <>
                            <div className="user-data">
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
                            </div>

                            <div className="user-data posts">
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
                            </div>
                        </>
                    )}
                </div>
            </>
        </div>
    );
};

export default SingleUser;
