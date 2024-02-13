import { useContext, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { Context } from "../../context/UserContext";
// const { VITE_URL_API } = import.meta.env;
const UserSettings = () => {
    // const [user, setUser] = useState();
    // const [error, setError] = useState();
    // const { id } = useParams();

    const { user } = useContext(Context);

    // useEffect(() => {
    //     axios
    //         .get(`${VITE_URL_API}/posts/${id}`)
    //         .then((res) => {
    //             console.log(res.data);
    //             setUser(res.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             setError(true);
    //         });
    // });
    return (
        <>
            <h1>User Settings</h1>
            <div className="user-settings">
                <figure>
                    <img src={user.profile_img} alt="" />
                </figure>
                <span>UserName:{user.username}</span>

                <span>City: {user.from_city}</span>
                <span>Age: {user.age}</span>
                <span>
                    User since: {dayjs(user.createdAt).format("DD/MM/YYYY")}
                </span>
                <span>Bio: {user.bio}</span>
                <div>
                    <button>Modify Settings</button>
                    <button>Eliminate your Account</button>
                </div>
            </div>
        </>
    );
};

export default UserSettings;
