import api from '@/services/api'

export default {
    getSummoner(summoner){
        return api().get(summoner + "?api_key=" + process.env.VUE_APP_APIKEY)
    }
}