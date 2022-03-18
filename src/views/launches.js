import React, {useState, useEffect } from "react";
import axios from "axios";
// import getNextLaunches from "../services/launchesService";


export default class Launches extends  React.Component {

    state = {
        launchItem: {
           
        }
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
                console.log(this.state)
          })

      }
    render(){
        return(

        <div className="main-container">
            <h2>Prochain le lancement</h2>
                <div className="content-element width-850 first">
                    <img src="assets/img/rocket-big.png" className="rocket-big-img" alt="rocket big"/>
                    <p><span class="bold"> Code de la mission : </span>   {this.state.launchItem.mission_id}</p>
                    <p><span class="bold"> Nom de la mission : </span> {this.state.launchItem.mission_name}</p>
                    <p><span class="bold"> Information de la mission :  </span> {this.state.launchItem.mission_info}</p>
                    <p><span class="bold"> Lanceur :  </span> {this.state.launchItem.rocket_name}</p>
                    
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
        </div>
        )
    }
  
  };
  
