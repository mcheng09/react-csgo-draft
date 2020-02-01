import React, { useState, useEffect } from 'react';
import axios from 'axios';

import classes from './Players.module.scss';

function Players() {
  const [players, setPlayers] = useState([]);
  const [pageOfPlayers, setPageOfPlayers] = useState([]);
  const [currPage, setCurrPage] = useState(0);
  const [maxPage, setMaxPage] = useState(0);

  const setPage = (currPage) => {
    let allPlayers = [...players];
    let spliceIndex = currPage * 10;
    let newPlayers = allPlayers.splice(spliceIndex, 10);
    setCurrPage(currPage);
    setPageOfPlayers(newPlayers);
  }

  useEffect(() => {
    axios.get('https://api.sportsdata.io/v3/csgo/scores/json/Players?key=47d152dbd924490bbf6f6d8fae797690')
      .then(function(res) {
        const allPlayers = [...res.data];
        const playerList = allPlayers.splice(0, 10);
        const updatedPlayers = playerList.map( player => {
          return {
            ...player
          }
        });
        const maxPages = Math.floor(res.data.length / 10);
        setPlayers(res.data);
        setPageOfPlayers(updatedPlayers);
        setMaxPage(maxPages);
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(function() {
        console.log('finally done');
      })
  }, []);

  let eachPlayer = pageOfPlayers.map((player, i) => {
    return (
      <p key={'player' + i}>Player Name: {player.CommonName} - {player.MatchName} - {player.BirthCountry}</p>
    )
  })

  return (
    <div className={classes.Players}>
      { eachPlayer }
      <button onClick={() => setPage(0)} disabled={currPage < 1}>First</button>
      <button onClick={() => setPage(currPage - 1)} disabled={currPage < 1}>Previous</button>
      <button onClick={() => setPage(currPage + 1)} disabled={currPage >= maxPage}>Next</button>
      <button onClick={() => setPage(maxPage)} disabled={currPage >= maxPage}>Last</button>
    </div>
  )
}

export default Players;
