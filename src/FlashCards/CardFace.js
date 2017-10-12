import React, { Component } from 'react';

class CardFace extends Component {
  constructor(props) {
    super(props);
    this.handleFlip = this.handleFlip.bind(this);
  }

  handleFlip() {
    this.props.onFlip();
  }

  getTemplate(type, content) {
    switch(type) {
      case 'title':
        return <h3 className="card__title">{content}</h3>

      case 'image':
        const style = {
          backgroundImage: 'url(' + content + ')'
        };
        return <img className="card__image" style={style} alt=""></img>

      case 'text':
        return <p className="card__text">{content}</p>

      default:
        return <p className="card__title">Unknown Type</p>;
    }
  }

  render() {
    const {
      type,
      content,
      classNames,
      showInstruction
    } = this.props;

    return (
      <div
        className={classNames}
        onClick={this.handleFlip}>
        {this.getTemplate(type, content)}

        {showInstruction ? (
          <span className="card__instruction">Click to flip</span>
        ) : null}
      </div>
    );
  }
}

export default CardFace;
