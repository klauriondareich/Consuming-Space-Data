import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


export  class ViewLaunch extends  React.Component{

    state = {
        launchObj: {},
        launchItem: []
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

            //  missions.forEach(launchItem => {
               
            //     this.setState({ launchItem });
            //      // return <p> Flight : {item.flight}  Nom de la mission : {item.name}</p>    
            //  });
            console.log("launchItem", launchItem);
              this.setState({ launchObj });
              this.setState({ launchItem });

        });
    }

    render(){

        let mission_status = "";
        let isvisible = "hide";
        

        // Vérifie le status du lancement

        if (this.state.launchObj.launch_success){
            mission_status = <span className="success"> Réussi </span>    
        }
        else{
            mission_status = <span className="failed"> Echoué </span>   
        }

        function changeVisibility(){

            if (isvisible === "hide"){
                isvisible = "show";
            }
            else isvisible = "hide"
     
        
            console.log("clicked", isvisible)
            
        };

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
                        </div>
                        <div className="bloc-style">
                            <h2> Information sur le first_stage : </h2>  
                            <p> Status de la mission : {mission_status}</p>
                            <p> landing type : {this.state.launchObj.landing_type}</p>    
                            <p> landing vehicle : {this.state.launchObj.landing_vehicle}</p>    
                            <p> Flight : {this.state.launchObj.flight}</p>    
                        </div>
                        <button onClick={changeVisibility}>Afficher les missions associés</button>    
                        <div className="bloc-style">
                            <h2> Missions associés au first_stage : </h2>
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