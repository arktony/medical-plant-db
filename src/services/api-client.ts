import axios from "axios";

export default axios.create({
  params: {
    baseURL: "http://localhost:8080",
  },
});
