import React, { useState, useEffect } from 'react';
import axios from 'axios';

import classes from './Players.module.scss';

function Players() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios.get('https://api.sportsdata.io/v3/csgo/scores/json/Players?key=47d152dbd924490bbf6f6d8fae797690')
      .then(function(res) {
        const playerList = res.data.splice(0, 10);
        const updatedPlayers = playerList.map( player => {
          return {
            ...player
          }
        });
        setPlayers(updatedPlayers);
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(function() {
        console.log('finally done');
      })
  }, [])

  let eachPlayer = players.map((player, i) => {
    console.log(player);
    return (
      <p key={'player' + i}>Player Name: {player.FirstName} {player.LastName} - {player.BirthCountry}</p>
    )
  })

  return (
    <div className={classes.Players}>
      { eachPlayer }
    </div>
  )
}

export default Players;
