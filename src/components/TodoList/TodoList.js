import React from 'react';
import classNames from 'classnames';
import Todo from '../Todo';
import './TodoList.scss';

const TodoList = ({ todos, onDeleteTodo, onToggleCompleted }) => (
  <ul className="TodoList">
    {todos.map(({ id, text, completed }) => (
      <li
        key={id}
        className={classNames('TodoList__item', {
          'TodoList__item--completed': completed,
        })}
      >
        <Todo
          text={text}
          completed={completed}
          onToggleCompleted={() => onToggleCompleted(id)}
          onDelete={()=> onDeleteTodo(id)}
          //привязуємо id та передаємо посилання на метод АПП
          // в анонімній стрілочній ф-ї через обєкт пропс 
          // в компонент Todo

        />
      </li>
    ))}
  </ul>
);

export default TodoList;
