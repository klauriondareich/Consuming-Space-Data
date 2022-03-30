import React from "react";
import Loader from "react-js-loader";
import {getNextLaunch, getPastLaunches} from "../services/apiService"
import {nextLaunchObj} from "../models/models"


export default class Launches extends  React.Component {

    state = {
        nextLaunchObj: {},
        past_launch_arr: [],
        isLoading: true
    };



    componentDidMount() {

        
        getNextLaunch().then(res => {
                nextLaunchObj.mission_name = res.data.mission_name;
                nextLaunchObj.mission_info = res.data.details;
                nextLaunchObj.mission_id = res.data.mission_id[0];
                nextLaunchObj.rocket_name = res.data.rocket.rocket_name;
                this.setState({ nextLaunchObj });
          });


          
          getPastLaunches().then(res => {
                const past_launch_arr = res.data;
                this.setState({ past_launch_arr });
                this.setState({isLoading: false})
          });



      }
    render(){
        return(

        <div className="main-container">
               
                <h2>Prochain lancement</h2>
                <div className="content-element width-850 first">
                    <img src="assets/img/rocket-big.png" className="rocket-big-img" alt="rocket big"/>
                    <p><span className="bold"> Code de la mission : </span>   {this.state.nextLaunchObj.mission_id}</p>
                    <p><span className="bold"> Nom de la mission : </span> {this.state.nextLaunchObj.mission_name}</p>
                    <p><span className="bold"> Information de la mission :  </span> {this.state.nextLaunchObj.mission_info}</p>
                    <p><span className="bold"> Lanceur :  </span> {this.state.nextLaunchObj.rocket_name}</p>  
                </div>

    
            <h2>Lancements passés</h2>

            <div className={this.state.isLoading ? 'show marg-left-500' : 'hide'}>
                <Loader type="spinner-default" bgColor={"#0064c2"} color={'#fff'} size={40} />           
            </div>
            { this.state.past_launch_arr.map(item => 
                <div className="content-element width-400" key={item.id}>
                    <img src="assets/img/rocket.png" alt="rocket"/>
                    <p>Nom de la mission : {item.mission_name}</p>
                    <p>Année de lancement : {item.launch_year}</p>
                    <p>Date : {new Date(item.launch_date_utc).toLocaleDateString("fr-FR")}</p>
                    <p><a href={'/launches/' + item.id}>Voir plus de détails </a></p>
                </div>
            )}
            
        </div>
        )
    }
  
  };
  
