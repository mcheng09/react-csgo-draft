import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Pagination from './../../hoc/Pagination/Pagination'
import classes from './Teams.module.scss';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [pageOfTeams, setPageOfTeams] = useState([]);
  const [currPage, setCurrPage] = useState(0);
  const [maxPage, setMaxPage] = useState(0);

  const setPage = (currPage) => {
    let allTeams = {...teams};
    setCurrPage(currPage);
    setPageOfTeams(allTeams[currPage]);
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
        const maxPages = Math.floor(allTeams.length / 10);

        setTeams(allTeamsMap);
        setPageOfTeams(allTeamsMap[0]);
        setMaxPage(maxPages);
      })
      .catch(function(error) {
        console.log(error);
      })
  }, []);

  const eachTeam = pageOfTeams.map((team, i) => {
    return (
      <p key={'team' + i}>Team Name: {team.Name} - {team.AreaName} - {team.Founded}</p>
    )
  })


  return (
    <div className={classes.Teams}>
      { eachTeam }
      <Pagination
        click={setPage}
        currIndex={currPage}
        maxIndex={maxPage} />
    </div>
  )
}

export default Teams;
