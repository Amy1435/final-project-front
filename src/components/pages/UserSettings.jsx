import { useContext, useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Context } from "../../context/UserContext";
import UserModal from "../Modals/UserEditModal";
import UserModalDelete from "../Modals/UserDeleteModal";
const { VITE_URL_API } = import.meta.env;
const UserSettings = () => {
    const { user } = useContext(Context);

    const [userData, setUserData] = useState();
    const [modalEditOpen, setModalEditOpen] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [error, setError] = useState();

    const id = user._id;

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

    //open modal to edit the user
    const handleModalEdit = () => {
        setModalEditOpen(true);
    };
    //open modal to delete the user
    const handleModalDelete = () => {
        setModalDeleteOpen(true);
    };
    return (
        <>
            {!error && userData && (
                <>
                    <h1>User Settings</h1>
                    <div className="user-settings">
                        <figure>
                            <img src={userData.profile_img} alt="" />
                        </figure>
                        <span>UserName:{userData.username}</span>

                        <span>City: {userData.from_city}</span>
                        <span>Age: {userData.age}</span>
                        <span>
                            User since:{" "}
                            {dayjs(userData.createdAt).format("DD/MM/YYYY")}
                        </span>
                        <span>Bio: {userData.bio}</span>
                        <div className="btn-container">
                            <button onClick={handleModalEdit} className="btn">
                                Edit
                            </button>
                            <button className="btn" onClick={handleModalDelete}>
                                Delete
                            </button>
                        </div>
                    </div>
                </>
            )}
            {modalEditOpen && (
                <UserModal
                    modalClose={() => {
                        setModalEditOpen(false);
                    }}
                    userData={userData}
                    setUserData={setUserData}
                />
            )}
            {modalDeleteOpen && (
                <UserModalDelete
                    modalClose={() => {
                        setModalDeleteOpen(false);
                    }}
                    userData={userData}
                />
            )}
        </>
    );
};

export default UserSettings;
