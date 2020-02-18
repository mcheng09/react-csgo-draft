import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SearchBar from './../../components/SearchBar/SearchBar'
import Pagination from './../../hoc/Pagination/Pagination'
import classes from './Players.module.scss';

function Players() {
  const [players, setPlayers] = useState([]);
  const [indexOfPlayers, setindexOfPlayers] = useState([]);
  const [currIndex, setCurrIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([])

  const searchPlayer = event => {
    setSearchTerm(event.target.value);
  }

  const setIndex = (currIndex) => {
    let allPlayers = {...players};
    setCurrIndex(currIndex);
    setindexOfPlayers(allPlayers[currIndex]);
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

        const maxIndexs = Math.floor(Object.keys(allPlayersMap).length) - 1;

        setPlayers(allPlayers);
        setindexOfPlayers(allPlayersMap[0]);
        setMaxIndex(maxIndexs);
      })
      .catch(function(error) {
        console.log(error);
      })
  }, []);

  useEffect(() => {
    const allPlayers = [...players];
    const results = players.filter(player => {
      if (player.MatchName) {
        return player.MatchName.toLowerCase().includes(searchTerm)
      }
    });
    setSearchResults(results)
  }, [searchTerm])

  const eachPlayer = indexOfPlayers.map((player, i) => {
    return (
      <p key={'player' + i}>Player Name: {player.CommonName} - {player.MatchName} - {player.BirthCountry}</p>
    )
  })

  const searchedPlayer = searchResults.map(item => {
    return (
      <li>Gamer Name: {item.MatchName}</li>
    )
  })


  return (
    <div className={classes.Players}>
      <input
        type='text'
        placeholder='Search'
        onChange={searchPlayer}
        value={searchTerm} />
      <SearchBar
        searchTerm={searchPlayer} />
      { eachPlayer }

      {searchedPlayer}
    </div>
  )
}

export default Players;

// <Pagination
//   click={setIndex}
//   currIndex={currIndex}
//   maxIndex={maxIndex} />
