import '../App.css';

const Home = () => {
    return <div className="App">
        <header className="App-header">

        <img src="assets/img/globe2.png" className="App-logo" alt="logo" />
        <p>
            Bienvenue dans le monde de l'espace  <br/> Accéder à toutes les informations sur les lancements des fusées.
        </p>
        <a
            className="App-link"
            href="/launches"
        >
            Immersion maintenant
        </a>
        </header>
    </div>;
  };
  
  export default Home;


