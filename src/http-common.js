import axios from "axios";
export default axios.create({
  baseURL: "https://qsc.quasiris.de/api/v1/",
  headers: {
    "Content-type": "application/json"
  }
});