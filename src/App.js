import "./App.css";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component, useState } from "react";
import { v4 as uuidv4 } from "uuid";
uuidv4();

export default function App() {
  const [todos, setTodos] = useState([]);
  const [track, setTrack] = useState(false);

  const handleAddTodo = (todo) => {
    if (String(todo) === "") {
      alert("Enter a task.");
    }

    if (String(todo) !== "") {
      setTodos([
        ...todos,
        { id: uuidv4(), task: todo, completed: false, isEditing: false },
      ]);
    }
    setTrack(true);
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    //setTrack(false);
  };

  const handleEditTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const handleEditTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="Container">
      <h1>Today's Goals </h1>
      <TodoForm handleAddTodo={handleAddTodo} />

      <TodaysDate />
      {track === true ? <Clock /> : ""}
      {todos.map((todo, index) =>
        todo.isEditing ? (
          <EditTodoForm handleEditTask={handleEditTask} task={todo} />
        ) : (
          <Todo
            task={todo}
            key={index}
            toggleComplete={toggleComplete}
            handleDeleteTodo={handleDeleteTodo}
            handleEditTodo={handleEditTodo}
          />
        )
      )}
    </div>
  );
}

// ========================================
// Components
// =======================================

function TodoForm({ handleAddTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddTodo(value);
    setValue("");
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        value={value}
        placeholder="type in a task"
        onChange={(e) => setValue(e.target.value)}
      ></input>
      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
}

function TodaysDate() {
  const date = new Date();
  var dd = String(date.getDate()).padStart(2, "0");
  var mm = String(date.getMonth() + 1).padStart(2, "0");
  var yyyy = date.getFullYear();

  return (
    <div>
      <h1>
        {mm}/{dd}/{yyyy}
      </h1>
    </div>
  );
}

function Todo({ task, toggleComplete, handleDeleteTodo, handleEditTodo }) {
  return (
    <div className="Todo">
      <p
        onClick={() => toggleComplete(task.id)}
        className={`${task.completed ? "completed" : ""}`}
      >
        {task.task}
      </p>
      <div>
        <FontAwesomeIcon
          icon={faPenToSquare}
          onClick={() => handleEditTodo(task.id)}
        />
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => handleDeleteTodo(task.id)}
        />
      </div>
    </div>
  );
}

function EditTodoForm({ handleEditTask, task }) {
  const [value, setValue] = useState(task.task);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditTask(value, task.id);
    setValue("");
  };
  return (
    <form className="TodoFrom" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        value={value}
        placeholder="Update Task"
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="todo-btn">
        Update Task
      </button>
    </form>
  );
}

class Clock extends Component {
  constructor() {
    super();
    this.state = { time: new Date() }; // initialise the state
  }

  componentDidMount() {
    // create the interval once component is mounted
    this.update = setInterval(() => {
      this.setState({ time: new Date() });
    }, 1 * 1000); // every 1 seconds
  }

  componentWillUnmount() {
    // delete the interval just before component is removed
    clearInterval(this.update);
  }

  render() {
    const { time } = this.state; // retrieve the time from state

    return (
      <div>
        <h1>
          {/* print the string prettily */}
          {time.toLocaleTimeString()}
        </h1>
      </div>
    );
  }
}
