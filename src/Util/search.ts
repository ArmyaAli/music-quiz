import { config } from 'dotenv'
import axios from 'axios'

const API_KEY = 'AIzaSyDnc81CSV7HmMqCqviHK1EsJ01k9BzhuXA'

const runSample = async (query: String) => {
    try {
        const URL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&type=videos&maxResults=10&q=${query}`
        const response = await axios.get(URL);
        console.log(response);
    } catch (error) {
        console.log(`Error occured: `, error);
    }
}

export default runSample;