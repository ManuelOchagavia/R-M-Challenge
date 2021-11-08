import axios from "../api";
import { charactersRoute, episodesRoute, locationsRoute } from "../api/routes";

const charCounter = async () => {
  const locations = () => axios.get(locationsRoute());
  const episodes = () => axios.get(episodesRoute());
  const characters = () => axios.get(charactersRoute());
  const result = await Promise.all([locations(), episodes(), characters()]);
  console.log(result);
};

export default charCounter;
