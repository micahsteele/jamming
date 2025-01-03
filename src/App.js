import './App.css';
import React, {useState} from 'react';
import SearchBar from './Components/SearchBar';
import SearchResults from './Components/SearchResults';
import Playlist from './Components/Playlist';
import {Spotify} from './Spotify';


function App() {
  const [tracks, setTracks] = useState([
    {
        name: 'test name',
        artist: 'test artist',
        album: 'test album', 
        id: 'test id',
    },
    {
        name: 'test2 name',
        artist: 'test2 artist',
        album: 'test2 album', 
        id: 'test 2 id',
    }
  ]);
  const [playlistTracks, setPlaylistTracks] = useState([
    {
        name: 'test 3 name',
        artist: 'test 3 artist',
        album: 'test 3 album', 
        id: 'test 3 id',
    },
    {
        name: 'test 4 name',
        artist: 'test 4 artist',
        album: 'test 4 album', 
        id: 'test 4 id',
    }
  ]);

  const addTrackToPlaylist = (trackIdToAdd) => {
    if(playlistTracks.find((playlistTrack) => playlistTrack.id === trackIdToAdd.id)){
      console.log(trackIdToAdd)
    } else {
    setPlaylistTracks((playlistTracks) => [trackIdToAdd, ...playlistTracks])
    }
  };

  const removeTrackFromPlaylist = (trackIdToRemove) => {
    setPlaylistTracks((playlistTracks) => 
      playlistTracks.filter((playlistTrack) => playlistTrack.id !== trackIdToRemove))
  };

  const savePlaylist = () => {
    const trackUris = playlistTracks.map((playlistTracks) => playlistTracks.uri)
  };

  function search(term) {
    Spotify.search(term).then((result) => setTracks(result));
    console.log(term)
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Create a Spotify Playlist 
        </h1>
      </header>
      <main>
        <SearchBar onSearch={search}/>
        <div className='Main-body'>
          <SearchResults tracks={tracks} addTrackToPlaylist={addTrackToPlaylist} />
          <Playlist playlistTracks={playlistTracks} removeTrackFromPlaylist={removeTrackFromPlaylist} savePlaylist={savePlaylist}  />
        </div>
      </main>
    </div>
  );
};

export default App;
