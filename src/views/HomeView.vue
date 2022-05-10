<template>
  <div class="home">
    <div class="navHeader">
    <router-link to="/">
      <img src="https://universe.leagueoflegends.com/esimages/content_type_icon_champion__3nwJQ.png" />
      Champions EUNE
    </router-link>
    </div>
    <input type="text" v-model="summonerName" placeholder="Find a Champion..." class="champSearch">
    <button class="RequestBtn" @click="fetchSummoner()">Request</button>

    <div class="dataCont">
      <div v-if="summonerProfile !== ''">
      <img class="summonerProfile" :src="`http://ddragon.leagueoflegends.com/cdn/12.8.1/img/profileicon/${summonerProfile}.png`">
      </div>
      <p class="dataTxt">Level {{ summonerLevel }}</p>
      <!-- <p class="dataTxt">PUUID {{ puuid }}</p> -->
      <button class="RequestBtn" @click="getHistory()">MATCH HISTORY</button>
      <div v-for="(match, index) in matchData" :key="index">
        <h1>Game {{ index + 1 }}</h1>
        <p>{{ match.data.info.gameMode }}</p>
      </div>
    </div>

  </div>
</template>

<script>
import authService from '@/services/auth-service'

export default {
  name: 'HomeView',
  data() {
    return {
      puuid: '',
      summonerName: '',
      summonerProfile: '',
      summonerLevel: '',
      matchIDs: [],
      matchData: []
    }
  },
  methods: {
    async fetchSummoner() {
      const response = await authService.getSummoner(this.summonerName)
      this.puuid = response.data.puuid
      this.summonerProfile = response.data.profileIconId
      this.summonerLevel = response.data.summonerLevel
      console.log(response.data)
      const responseMatches = await authService.getLast5MatchesKeys(this.puuid)
      for (let i = 0; i < responseMatches.data.length; i++){
        console.log(responseMatches.data[i])
        let matchID = responseMatches.data[i]
        await this.matchIDs.push(matchID)
      }
    },
    async getHistory(){
      for(let i = 0; i < this.matchIDs.length; i++){
        const responseMatch = await authService.getMatchData(this.matchIDs[i])
        await this.matchData.push(responseMatch)
        console.log(responseMatch)
      }
      
    }
  },
  mounted() {
    console.log(process.env.VUE_APP_BASE_URL)
  }
}
</script>


<style lang="scss" scoped>
$baseColor: #826332;


.navHeader {
  font-size: 24px;
  letter-spacing: 7px;
  text-transform: uppercase;
  a { 
    color: $baseColor;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: .5em 0;
    }
    img {
      width: 35px;
      margin: .5em 0;
    }
    a:hover{
      color: lighten($baseColor, 20% )
    }
}

.champSearchContainer {
  display: flex;
  justify-content: center;
  margin: 0 auto;
}

.dataCont{
  margin: auto;
  width: 50%;
  height: 500px;
  border: 1px solid $baseColor;
}

.summonerProfile{
  width: 150px;
}

.dataTxt{
  color: $baseColor;
}

.champSearch {
  padding: .75em;
  margin: 1em 0;
  background-color: rgba(0,0,0,0);
  font-size: 18px;
  border: 1px solid $baseColor;
  color: $baseColor;
  outline: none;
  width: 250px;
      @media only screen and (max-width: 600px) {
      width: 80vw;
    }
}

.RequestBtn{
  padding: .75em;
  font-size: 18px;
  background: transparent;
  color: $baseColor;
  border: 1px solid $baseColor;
  cursor: pointer;
}

</style>