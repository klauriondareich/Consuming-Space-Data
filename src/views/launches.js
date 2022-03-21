import React, {useState, useEffect } from "react";
import axios from "axios";
// import getNextLaunches from "../services/launchesService";


export default class Launches extends  React.Component {

    state = {
        launchItem: {},
        past_launch_items: []
    }


    componentDidMount() {

        axios.get(`https://api.spacex.land/rest/launch-next`)
          .then(res => {
           // const launchItem = res.data;
           // this.setState({ launchItem });
                const launchItem = {  
                    "mission_name": "",
                    "mission_info": "",
                    "mission_id": "",
                    "rocket_name": ""
                }
                launchItem.mission_name = res.data.mission_name;
                launchItem.mission_info = res.data.details;
                launchItem.mission_id = res.data.mission_id[0];
                launchItem.rocket_name = res.data.rocket.rocket_name;
                this.setState({ launchItem });
          });


          axios.get(`https://api.spacex.land/rest/launches-past?limit=4`)
          .then(res => {
                const past_launch_items = res.data;
                this.setState({ past_launch_items });
          })

      }
    render(){
        return(

        <div className="main-container">
            <h2>Prochain lancement</h2>
                <div className="content-element width-850 first">
                    <img src="assets/img/rocket-big.png" className="rocket-big-img" alt="rocket big"/>
                    <p><span className="bold"> Code de la mission : </span>   {this.state.launchItem.mission_id}</p>
                    <p><span className="bold"> Nom de la mission : </span> {this.state.launchItem.mission_name}</p>
                    <p><span className="bold"> Information de la mission :  </span> {this.state.launchItem.mission_info}</p>
                    <p><span className="bold"> Lanceur :  </span> {this.state.launchItem.rocket_name}</p>
                    
                </div>

    
            <h2>Lancements passés</h2>

            { this.state.past_launch_items.slice(0, 4).map(item => 
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
  
