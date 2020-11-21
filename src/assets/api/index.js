import axios from "axios"

export default {
  getPoint() {
    return axios.get("https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json")
  }  
}