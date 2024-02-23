import { useState } from "react";
import axios from "axios";
const { VITE_URL_API } = import.meta.env;

const PostModal = ({ modalClose, postData, setUserPosts }) => {
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    //loading disable btn
    const [isLoading, setIsLoading] = useState(false);
    const [formState, setFormState] = useState({
        title: postData.title,
        post: postData.post,
        img: postData.img,
        //non permetto di modificare la citta' del post perche' secondo me non ha senso
    });

    const id = postData._id;

    //change data
    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    //update post data
    const handleClick = (e) => {
        e.preventDefault();
        setIsLoading(true);
        axios
            .patch(`${VITE_URL_API}/posts/${id}`, formState)
            .then(() => {
                setSuccess("Update successful");
                setUserPosts((prevPosts) =>
                    prevPosts.map((prevPost) =>
                        prevPost._id === id
                            ? { ...prevPost, ...formState }
                            : prevPost
                    )
                );
                modalClose();
            })
            .catch((error) => {
                console.error(error);
                setError(error);
            });

        setIsLoading(false);
    };

    return (
        <div className="modal-container">
            <div className="form-container-new">
                <div className="form-new">
                    <form onSubmit={handleClick}>
                        <div className="input-container">
                            <div>
                                <span>Title</span>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    value={formState.title}
                                    onChange={handleChange}
                                    className="data-input"
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
                                    className="data-input"
                                />
                            </div>
                            <div>
                                <span>Post</span>
                                <textarea
                                    name="post"
                                    required
                                    value={formState.post}
                                    onChange={handleChange}
                                    className="data-input"
                                />
                            </div>
                        </div>
                        <div className="btn-container">
                            <button
                                type="submit"
                                className={isLoading ? "loading" : "btn blue"}
                                disabled={isLoading}
                            >
                                Update
                            </button>
                            <button onClick={modalClose} className="btn">
                                Close
                            </button>
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
        </div>
    );
};

export default PostModal;
