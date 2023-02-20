import React from 'react';
import PropTypes from 'prop-types';
import './IconButton.scss';

// компонент Кнопка-иконка
// IconButton на свое место рендерит обічную кнопку
const IconButton = ({ children, onClick, ...allyProps }) => (
  <button type="button" className="IconButton" onClick={onClick} {...allyProps}>
    {children}
  </button>
);

// анонимная ф-я которая при клике возвращает null
// так как onClick пропс не обязательній
// так же само и чилдрені, не обязательній пропс - по умолчанию null
IconButton.defaultProps = {
  onClick: () => null,
  children: null,
};

IconButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  'aria-label': PropTypes.string.isRequired,
};

//! accesibility props aria-label - так как кнопка-иконка не имеет текста, 
// или другая кнопка на которой ничто не написано,
// нужно текст указать через специальній пропс.
// Єтот пропс указивается через дефис, а не через камел кейс. 
// В сигнатуре ф-ии такие пропсі доступности "собираются" 
// через операцию rest из одного обьекта (props?)
// в обьект allyProps и потом в свою очередь
// allyProps "расспіляется" в компонент не присваивая его никуда.
// Єто чтобі читалка смогла прочитать текст из HTML разметки,
// для кнопок-иконок єто обязательно

export default IconButton;