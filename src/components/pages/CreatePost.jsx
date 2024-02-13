import { useState } from "react";
import axios from "axios";
const { VITE_URL_API } = import.meta.env;
import { useContext } from "react";
import { Context } from "../../context/UserContext";

const CreatePost = () => {
    const { user } = useContext(Context);

    const [title, setTitle] = useState("");
    const [city, setCity] = useState("");
    const [img, setImg] = useState("");
    const [post, setPost] = useState("");
    const [error, setError] = useState();
    const [succefullMsg, setSuccefullMsg] = useState("");

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
                        <div>{error ? error.response.data : succefullMsg}</div>
                    )}
                </form>
            </div>
        </>
    );
};

export default CreatePost;
