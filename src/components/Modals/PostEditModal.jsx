import { useState } from "react";
import axios from "axios";
const { VITE_URL_API } = import.meta.env;

const PostModal = ({ modalClose, postData, setUserPosts }) => {
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [formState, setFormState] = useState({
        title: postData.title,
        post: postData.post,
        city: postData.city,
        img: postData.img,
    });

    const id = postData._id;

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    //update user data
    const handleClick = (e) => {
        e.preventDefault();
        console.log(formState);

        axios
            .patch(`${VITE_URL_API}/posts/${id}`, formState)
            .then((res) => {
                setSuccess("Update successful");
                setUserPosts((prevPosts) =>
                    prevPosts.map((prevPost) =>
                        prevPost._id === id
                            ? { ...prevPost, ...formState }
                            : prevPost
                    )
                );
                console.log(res.data);
                modalClose();
            })
            .catch((error) => {
                console.error(error);
                setError(error);
            });

        setError("");
    };

    return (
        <div className="modal-container">
            <div className="form">
                <form onSubmit={handleClick}>
                    <h1>Update Post</h1>
                    <div className="input-container">
                        <div>
                            <span>Title</span>
                            <input
                                type="text"
                                name="title"
                                required
                                value={formState.title}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <span>City</span>
                            <input
                                type="text"
                                name="city"
                                required
                                value={formState.city}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <span>Image</span>
                            <input
                                type="text"
                                name="img"
                                required
                                value={formState.img}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <span>Post</span>
                            <textarea
                                name="post"
                                required
                                value={formState.post}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="btn-modal">
                        <button type="submit">Update</button>
                        <button onClick={modalClose}>Close</button>
                    </div>
                    {success && <div className="error">{success}</div>}
                    {error && (
                        <div className="error">
                            {error.response.data.message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default PostModal;
