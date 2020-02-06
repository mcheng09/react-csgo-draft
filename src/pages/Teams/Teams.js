import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Pagination from './../../hoc/Pagination/Pagination'
import classes from './Teams.module.scss';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [indexOfTeams, setIndexOfTeams] = useState([]);
  const [currIndex, setCurrIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  const setPage = (currIndex) => {
    let allTeams = {...teams};
    setCurrIndex(currIndex);
    setIndexOfTeams(allTeams[currIndex]);
  }

  useEffect(() => {
    axios.get('https://api.sportsdata.io/v3/csgo/scores/json/Teams?key=47d152dbd924490bbf6f6d8fae797690')
      .then(function(res) {
        const allTeams = [...res.data];
        const allTeamsMap = {};

        allTeams.forEach((team, i) => {
          let key = Math.floor(i / 10);
          if (!allTeamsMap.hasOwnProperty(key)) allTeamsMap[key] = [team];
          else allTeamsMap[key].push(team)
        })

        const maxIndex = Math.floor(Object.keys(allTeamsMap).length) - 1;

        setTeams(allTeamsMap);
        setIndexOfTeams(allTeamsMap[0]);
        setMaxIndex(maxIndex);
      })
      .catch(function(error) {
        console.log(error);
      })
  }, []);

  const eachTeam = indexOfTeams.map((team, i) => {
    return (
      <p key={'team' + i}>Team Name: {team.Name} - {team.AreaName} - {team.Founded}</p>
    )
  })


  return (
    <div className={classes.Teams}>
      { eachTeam }
      <Pagination
        click={setPage}
        currIndex={currIndex}
        maxIndex={maxIndex} />
    </div>
  )
}

export default Teams;
