import React from "react";
import { useParams } from "react-router-dom";
import {getALaunch} from "../services/apiService"
import {viewLaunchObj} from "../models/models"



export  class ViewLaunch extends  React.Component{

    state = {
        viewLaunchObj: {},
        launchItem: [],
        isVisible: false
    }
   
    
    componentDidMount() {

        const id = this.props.params.id;

        getALaunch(id).then(res => {
            
              viewLaunchObj.mission_name = res.data.mission_name;
              viewLaunchObj.mission_info = res.data.details;
              viewLaunchObj.mission_id = res.data.mission_id[0];
              viewLaunchObj.rocket_name = res.data.rocket.rocket_name;
              viewLaunchObj.site_id = res.data.launch_site.site_id;
              viewLaunchObj.site_name = res.data.launch_site.site_name;
              viewLaunchObj.site_name_long = res.data.launch_site.site_name_long;
              viewLaunchObj.launch_success = res.data.launch_success;
              viewLaunchObj.landing_type = res.data.rocket.first_stage.cores[0].landing_type;
              viewLaunchObj.landing_vehicle = res.data.rocket.first_stage.cores[0].landing_vehicle;
              viewLaunchObj.flight = res.data.rocket.first_stage.cores[0].flight;
              viewLaunchObj.missions = res.data.rocket.first_stage.cores[0].core.missions;

              
             // Loop les missions liées à un first_stage
             let launchItem = res.data.rocket.first_stage.cores[0].core.missions;

            this.setState({ viewLaunchObj });
            this.setState({ launchItem });

        });
    }

    render(){

        let mission_status = "";
        let buttonVar = "";
        
        // Display the status of the mission

        if (this.state.viewLaunchObj.launch_success){
            mission_status = <span className="success"> Réussi </span>    
        }
        else{
            mission_status = <span className="failed"> Echoué </span>   
        }

        // display and hide missions related to a first stage
        const showLaunches = () =>{
            this.setState({ isVisible: true });  
        };

        const hideLaunches = () =>{
            this.setState({ isVisible: false });  
        };

        // switching hide and dislay buttons
        if (this.state.isVisible) buttonVar = <button className="bloc-style" onClick={hideLaunches}>Masquer les missions</button>   
        else buttonVar = <button className="bloc-style" onClick={showLaunches}>Afficher les missions associés au first_stage</button>


        return(
           <div className="view-launch-main-container">
             
             <div className="view-launch-container">
                 <div className="view-launch-content">
                     <img src="/assets/img/nasa.jpg" alt="rocket"/>
                     <div>
                        <div className="bloc-style">
                            <h2>Mission : {this.state.viewLaunchObj.mission_name}</h2>
                            <p>ID : {this.state.viewLaunchObj.mission_id}</p>
                            <p>Info : {this.state.viewLaunchObj.mission_info}</p>
                            <p>Lanceur : {this.state.viewLaunchObj.rocket_name}</p>
                            <p> Code du site : {this.state.viewLaunchObj.site_id}</p>
                            <p> Nom du site : {this.state.viewLaunchObj.site_name}</p>    
                            <p> Nom complet du site : {this.state.viewLaunchObj.site_name_long}</p> 
                            <p> Status de la mission : {mission_status}</p>
                        </div>
                        <div className="bloc-style">
                            <h2> Information sur le first_stage : </h2>  
                            <p> landing type : {this.state.viewLaunchObj.landing_type}</p>    
                            <p> landing vehicle : {this.state.viewLaunchObj.landing_vehicle}</p>    
                            <p> Flight : {this.state.viewLaunchObj.flight}</p>    
                        </div>

                        {buttonVar}

                        <div className={this.state.isVisible ? 'show bloc-style' : 'hide'}>
                            {this.state.launchItem.map((data, index) =>
                                <p key={index}> Flight : {data.flight} --- Mission : {data.name}</p>
                            )} 
                        </div>
                      
                     </div>
                 </div>
             </div>
   
            </div>
        )
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => (
    <ViewLaunch
        {...props}
        params={useParams()}
    />
);