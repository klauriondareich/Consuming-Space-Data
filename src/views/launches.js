
const Launches = () => {
    return <div className="main-container">

        <img src="assets/img/nasa.jpg" height="400" width="900" className="nasa-img" alt="nasa-img"/>

        <h2>Prochain le lancement</h2>
        <div className="content-element width-500 first">
            <img src="assets/img/rocket-big.png" className="rocket-big-img" alt="rocket big"/>
            <p>Date du lancement : </p>
            <p>Lanceur : </p>
        </div>

        <h2>Lancements passés</h2>
        <div className="content-element width-400">
            <img src="assets/img/rocket.png" alt="rocket"/>
            <p>Date du lancement : </p>
            <p><a href="/">Lanceur : </a></p>
        </div>
        <div className="content-element width-400">
            <img src="assets/img/rocket.png" alt="rocket"/>
            <p>Date du lancement : </p>
            <p><a href="/">Lanceur : </a></p>
        </div>
        <div className="content-element width-400">
            <img src="assets/img/rocket.png" alt="rocket"/>
            <p>Date du lancement : </p>
            <p><a href="/">Lanceur : </a></p>
        </div>
    </div>;
  };
  
  export default Launches;