import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SearchBar from './../../components/SearchBar/SearchBar';
import Pagination from './../../hoc/Pagination/Pagination';
import classes from './Teams.module.scss';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [teamsMap, setTeamsMap] = useState([]);
  const [currIndex, setCurrIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const searchTeam = event => {
    setSearchTerm(event.target.value);
  }

  const setIndex = (currIndex) => {
    setSearchResults(teamsMap[currIndex])
    setCurrIndex(currIndex);
  }

  const mapTeams = (teams) => {
    const map = {};
    teams.forEach((team, i) => {
      let key = Math.floor(i / 10);
      if (!map.hasOwnProperty(key)) map[key] = [team];
      else map[key].push(team)
    })
    return map;
  }

  useEffect(() => {
    axios.get('https://api.sportsdata.io/v3/csgo/scores/json/Teams?key=47d152dbd924490bbf6f6d8fae797690')
      .then(function(res) {
        const allTeams = [...res.data];
        const allTeamsMap = mapTeams(allTeams);
        const maxIndex = Math.floor(Object.keys(allTeamsMap).length) - 1;

        setTeams(allTeams);
        setTeamsMap(allTeamsMap);
        setMaxIndex(maxIndex);
        setSearchResults(allTeamsMap[0]);
      })
  }, []);

  useEffect(() => {
    const filterTeamsHelper = (teams) => {
      return teams.filter(team => {
        if (team.Name) {
          return team.Name.toLowerCase().includes(searchTerm)
        }
        return null;
      })
    }

    const allTeams = [...teams];
    const results = filterTeamsHelper(allTeams);
    const resultsMap = mapTeams(results);
    const maxIndexs = Math.floor(Object.keys(resultsMap).length) - 1;

    setTeamsMap(resultsMap);
    setMaxIndex(maxIndexs);
    setCurrIndex(0);
    setSearchResults(results.splice(0, 10))

  }, [searchTerm, teams])

  const eachTeam = searchResults.map((team, i) => {
    return (
      <p key={'team' + i}>Team Name: {team.Name} - {team.AreaName} - {team.Founded}</p>
    )
  })


  return (
    <div className={classes.Teams}>
      <SearchBar
        searchTerm={searchTeam} />
      { eachTeam }
      <Pagination
        click={setIndex}
        currIndex={currIndex}
        maxIndex={maxIndex} />
    </div>
  )
}

export default Teams;
