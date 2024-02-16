import phone from "../../images/phone-2.png";
const Home = () => {
    return (
        <>
            <section className="home">
                <div className="home-text">
                    <div className="text">
                        <h1>
                            Find the best place to live your digital nomad life!
                        </h1>
                        <p>
                            Find all the information about the cities you want
                            to go to and start planning your next adventure!
                        </p>
                    </div>
                    <figure>
                        <img src={phone} alt="" />
                    </figure>
                </div>
            </section>
        </>
    );
};

export default Home;
