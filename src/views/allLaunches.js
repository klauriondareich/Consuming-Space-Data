import React from "react";
import Loader from "react-js-loader";
import {getAllLaunches} from "../services/apiService"


export default class AllLaunches extends  React.Component {

    state = {
        all_launches: [],
        isLoading: true,
        searchItem: "",
        filteredItem: "",
        type: "search",
        count: 10,
        pending: " "
    }

    loadLaunches(order){
        console.log(this.state.isLoading)
        getAllLaunches(order).then(res => {
             this.setState({all_launches: res.data});
             this.setState({isLoading: false});
             this.setState({pending: " "});
       })
    }
    
    componentDidMount() {

        // Get all launches 
        this.loadLaunches("desc");
      }

     
    

    render(){
        return(

        <div className="main-container">
    
            <h2>Tous les lancements</h2>

            <input type="text" className="input-search" name="missionSearched" placeholder="Rechercher une mission" onChange={(event) =>{
                this.setState({type: "search"});
                this.setState({searchItem: event.target.value});
            }}/> 

            <label htmlFor="years">Filtrer par année : </label>
            <select name="years" id="years" onChange={(event) =>{
                this.setState({type: "filter"});
                this.setState({filteredItem: event.target.value});
            }}>
                <option value="">Default</option>
                <option value="2020">2020</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2014">2014</option>
                <option value="2014">2015</option>
                <option value="2012">2012</option>
                <option value="2013">2013</option>
                <option value="2010">2010</option>
            </select>   

            <label htmlFor="date" className="mg-left">Trier par : </label>
            <select name="date" id="date" onChange={(event) =>{
                this.setState({pending: "...Request pending"});
                this.loadLaunches(event.target.value);
            }}>
                <option value="desc">Pus récents - Moins récents</option>
                <option value="asc">Moins récents - Plus récents</option>
            </select>   


            <br/><br/>
            <p className="green">{this.state.pending}</p>
            

            {this.state.all_launches.filter((data) => {
                
                if (this.state.type === "search"){

                    if (this.state.searchItem === ""){
                        return data
                    }
                    else if (data.mission_name.toLowerCase().includes(this.state.searchItem.toLowerCase())){
                        return data
                    }
                }
               
                else if (this.state.type === "filter"){

                    if (this.state.filteredItem === ""){
                        return data
                    }
                    else if (data.launch_year.toLowerCase().includes(this.state.filteredItem.toLowerCase())){
                        return data
                    }
                }
            })
            .slice(0, this.state.count)
            .map((item, index) => 
                <div className="content-element width-300" key={index}>
                    <img src="assets/img/rocket.png" alt="rocket"/>
                    <p>Mission : {item.mission_name}</p>
                    <p>Date : {new Date(item.launch_date_utc).toLocaleDateString("fr-FR")}</p>
                    <p>Année de lancement : {item.launch_year}</p>
                    <p><a href={'/launches/' + item.id}>Voir plus de détails </a></p>
                </div>
            )}
            <br/>

            <div className={this.state.isLoading ? 'show marg-left-500' : 'hide'}>
                <Loader type="spinner-default" bgColor={"#0064c2"} color={'#fff'} size={40} />           
            </div>

            <button className="mg-left" onClick={(event) =>{
                let count = this.state.count;
                count = count + 10;
                this.setState({count});
            }}>Afficher Plus</button>

            <button className={this.state.count !== 10 ? 'show-btn' : 'hide'} onClick={(event) =>{
                let count = this.state.count;
                count = count - 10;
                this.setState({count});
            }}>Afficher Moins</button>            
        </div>
        )
    }
  
  };
  
