import { useContext, useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Context } from "../../context/UserContext";
import UserModal from "../Modals/UserEditModal";
import UserModalDelete from "../Modals/UserDeleteModal";
import PostModalDelete from "../Modals/PostDeleteModal";
import PostModal from "../Modals/PostEditModal";
const { VITE_URL_API } = import.meta.env;

const UserSettings = () => {
    const { user } = useContext(Context);

    const [userData, setUserData] = useState();
    //modal user
    const [modalEditOpenUser, setModalEditOpenUser] = useState(false);
    const [modalDeleteOpenUser, setModalDeleteOpenUser] = useState(false);
    //modal posts
    const [modalEditOpenPost, setModalEditOpenPost] = useState(false);
    const [modalDeleteOpenPost, setModalDeleteOpenPost] = useState(false);
    const [error, setError] = useState();
    //post to edit or eliminate
    const [userPosts, setUserPosts] = useState([]);
    const id = user._id;

    //dati user
    useEffect(() => {
        axios
            .get(`${VITE_URL_API}/users/${id}`)
            .then((res) => {
                console.log(res.data);
                setUserData(res.data);
            })
            .catch((error) => {
                console.log(error);
                setError(true);
            });
    }, [id]);

    //get user posts
    useEffect(() => {
        axios
            .get(`${VITE_URL_API}/posts?user=${id}`)
            .then((response) => {
                console.log(response.data);
                setUserPosts(response.data);
            })
            .catch((error) => {
                console.log(error);
                setError(true);
            });
    }, [id]);

    //open modal to edit the user
    const handleModalEditUser = () => {
        setModalEditOpenUser(true);
    };
    //open modal to delete the user
    const handleModalDeleteUser = () => {
        setModalDeleteOpenUser(true);
    };

    //open modal to edit the post
    const handleModalEditPost = () => {
        setModalEditOpenPost(true);
    };

    //open modal to delete the user

    const handleModalDeletePost = () => {
        setModalDeleteOpenPost(true);
    };

    return (
        <>
            {!error && userData && (
                <>
                    <div className="title-text">
                        <div>
                            <h1>User Settings</h1>
                        </div>
                        <div>
                            <p>
                                Sharing your travel experiences helps create a
                                sense of community among travelers. Your
                                insights may prove invaluable to someone
                                planning a similar trip, providing them with
                                guidance and support. Travel is not just about
                                places but also about people and cultures.
                                Sharing your encounters and interactions can
                                foster a greater understanding of different
                                lifestyles, traditions, and customs, promoting
                                cultural exchange.
                            </p>
                        </div>
                    </div>
                    <div className="user-data-container">
                        <div className="user-data">
                            {!userData && (
                                <div className="no-data">...Loading</div>
                            )}
                            {userData && (
                                <>
                                    <figure>
                                        <img
                                            src={userData.profile_img}
                                            alt=""
                                        />
                                    </figure>
                                    <div className="data">
                                        <span>
                                            UserName:{userData.username}
                                        </span>

                                        <span>
                                            City:{""} {userData.from_city}
                                        </span>
                                        <span>
                                            Age:{""}
                                            {userData.age}
                                        </span>
                                        <span>
                                            User since:{" "}
                                            {dayjs(userData.createdAt).format(
                                                "DD/MM/YYYY"
                                            )}
                                        </span>
                                        <span className="bio">
                                            Bio:{""} {userData.bio}
                                        </span>
                                    </div>
                                    <div className="btn-container">
                                        <button
                                            onClick={handleModalEditUser}
                                            className="btn blue"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn red"
                                            onClick={handleModalDeleteUser}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="user-data posts">
                            <div>
                                <h2>Your Posts</h2>
                            </div>
                            {!userPosts && (
                                <div className="no-data">...Loading</div>
                            )}
                            {userPosts && userPosts.length > 0 ? (
                                userPosts.map((post) => (
                                    <div key={post._id} className="data">
                                        <div className="title">
                                            <h2>{post.title}</h2>
                                        </div>
                                        <div className="user-post">
                                            <span>{post.post}</span>
                                        </div>
                                        <div className="btn-container">
                                            <button
                                                onClick={handleModalEditPost}
                                                className="btn blue"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn"
                                                onClick={handleModalDeletePost}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                        {modalEditOpenPost && (
                                            <PostModal
                                                modalClose={() => {
                                                    setModalEditOpenPost(false);
                                                }}
                                                postData={post}
                                                setUserPosts={setUserPosts}
                                            />
                                        )}
                                        {modalDeleteOpenPost && (
                                            <PostModalDelete
                                                modalClose={() => {
                                                    setModalDeleteOpenPost(
                                                        false
                                                    );
                                                }}
                                                postId={post._id}
                                            />
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="no-data">No posts yet</p>
                            )}
                        </div>
                    </div>
                </>
            )}
            {modalEditOpenUser && (
                <UserModal
                    modalClose={() => {
                        setModalEditOpenUser(false);
                    }}
                    userData={userData}
                    setUserData={setUserData}
                />
            )}
            {modalDeleteOpenUser && (
                <UserModalDelete
                    modalClose={() => {
                        setModalDeleteOpenUser(false);
                    }}
                    userData={userData}
                />
            )}
        </>
    );
};

export default UserSettings;
