import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CardFace from '../FlashCards/CardFace';
import CardsJson from '../json/cardsData.json';

configure({ adapter: new Adapter() });

describe('CardFace', () => {
  let props;
  const render = () => {
    return shallow(<CardFace {...props}/>)
  };

  beforeEach(() => {
    props = {
      classNames: 'card__face card__face--front',
      onFlip: jest.fn(),
      type: CardsJson[0].front.type,
      content: CardsJson[0].front.content
    };
  });

  describe('default', () => {
    it('should render a div without crashing', () => {
      const el = render().find('div');
      expect(el.length).toBeGreaterThan(0);
    });

    it('should render with correct props', () => {
      const renderedCardFace = render();

      expect(renderedCardFace.find('div').props().className)
      .toEqual('card__face card__face--front');

      expect(renderedCardFace.find('div').props().onClick)
        .toEqual(renderedCardFace.instance().handleFlip);
    });
  });

  describe('handleFlip method', () => {
    it('should call prop onFlip method if handleFlip is executed', () => {
      const spy = jest.spyOn(props, 'onFlip');
      const renderedCardFace = render();

      renderedCardFace.instance().handleFlip();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('getTemplate method', () => {
    it('should return h3 element if type is title', () => {
      const expectedResult = <h3 className="card__title">something</h3>;
      const renderedCardFace = render();

      const response = renderedCardFace.instance().getTemplate('title', 'something');

      expect(response).toEqual(expectedResult);
    });

    it('should return img element if type is image', () => {
      const expectedResult = <img className="card__image" style={{"backgroundImage": "url(something)"}} alt=""/>;
      const renderedCardFace = render();

      const response = renderedCardFace.instance().getTemplate('image', 'something');


      expect(response).toEqual(expectedResult);
    });

    it('should return p element if type is text', () => {
      const expectedResult = <p className="card__text">something</p>;
      const renderedCardFace = render();

      const response = renderedCardFace.instance().getTemplate('text', 'something');

      expect(response).toEqual(expectedResult);
    });

    it('should return p element with unknown type message if type is unknown', () => {
      const expectedResult = <p className="card__title">Unknown Type</p>;
      const renderedCardFace = render();

      const response = renderedCardFace.instance().getTemplate('alien', 'something');

      expect(response).toEqual(expectedResult);
    });
  });

  describe('showInstruction', () => {
    it('should display instruction if showInstruction exists', () => {
      props.showInstruction = true;
      const renderedCardFace = render();
      const response = renderedCardFace.find('.card__instruction');

      expect(response.length).toEqual(1);
    });

    it('should not instruction if showInstruction does not exist', () => {
      const renderedCardFace = render();
      const response = renderedCardFace.find('.card__instruction');

      expect(response.length).toEqual(0);
    });
  });
});
