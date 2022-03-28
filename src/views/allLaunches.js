import React from "react";
import Loader from "react-js-loader";
import {getAllLaunches} from "../services/apiService"


export default class AllLaunches extends  React.Component {

    state = {
        all_launches: [],
        isLoading: true,
        searchItem: ""
    }

    componentDidMount() {

            // Get all launches
            getAllLaunches().then(res => {
                const all_launches = res.data;
               // console.log(res.data);
                this.setState({ all_launches });
                this.setState({isLoading: false});
          })
      }
    render(){
        return(

        <div className="main-container">
    
            <h2>Tous les lancements</h2>

            <input type="text" className="input-search" name="missionSearched" placeholder="Rechercher une mission" onChange={(event) =>{
                this.setState({searchItem: event.target.value});
            }}/>    

            <div className={this.state.isLoading ? 'show marg-left-500' : 'hide'}>
                <Loader type="spinner-default" bgColor={"#0064c2"} color={'#fff'} size={40} />           
            </div>

            {this.state.all_launches.filter((data) => {
                if (this.state.searchItem === ""){
                    return data
                }
                else if (data.mission_name.toLowerCase().includes(this.state.searchItem.toLowerCase())){
                    return data
                }
            })
            .map((item, index) => 
                <div className="content-element width-300" key={index}>
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
  
