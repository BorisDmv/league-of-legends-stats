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
      <p class="matchHistoryText">MATCH HISTORY</p>
      
      <div v-for="(match, index) in matchData" :key="index">
        <h1 class="dataTxt">Game {{ index + 1 }}</h1>
        <p class="dataTxt">{{ match.data.info.gameMode }}</p>


        <table class="tableStyle">
          <tr>
            <th style="color: #d0983f">Players</th>
            <th style="color: #d0983f">Kills</th>
            <th style="color: #d0983f">Deaths</th>
            <th style="color: #d0983f">Assists</th>
          </tr>
          <tr>
            <td class="dataTxt">Player1</td>
            <td class="dataTxt">{{ match.data.info.participants[0].kills }}</td>
            <td class="dataTxt">{{ match.data.info.participants[0].deaths }}</td>
            <td class="dataTxt">{{ match.data.info.participants[0].assists }}</td>
          </tr>
          <tr>
            <td class="dataTxt">Player2</td>
            <td class="dataTxt">{{ match.data.info.participants[1].kills }}</td>
            <td class="dataTxt">{{ match.data.info.participants[1].deaths }}</td>
            <td class="dataTxt">{{ match.data.info.participants[1].assists }}</td>   
          </tr>
          <tr>
            <td class="dataTxt">Player3</td>
            <td class="dataTxt">{{ match.data.info.participants[2].kills }}</td>
            <td class="dataTxt">{{ match.data.info.participants[2].deaths }}</td>
            <td class="dataTxt">{{ match.data.info.participants[2].assists }}</td>
          </tr>
          <tr>
            <td class="dataTxt">Player4</td>
            <td class="dataTxt">{{ match.data.info.participants[3].kills }}</td>
            <td class="dataTxt">{{ match.data.info.participants[3].deaths }}</td>
            <td class="dataTxt">{{ match.data.info.participants[3].assists }}</td>   
          </tr>
          <tr>
            <td class="dataTxt">Player5</td>
            <td class="dataTxt">{{ match.data.info.participants[4].kills }}</td>
            <td class="dataTxt">{{ match.data.info.participants[4].deaths }}</td>
            <td class="dataTxt">{{ match.data.info.participants[4].assists }}</td>
          </tr>
        </table> 


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
  width: 600px;
  min-height: 300px;
  height: auto;
  border: 1px solid $baseColor;
    @media only screen and (max-width: 800px) {
      width: 80vw;
    }
}

.summonerProfile{
  width: 150px;
}

.matchHistoryText{
  font-size: 1.4rem;
  border-bottom: 1px solid $baseColor;
  color: $baseColor;
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

.tableStyle{
  border: 1px solid $baseColor;
  margin: auto;
}

</style>