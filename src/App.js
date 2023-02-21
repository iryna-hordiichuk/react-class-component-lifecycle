import React, { Component } from 'react';
import { nanoid } from 'nanoid';
// import ColorPicker from './components/ColorPicker';
// import Counter from './components/Counter';
import Container from './components/Container';
import TodoList from './components/TodoList';
import TodoEditor from './components/TodoEditor';
import Filter from './components/TodoFilter';
import Modal from './components/Modal';
// import Tabs from './components/Tabs';
// import tabs from './tabs.json';
import IconButton from 'components/IconButton';
import { ReactComponent as AddIcon } from './icons/add.svg';
// import Clock from './components/Clock';
// import Form from './components/Form';
// import initialTodos from './todos.json';


class App extends Component {
  state = {
    todos: [],
    filter: '',
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  addTodo = text => {
    const todo = {
      id: nanoid(),
      text,
      completed: false,
    };

    this.setState(({ todos }) => ({
      todos: [todo, ...todos],
    }));

    // this.toggleModal();
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  toggleCompleted = todoId => {
    // this.setState(prevState => ({
    //   todos: prevState.todos.map(todo => {
    //     if (todo.id === todoId) {
    //       return {
    //         ...todo,
    //         completed: !todo.completed,
    //       };
    //     }

    //     return todo;
    //   }),
    // }));

    this.setState(({ todos }) => ({
      todos: todos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleTodos = () => {
    const { filter, todos } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return todos.filter(todo =>
      todo.text.toLowerCase().includes(normalizedFilter)
    );
  };

  calculateCompletedTodos = () => {
    const { todos } = this.state;

    return todos.reduce(
      (total, todo) => (todo.completed ? total + 1 : total),
      0
    );
  };
  // ! Эти методы не нужно делать публичными сойствами класса(в виде стрелочной ф-ии),
  // ! потому что они не будут передаваться как колбэки, методы жизненного цикла
  // это внутренняя логика компонента
  componentDidMount() {
    console.log('App componentDidMount');

    const todos = localStorage.getItem('todos');
    const parsedTodos = JSON.parse(todos);
    console.log('this is parsedTodos !!!', parsedTodos);

    if(parsedTodos){ 
      this.setState({ todos: parsedTodos });
    } 
    // берем из Локал сторидж начальные тудушки
    //это при первом рендеринге компонента, не надо записывать от предыдущего
    // потому как компонент только замаунтился там до этого был пустой массив
  };

  componentDidUpdate(prevProps, prevState) {
    const nextTodos = this.state.todos;
    const prevTodos = prevState.todos;

    console.log('App component did update');
    if (nextTodos !== prevTodos) {
      console.log('field todos was updated');

      localStorage.setItem('todos', JSON.stringify(this.state.todos));
      
      if(nextTodos.length > prevTodos.length &&
        prevTodos.length !== 0) {
          this.toggleModal();
        }
    }
  }

  render() {
    console.log('App render');
    const { todos, filter, showModal } = this.state;
    const totalTodoCount = todos.length;
    const completedTodoCount = this.calculateCompletedTodos();
    const visibleTodos = this.getVisibleTodos();
console.log(todos);
    return (
      <Container>
        {/* <Tabs items={tabs}/> */}

        <IconButton onClick={this.toggleModal} aria-label="Add Todo">
          <AddIcon width="40" height="40" fill="white" />
        </IconButton>

        {showModal && (
          <Modal onClose={this.toggleModal}>
          <TodoEditor onSubmit={this.addTodo} />
          </Modal>
        )}
        {/* TODO: вынести в отдельный компонент */}

        <div>
          <p>Total todos: {totalTodoCount}</p>
          <p>Completed: {completedTodoCount}</p>
        </div>

        <Filter value={filter} onChange={this.changeFilter} />

        <TodoList
          todos={visibleTodos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />
      </Container>
    );
  }
}

export default App;

// const colorPickerOptions = [
//   { label: 'red', color: '#F44336' },
//   { label: 'green', color: '#4CAF50' },
//   { label: 'blue', color: '#2196F3' },
//   { label: 'grey', color: '#607D8B' },
//   { label: 'pink', color: '#E91E63' },
//   { label: 'indigo', color: '#3F51B5' },
// ];

//! when we compare this.state.todos with prevState.todos - and use filter -
// they will be the same as when filter is used the state does change but
// filter method does not change the field todos of the state, the reference to an array
// 'todos' remains the same: the state changes but the field 'todos' - does not,
// untill new reference to the array is created
// (for example new todos was added and new array was created)

//! Когда рендерим по условию, модалка будет каждій раз монтироваться заново.
// кода в стейте showModal: false => компонент удален из дерева, поєтому каждій раз рендерится заново
