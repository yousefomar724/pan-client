import axios from "axios";

export const baseURL = "https://pan-api-five.vercel.app";

export default axios.create({
  baseURL,
});
