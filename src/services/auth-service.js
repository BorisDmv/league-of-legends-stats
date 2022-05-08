import { http } from '@/services/api'

export default {
    getSummoner(summoner){
        return http.baseURL.get(summoner + "?api_key=" + process.env.VUE_APP_APIKEY)
    },

    getLast5MatchesKeys(puuid){
        return http.baseURL2.get("lol/match/v5/matches/by-puuid/" + puuid + "/ids" + "?count=5" + "&api_key=" + process.env.VUE_APP_APIKEY)
    },

    getMatchData(matchKey){
        return http.baseURL2.get("lol/match/v5/matches/" + matchKey + "?api_key=" + process.env.VUE_APP_APIKEY)
    }
}