import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Card from '../FlashCards/Card';
import CardFace from '../FlashCards/CardFace';
import CardsJson from '../json/cardsData.json';

configure({ adapter: new Adapter() });

describe('FlashCards Test', () => {
  let props;
  const cardData = CardsJson[0];
  cardData.showInstruction = true;

  const render = () => {
    return shallow(<Card {...props}/>)
  };

  beforeEach(() => {
    props = {
      card: cardData
    }
  });

  describe('default', () => {
    it('should render a div without crashing', () => {
      const el = render().find('.card');
      expect(el.length).toBeGreaterThan(0);
    });

    it('should have isFlipped state as false', () => {
      const renderedCard = render();
      expect(renderedCard.state().isFlipped).toBeFalsy();
    });
  });

  describe('handleFlip method', () => {
    it('should toggle isFlipped state value from false to true', () => {
      const renderedCard = render();

      renderedCard.instance().handleFlip();

      expect(renderedCard.state().isFlipped).toBeTruthy();
    });

    it('should toggle isFlipped state value from true to false', () => {
      const renderedCard = render();
      renderedCard.setState({
        isFlipped: true
      });

      renderedCard.instance().handleFlip();

      expect(renderedCard.state().isFlipped).toBeFalsy();
    });
  });

  describe('addClassIfFlipped method', () => {
    it('should return empty string if isFlipped is false', () => {
      const renderedCard = render();

      const response = renderedCard.instance().addClassIfFlipped();

      expect(response).toEqual('');
      expect(renderedCard.find('.card__wrap').props().className)
        .toEqual('card__wrap ');
    });

    it('should return flipped class if isFlipped is true', () => {
      const renderedCard = render();
      renderedCard.setState({
        isFlipped: true
      });

      const response = renderedCard.instance().addClassIfFlipped();

      expect(response).toEqual('card__wrap--flipped');
      expect(renderedCard.find('.card__wrap').props().className)
        .toEqual('card__wrap card__wrap--flipped');
    });
  });

  describe('CardFace rendering', () => {
    it('should render 2 CardFace components', () => {
      const sides = render().find(CardFace);
      expect(sides.length).toEqual(2);
    });

    it('should set front CardFace prop with correct data', () => {
      const renderedCard = render();
      const frontCardFace = renderedCard.find(CardFace).at(0);

      expect(frontCardFace.props().classNames).toEqual('card__face card__face--front');
      expect(frontCardFace.props().onFlip).toEqual(renderedCard.instance().handleFlip);
      expect(frontCardFace.props().type).toEqual(cardData.front.type);
      expect(frontCardFace.props().content).toEqual(cardData.front.content);
      expect(frontCardFace.props().showInstruction).toEqual(true);
    });

    it('should set back CardFace prop with correct data', () => {
      const renderedCard = render();
      const frontCardFace = renderedCard.find(CardFace).at(1);

      expect(frontCardFace.props().classNames).toEqual('card__face card__face--back');
      expect(frontCardFace.props().onFlip).toEqual(renderedCard.instance().handleFlip);
      expect(frontCardFace.props().type).toEqual(cardData.back.type);
      expect(frontCardFace.props().content).toEqual(cardData.back.content);
      expect(frontCardFace.props().showInstruction).toEqual(undefined);
    });
  });
});
