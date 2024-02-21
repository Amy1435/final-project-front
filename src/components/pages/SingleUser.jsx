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
                    {!user && <div>Loading...</div>}
                </div>
                {!error && user && (
                    <div className="user-data-container">
                        <div className="user-data">
                            <figure>
                                <img src={user.profile_img} alt="" />
                            </figure>
                            <div className="data">
                                <span>UserName: {user.username}</span>
                                <div>
                                    <span>City: </span>
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
                                    {dayjs(user.createdAt).format("DD/MM/YYYY")}
                                </span>
                                <span>Bio: {user.bio}</span>
                            </div>
                        </div>

                        <div className="user-data posts">
                            <div>
                                <h2>{user.username} Posts</h2>
                            </div>
                            <div className="post-container">
                                {user.posts && user.posts.length > 0 ? (
                                    user.posts.map((post) => (
                                        <div key={post._id} className="data">
                                            <Link to={`/posts/${post._id}`}>
                                                <div className="title-post">
                                                    <p>{post.title}</p>
                                                </div>
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <p className="no-data">
                                        {user.username} has no posts
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </>
        </div>
    );
};

export default SingleUser;
