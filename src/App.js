import React, { Component } from 'react';
import FlashCards from './FlashCards/FlashCards';
import CardsJson from './json/cardsData.json'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="App-title">Flashcards</h1>
        <FlashCards cards={CardsJson}/>
      </div>
    );
  }
}

export default App;
