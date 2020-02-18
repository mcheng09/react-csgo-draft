import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SearchBar from './../../components/SearchBar/SearchBar'
import Pagination from './../../hoc/Pagination/Pagination'
import classes from './Players.module.scss';

function Players() {
  const [players, setPlayers] = useState([]);
  const [playersMap, setPlayersMap] = useState([]);
  const [currIndex, setCurrIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([])

  const searchPlayer = event => {
    setSearchTerm(event.target.value);
  }

  const setIndex = (currIndex) => {
    setSearchResults(playersMap[currIndex])
    setCurrIndex(currIndex);
  }

  const mapPlayers = (players) => {
    const map = {};
    players.forEach((player, i) => {
      let key = Math.floor(i / 10);
      if (!map.hasOwnProperty(key)) map[key] = [player];
      else map[key].push(player)
    })
    return map;
  }

  useEffect(() => {
    axios.get('https://api.sportsdata.io/v3/csgo/scores/json/Players?key=47d152dbd924490bbf6f6d8fae797690')
      .then(function(res) {
        const allPlayers = [...res.data];
        const allPlayersMap = mapPlayers(allPlayers);
        const maxIndexs = Math.floor(Object.keys(allPlayersMap).length) - 1;

        setPlayers(allPlayers);
        setPlayersMap(allPlayersMap);
        setMaxIndex(maxIndexs);
        setSearchResults(allPlayersMap[0]);
      })
  }, []);

  useEffect(() => {
    const filterPlayersHelper = (players) => {
      return players.filter(player => {
        if (player.MatchName) {
          return player.MatchName.toLowerCase().includes(searchTerm)
        }
        return null;
      })
    }

    const allPlayers = [...players];
    const results = filterPlayersHelper(allPlayers);
    const resultsMap = mapPlayers(results);
    const maxIndexs = Math.floor(Object.keys(resultsMap).length) - 1;

    setPlayersMap(resultsMap);
    setMaxIndex(maxIndexs);
    setCurrIndex(0);
    setSearchResults(results.splice(0, 10))

  }, [searchTerm, players])

  const eachPlayer = searchResults.map((player, i) => {
    return (
      <p key={'player' + i}>Player Name: {player.CommonName} - {player.MatchName} - {player.BirthCountry}</p>
    )
  });

  return (
    <div className={classes.Players}>
      <SearchBar
        searchTerm={searchPlayer} />
      { eachPlayer }
      <Pagination
        click={setIndex}
        currIndex={currIndex}
        maxIndex={maxIndex} />
    </div>
  )
}

export default Players;
