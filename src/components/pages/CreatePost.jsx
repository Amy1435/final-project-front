import { useState } from "react";
import axios from "axios";
const { VITE_URL_API } = import.meta.env;
import { useContext } from "react";
import { Context } from "../../context/UserContext";
import { useEffect } from "react";
import CityModal from "../Modals/CityCreateModal";

const CreatePost = () => {
    const { user, token } = useContext(Context);
    //to create the post
    const [title, setTitle] = useState("");
    const [img, setImg] = useState("");
    const [post, setPost] = useState("");
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    //messages
    const [error, setError] = useState();
    const [succefullMsg, setSuccefullMsg] = useState("");
    //modals
    const [modalCreateCity, setModalCreateCity] = useState(false);

    //get cities
    useEffect(() => {
        axios
            .get(`${VITE_URL_API}/cities`)
            .then((response) => {
                setCities(response.data);
            })
            .catch((error) => {
                console.error(error);
                setError(true);
            });
    }, []);

    //open modal to create city
    const handleModalCity = () => {
        setModalCreateCity(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(
                `${VITE_URL_API}/posts`,
                {
                    title: title,
                    city: selectedCity,
                    img: img,
                    post: post,
                    user: user._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(() => {
                setSuccefullMsg(
                    "Your experience is being shared with other travelers. Thanks!"
                );
                setTitle("");
                setImg("");
                setPost("");
                setSelectedCity("");
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
                    <h1>Write your experience</h1>
                </div>
                <div>
                    <p>
                        Sharing your travel experiences helps create a sense of
                        community among travelers. Your insights may prove
                        invaluable to someone planning a similar trip, providing
                        them with guidance and support. Travel is not just about
                        places but also about people and cultures. Sharing your
                        encounters and interactions can foster a greater
                        understanding of different lifestyles, traditions, and
                        customs, promoting cultural exchange.
                    </p>
                </div>
            </div>

            <div className="form-container-new">
                <div className="form-new">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div className="username">
                                <span>UserName : {user && user.username}</span>
                            </div>
                            <div>
                                <span>Title</span>
                                <input
                                    type="text"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="data-input"
                                />
                            </div>
                            <div>
                                <span>City</span>
                                <div className="city">
                                    <select
                                        required
                                        value={selectedCity}
                                        onChange={(e) =>
                                            setSelectedCity(e.target.value)
                                        }
                                        className="data-input"
                                    >
                                        <option value="" disabled>
                                            Select a city
                                        </option>
                                        {cities.map((city) => (
                                            <option
                                                key={city._id}
                                                value={city._id}
                                                onChange={(e) =>
                                                    setSelectedCity(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                {city.name}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        className="add-city"
                                        onClick={handleModalCity}
                                    >
                                        Add New City
                                    </button>
                                </div>
                            </div>
                            <div>
                                <span>Travel image</span>
                                <input
                                    type="text"
                                    required
                                    value={img}
                                    onChange={(e) => setImg(e.target.value)}
                                    className="data-input"
                                />
                            </div>
                            <div>
                                <span>Post</span>
                                <textarea
                                    required
                                    value={post}
                                    onChange={(e) => setPost(e.target.value)}
                                    className="data-input"
                                />
                            </div>
                        </div>
                        <button type="submit">Add</button>

                        {(error || succefullMsg) && (
                            <div className="error-message">
                                {error
                                    ? error.response.data.message
                                    : succefullMsg}
                            </div>
                        )}
                    </form>
                </div>
            </div>
            {modalCreateCity && (
                <CityModal
                    modalClose={() => {
                        setModalCreateCity(false);
                    }}
                    setCities={setCities}
                />
            )}
        </>
    );
};

export default CreatePost;
