import { useContext, useState } from "react";
import axios from "axios";
const { VITE_URL_API } = import.meta.env;
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/UserContext";

const UserModalDelete = ({ modalClose, userData }) => {
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { dispatch } = useContext(Context);

    const id = userData._id;

    //delete user
    const handleClick = (e) => {
        e.preventDefault();

        axios
            .delete(`${VITE_URL_API}/users/${id}`)
            .then(() => {
                setSuccess("User deleted");
                dispatch({ type: "LOGOUT" });
                navigate("/");
            })
            .catch((error) => {
                console.error(error);
                setError(error);
            });

        setError("");
    };

    return (
        <div className="modal-container">
            <div className="delete-container">
                <div>
                    <span>Are you sure, do you want to delete your user?</span>
                </div>
                <div className="btn-container">
                    <button type="submit" className="btn" onClick={handleClick}>
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

export default UserModalDelete;
