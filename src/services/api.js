import axios from 'axios'


export const http = {
    baseURL: axios.create({ baseURL: 'https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' }),
    baseURL2: axios.create({ baseURL: 'https://europe.api.riotgames.com/' })
}