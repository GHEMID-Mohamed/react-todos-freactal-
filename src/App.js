import React, { Component } from 'react';
import { provideState, update } from "freactal";
import { Map } from 'immutable'
import TodoList from './TodoList.js'
import logo from './logo.svg';
import './App.css';

const wrapComponentWithState = provideState({
  initialState: () => ({
    todos: new Map(),
    newTodoLabel: ''
  }),
  effects: {
    
    onCreateTodo: (effects) => state => {
      const id = Math.random().toString(36).slice(2)
      const todo = {
        id,
        label: state.newTodoLabel
      }
      effects.createTodo(todo)
      effects.freeInput()
    },
    freeInput: update(state => ({ newTodoLabel: '' })),
    createTodo: update((state, todo) => ({ todos: state.todos.set(todo.id, todo) })),
    setNewTodoLabelChange: update((state, val) => ({ newTodoLabel: val }))
  }
})


const App = wrapComponentWithState(({ state, effects }) => (

  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header>
    <TodoList />
  </div>
))

export default App;
