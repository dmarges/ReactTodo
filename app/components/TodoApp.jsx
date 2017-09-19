var React = require('react');

import TodoList from 'TodoList';
import AddTodo from 'AddTodo';
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

  render: function() {
    var {todos, showCompleted, searchText} = this.state;
    var filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);

    return(
        <div>
          <h1 className="page-title">Todo App</h1>
          <div className="row">
            <div className="column small-centered small-11 medium-6 large-5">
              <div className="container">
                <TodoSearch onSearch={this.handleSearch}/>
                <TodoList/>
                <AddTodo onAddTodo={this.handleAddTodo}/>
              </div>
            </div>
          </div>
        </div>
    );
  }
});

module.exports = TodoApp;
