import React from "react";
import axios from "axios";
import Loader from "react-js-loader";


export default class AllLaunches extends  React.Component {

    state = {
        all_launches: [],
        isLoading: true
    }


    componentDidMount() {

            // Get all launches
          axios.get(`https://api.spacex.land/rest/launches`)
          .then(res => {
                const all_launches = res.data;
                this.setState({ all_launches });
                this.setState({isLoading: false})
          })

      }
    render(){
        return(

        <div className="main-container">
    
            <h2>Tous les lancements</h2>

            <div className={this.state.isLoading ? 'show marg-left-500' : 'hide'}>
                <Loader type="spinner-default" bgColor={"#0064c2"} color={'#fff'} size={40} />           
            </div>

            { this.state.all_launches.slice(0, 4).map(item => 
                <div className="content-element width-400" key={item.id}>
                    <img src="assets/img/rocket.png" alt="rocket"/>
                    <p>Nom de la mission : {item.mission_name}</p>
                    <p>Année de lancement : {item.launch_year}</p>
                    <p><a href={'/launches/' + item.id}>Voir plus de détails </a></p>
                </div>
            )}
            
        </div>
        )
    }
  
  };
  
