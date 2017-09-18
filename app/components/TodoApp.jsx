var React = require('react');

var TodoList = require('TodoList');
var AddTodo = require('AddTodo');
var TodoSearch = require('TodoSearch');
var TodoAPI = require('TodoAPI');

var uuid = require('node-uuid');
var moment = require('moment');


var TodoApp = React.createClass({
  getInitialState: function() {
    return {
      showCompleted: false,
      searchText: '',
      todos: TodoAPI.getTodos()
    };
  },
  componentDidUpdate: function() {
    TodoAPI.setTodos(this.state.todos);
  },
  handleAddTodo: function(text) {
    var todoArray = this.state.todos;
    todoArray.push({
      id: uuid(),
      text: text,
      completed: false,
      createdAt: moment().unix(),
      completedAt: undefined
    });
    this.setState({todos: todoArray});
  },
  handleSearch: function(showCompleted, searchText) {
    this.setState({
      showCompleted: showCompleted,
      searchText: searchText.toLowerCase()
    });
  },
  handleToggle: function(id) {
    var updatedTodos = this.state.todos.map((todo) => {
      if(todo.id === id) {
        todo.completed = !todo.completed;
        todo.completedAt = todo.completed ? moment().unix() : undefined;
      }

      return todo;
    });

    this.setState({todos: updatedTodos});
  },
  render: function() {
    var {todos, showCompleted, searchText} = this.state;
    var filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);

    return(
        <div>
          <TodoSearch onSearch={this.handleSearch}/>
          <TodoList todos={filteredTodos} onToggle={this.handleToggle}/>
          <AddTodo onAddTodo={this.handleAddTodo}/>
        </div>
    );
  }
});

module.exports = TodoApp;
