import React from "react";
import axios from "axios";
// import getNextLaunches from "../services/launchesService";


export default class Launches extends  React.Component {

    state = {
        launchObj: {},
        past_launch_arr: []
    }


    componentDidMount() {

        axios.get(`https://api.spacex.land/rest/launch-next`)
          .then(res => {
           // const launchObj = res.data;
           // this.setState({ launchObj });
                const launchObj = {  
                    "mission_name": "",
                    "mission_info": "",
                    "mission_id": "",
                    "rocket_name": ""
                }
                launchObj.mission_name = res.data.mission_name;
                launchObj.mission_info = res.data.details;
                launchObj.mission_id = res.data.mission_id[0];
                launchObj.rocket_name = res.data.rocket.rocket_name;
                this.setState({ launchObj });
          });


          axios.get(`https://api.spacex.land/rest/launches-past?limit=4`)
          .then(res => {
                const past_launch_arr = res.data;
                this.setState({ past_launch_arr });
          })

      }
    render(){
        return(

        <div className="main-container">
                <h2>Prochain lancement</h2>
                <div className="content-element width-850 first">
                    <img src="assets/img/rocket-big.png" className="rocket-big-img" alt="rocket big"/>
                    <p><span className="bold"> Code de la mission : </span>   {this.state.launchObj.mission_id}</p>
                    <p><span className="bold"> Nom de la mission : </span> {this.state.launchObj.mission_name}</p>
                    <p><span className="bold"> Information de la mission :  </span> {this.state.launchObj.mission_info}</p>
                    <p><span className="bold"> Lanceur :  </span> {this.state.launchObj.rocket_name}</p>
                    
                </div>

    
            <h2>Lancements passés</h2>

            { this.state.past_launch_arr.slice(0, 4).map(item => 
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
  
