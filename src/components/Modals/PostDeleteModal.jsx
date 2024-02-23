import { useState } from "react";
import axios from "axios";
const { VITE_URL_API } = import.meta.env;

const PostModalDelete = ({ modalClose, postId, setUserPosts }) => {
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    //loading disable btn
    const [isLoading, setIsLoading] = useState(false);
    //delete user
    const handleClick = (e) => {
        e.preventDefault();
        setIsLoading(true);
        axios
            .delete(`${VITE_URL_API}/posts/${postId}`)
            .then(() => {
                setSuccess("Post Deleted");
                setUserPosts((prevUserPosts) =>
                    prevUserPosts.filter((post) => post._id !== postId)
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
            <div className="delete-container">
                <div>
                    <span>Are you sure, do you want to delete this post?</span>
                </div>
                <div className="btn-container">
                    <button
                        type="submit"
                        className={isLoading ? "loading" : "btn"}
                        disabled={isLoading}
                        onClick={handleClick}
                    >
                        Delete
                    </button>
                    <button
                        onClick={modalClose}
                        type="submit"
                        className="btn blue"
                    >
                        Close
                    </button>
                </div>
            </div>
            {success && <div className="error">{success}</div>}
            {error && (
                <div className="error">{error.response.data.message}</div>
            )}
        </div>
    );
};

export default PostModalDelete;
