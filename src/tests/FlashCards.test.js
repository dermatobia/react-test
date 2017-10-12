import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FlashCards from '../FlashCards/FlashCards';
import Card from '../FlashCards/Card';
import CardsJson from '../json/cardsData.json'

configure({ adapter: new Adapter() });

describe('FlashCards Test', () => {
  let props;

  const render = () => {
    return shallow(<FlashCards {...props}/>)
  };

  beforeEach(() => {
    props = {
      cards: CardsJson
    };
  });

  it('should render a div without crashing', () => {
    const div = render().find('.flashcards');
    expect(div.length).toBeGreaterThan(0);
  });

  it('should render 3 Card components', () => {
    const cards = render().find(Card);
    expect(cards.length).toEqual(3);
  });

  it('should set each Card prop with correct data', () => {
    const cards = render().find(Card);
    CardsJson[0].showInstruction = true;

    for (let i = 0; i < 3; i++) {
      const cardComponent = cards.at(i);

      expect(cardComponent.props().card).toEqual(CardsJson[i]);
    }
  });
});
