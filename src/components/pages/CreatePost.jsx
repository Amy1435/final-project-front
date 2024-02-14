import { useState } from "react";
import axios from "axios";
const { VITE_URL_API } = import.meta.env;
import { useContext } from "react";
import { Context } from "../../context/UserContext";
import { useEffect } from "react";
import Post from "../singleComponents/Post";
import PostModalDelete from "../Modals/PostDeleteModal";
import PostModal from "../Modals/PostEditModal";

const CreatePost = () => {
    const { user } = useContext(Context);

    const [title, setTitle] = useState("");
    const [city, setCity] = useState("");
    const [img, setImg] = useState("");
    const [post, setPost] = useState("");
    const [error, setError] = useState();
    const [succefullMsg, setSuccefullMsg] = useState("");
    const [userPosts, setUserPosts] = useState([]);
    const [modalEditOpen, setModalEditOpen] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

    const id = user._id;

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
    const handleModalEdit = () => {
        setModalEditOpen(true);
    };
    //open modal to delete the user
    const handleModalDelete = () => {
        setModalDeleteOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`${VITE_URL_API}/posts`, {
                title: title,
                city: city,
                img: img,
                post: post,
                user: user._id,
            })
            .then((res) => {
                setSuccefullMsg(
                    "Your experience is being scared with other travelers. Thanks!"
                );
                console.log(res.data);
                setTitle("");
                setImg("");
                setCity("");
                setPost("");
            })
            .catch((error) => {
                console.error(error);
                setError(error);
            });

        setError("");
    };
    return (
        <>
            <div className="title-text">
                <div>
                    <h1>Write your travelling experience</h1>
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
                </div>
            </div>

            <div className="sign-up form">
                <form onSubmit={handleSubmit}>
                    <div>
                        <h1>Add your travel adventure</h1>
                    </div>
                    <div>
                        <div>
                            <span>UserName : {user && user.username}</span>
                        </div>
                        <div>
                            <span>Title</span>
                            <input
                                type="text"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <span>City</span>
                            <input
                                type="text"
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div>
                            <span>Travel image</span>
                            <input
                                type="text"
                                required
                                value={img}
                                onChange={(e) => setImg(e.target.value)}
                            />
                        </div>
                        <div>
                            <span>Post</span>
                            <textarea
                                required
                                value={post}
                                onChange={(e) => setPost(e.target.value)}
                            />
                        </div>
                    </div>
                    <button>Add</button>

                    {(error || succefullMsg) && (
                        <div>
                            {error ? error.response.data.message : succefullMsg}
                        </div>
                    )}
                </form>
            </div>

            <div className="user-posts">
                <h2>Your experiences</h2>
                <div className="data">
                    <div className="data-container">
                        {/* scrivi qualcosa quando gli userPosts non ci sono */}
                        {userPosts.map((post) => (
                            <>
                                <div key={post._id}>
                                    <Post post={post} />
                                    <div className="btn-container">
                                        <button
                                            onClick={handleModalEdit}
                                            className="btn"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn"
                                            onClick={handleModalDelete}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                    {modalDeleteOpen && (
                                        <PostModalDelete
                                            modalClose={() => {
                                                setModalDeleteOpen(false);
                                            }}
                                            postId={post._id}
                                        />
                                    )}
                                    {modalEditOpen && (
                                        <PostModal
                                            modalClose={() => {
                                                setModalEditOpen(false);
                                            }}
                                            postData={post}
                                            setUserPosts={setUserPosts}
                                        />
                                    )}
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreatePost;
