import axios from "axios";

let base_path = "https://api.spacex.land/";

let fullPath_1 = base_path + "rest/launch-next";
let fullPath_2 = base_path + "rest/launches-past?limit=4";
let fullPath_3 = base_path + "rest/launches";

        
// Getting next launch data
export function getNextLaunch(){
    return axios.get(fullPath_1) 
}

// Getting past launches data
export function getPastLaunches(){
    return axios.get(fullPath_2)
}

// Getting all launches data
export function getAllLaunches(){
    return axios.get(fullPath_3)
}


 



