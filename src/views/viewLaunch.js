import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


export  class ViewLaunch extends  React.Component{

    state = {
        launchObj: {},
        launchItem: [],
        isVisible: false
    }
   
    
    componentDidMount() {

        const id = this.props.params.id;
        let fullPath = "https://api.spacex.land/rest/launch/" + id;

        axios.get(fullPath)
        .then(res => {
            
              const launchObj = {  
                  "mission_name": "",
                  "mission_info": "",
                  "mission_id": "",
                  "rocket_name": "",
                  "site_id": "",
                  "site_name": "",
                  "site_name_long": "",
                  "launch_success": false,
                  "landing_type": "",
                  "landing_vehicle": "",
                  "flight": 0,
                  "missions": [],
              }
              launchObj.mission_name = res.data.mission_name;
              launchObj.mission_info = res.data.details;
              launchObj.mission_id = res.data.mission_id[0];
              launchObj.rocket_name = res.data.rocket.rocket_name;
              launchObj.site_id = res.data.launch_site.site_id;
              launchObj.site_name = res.data.launch_site.site_name;
              launchObj.site_name_long = res.data.launch_site.site_name_long;
              launchObj.launch_success = res.data.launch_success;
              launchObj.landing_type = res.data.rocket.first_stage.cores[0].landing_type;
              launchObj.landing_vehicle = res.data.rocket.first_stage.cores[0].landing_vehicle;
              launchObj.flight = res.data.rocket.first_stage.cores[0].flight;
              launchObj.missions = res.data.rocket.first_stage.cores[0].core.missions;

              
             // Loop les missions liées à un first_stage
             let launchItem = res.data.rocket.first_stage.cores[0].core.missions;

            this.setState({ launchObj });
            this.setState({ launchItem });

        });
    }

    render(){

        let mission_status = "";
        let buttonVar = "";
        
        // Affiche le status de la mission

        if (this.state.launchObj.launch_success){
            mission_status = <span className="success"> Réussi </span>    
        }
        else{
            mission_status = <span className="failed"> Echoué </span>   
        }

        // Affiche ou masque les missions associées au first_stage
        const showLaunches = () =>{
            this.setState({ isVisible: true });  
        };

        const hideLaunches = () =>{
            this.setState({ isVisible: false });  
        };

        // switching entre le button afficher et masquer
        if (this.state.isVisible) buttonVar = <button className="bloc-style" onClick={hideLaunches}>Masquer les missions</button>   
        else buttonVar = <button className="bloc-style" onClick={showLaunches}>Afficher les missions associés au first_stage</button>


        return(
           <div className="view-launch-container">
            
                 <div className="view-launch-content">
                     <img src="/assets/img/nasa.jpg" alt="rocket"/>
                     <div>
                        <div className="bloc-style">
                            <h2>Mission : {this.state.launchObj.mission_name}</h2>
                            <p>ID : {this.state.launchObj.mission_id}</p>
                            <p>Info : {this.state.launchObj.mission_info}</p>
                            <p>Lanceur : {this.state.launchObj.rocket_name}</p>
                            <p> Code du site : {this.state.launchObj.site_id}</p>
                            <p> Nom du site : {this.state.launchObj.site_name}</p>    
                            <p> Nom complet du site : {this.state.launchObj.site_name_long}</p> 
                            <p> Status de la mission : {mission_status}</p>
                        </div>
                        <div className="bloc-style">
                            <h2> Information sur le first_stage : </h2>  
                            <p> landing type : {this.state.launchObj.landing_type}</p>    
                            <p> landing vehicle : {this.state.launchObj.landing_vehicle}</p>    
                            <p> Flight : {this.state.launchObj.flight}</p>    
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