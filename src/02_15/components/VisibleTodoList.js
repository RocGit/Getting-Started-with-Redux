import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoList from './TodoList';
import * as actions from '../actions';
import { withRouter } from 'react-router';
import { getVisibleTodos } from '../reducers';
import  { fetchTodos } from '../api';

class VisibleTodoList extends Component {
  componentDidMount () {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filter !== this.props.filter) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const { filter, receiveTodos } = this.props;
    fetchTodos(filter).then(todos => {
      receiveTodos(filter, todos);
    });
  };

  render () {
    const { toggleTodo, ...rest } = this.props; 
    return <TodoList {...rest} onTodoClick={toggleTodo} />
  }
}

const mapStateToTodoListProps = (state, history) => {
  const filter = history.match.params.filter || 'all'
  return {
    todos: getVisibleTodos(state, filter),
    filter
  };
};

VisibleTodoList = withRouter(connect(
  mapStateToTodoListProps,
  actions
)(VisibleTodoList));


export default VisibleTodoList;