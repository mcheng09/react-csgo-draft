import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Pagination from './../../hoc/Pagination/Pagination'
import classes from './Players.module.scss';

function Players() {
  const [players, setPlayers] = useState([]);
  const [pageOfPlayers, setPageOfPlayers] = useState([]);
  const [currPage, setCurrPage] = useState(0);
  const [maxPage, setMaxPage] = useState(0);

  const setPage = (currPage) => {
    let allPlayers = {...players};
    setCurrPage(currPage);
    setPageOfPlayers(allPlayers[currPage]);
  }

  useEffect(() => {
    axios.get('https://api.sportsdata.io/v3/csgo/scores/json/Players?key=47d152dbd924490bbf6f6d8fae797690')
      .then(function(res) {
        const allPlayers = [...res.data];
        const allPlayersMap = {};

        allPlayers.forEach((player, i) => {
          let key = Math.floor(i / 10);
          if (!allPlayersMap.hasOwnProperty(key)) allPlayersMap[key] = [player];
          else allPlayersMap[key].push(player)
        })
        
        const maxPages = Math.floor(Object.keys(allPlayersMap).length) - 1;

        setPlayers(allPlayersMap);
        setPageOfPlayers(allPlayersMap[0]);
        setMaxPage(maxPages);
      })
      .catch(function(error) {
        console.log(error);
      })
  }, []);

  const eachPlayer = pageOfPlayers.map((player, i) => {
    return (
      <p key={'player' + i}>Player Name: {player.CommonName} - {player.MatchName} - {player.BirthCountry}</p>
    )
  })


  return (
    <div className={classes.Players}>
      { eachPlayer }
      <Pagination
        click={setPage}
        currIndex={currPage}
        maxIndex={maxPage} />
    </div>
  )
}

export default Players;
