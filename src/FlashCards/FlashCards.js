import React, { Component } from 'react';
import Card from './Card';
import './FlashCards.css';

class FlashCards extends Component {
  render() {
    const {
      cards
    } = this.props;

    const cardsTemplate = cards.map((card, index) => {
      // only show card instruction on the front face of
      // the first card in the array
      if (index === 0) {
        card.showInstruction = true;
      }

      return <Card
        key={card.id}
        card={card}/>
    });

    return (
      <div className="flashcards">
        {cardsTemplate}
      </div>
    );
  }
}

export default FlashCards;
