import React, { Component } from 'react';
import './Card.css';
import CardFace from './CardFace.js';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false
    };

    this.handleFlip = this.handleFlip.bind(this);
  }

  handleFlip() {
    this.setState(prevState => ({
      isFlipped: !prevState.isFlipped
    }));
  }

  addClassIfFlipped() {
    return this.state.isFlipped ? 'card__wrap--flipped' : '';
  }

  render() {
    const {
      front,
      back,
      showInstruction
    } = this.props.card;

    return (
      <div className="card">
        <div className={'card__wrap ' + this.addClassIfFlipped()}>
          <CardFace
            classNames="card__face card__face--front"
            onFlip={this.handleFlip}
            type={front.type}
            content={front.content}
            showInstruction={showInstruction}
          />
          <CardFace
            classNames="card__face card__face--back"
            onFlip={this.handleFlip}
            type={back.type}
            content={back.content}
          />
        </div>
      </div>
    );
  }
}

export default Card;
