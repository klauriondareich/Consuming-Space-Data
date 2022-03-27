import React from "react";
import Loader from "react-js-loader";
import {getNextLaunch, getPastLaunches} from "../services/apiService"


export default class Launches extends  React.Component {

    state = {
        launchObj: {},
        past_launch_arr: [],
        isLoading: true
    };



    componentDidMount() {

        
        getNextLaunch().then(res => {
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
                    <p><span className="bold"> Code de la mission : </span>   {this.state.launchObj.mission_id}</p>
                    <p><span className="bold"> Nom de la mission : </span> {this.state.launchObj.mission_name}</p>
                    <p><span className="bold"> Information de la mission :  </span> {this.state.launchObj.mission_info}</p>
                    <p><span className="bold"> Lanceur :  </span> {this.state.launchObj.rocket_name}</p>  
                </div>

    
            <h2>Lancements passés</h2>

            <div className={this.state.isLoading ? 'show marg-left-500' : 'hide'}>
                <Loader type="spinner-default" bgColor={"#0064c2"} color={'#fff'} size={40} />           
            </div>
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
  
