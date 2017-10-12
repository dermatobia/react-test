import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from '../App';
import FlashCards from '../FlashCards/FlashCards';
import CardsJson from '../json/cardsData.json';

configure({ adapter: new Adapter() });

describe('App Test', () => {
  const render = () => {
    return shallow(<App />);
  }

  it('should render without crashing with a div', () => {
    const div = render().find('div');
    expect(div.length).toBeGreaterThan(0);
  });

  it('should render FlashCards', () => {
    expect(render().find(FlashCards).length).toBe(1);
  });

  it('should set the rendered FlashCards\'s cards prop with CardsJson', () => {
    const flashCards = render().find(FlashCards);
    expect(flashCards.props().cards).toBe(CardsJson);
  });
});
