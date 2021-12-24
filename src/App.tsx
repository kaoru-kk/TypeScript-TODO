import { FormControl, List, TextField } from '@material-ui/core';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import React, { useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase';
import TaskItem from './taskItem';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  field: {
    marginTop: 30,
    marginBottom: 20,
  },
  list: {
    margin: "auto",
    width: "40%",
  },
});

const App: React.FC = () => {

  const [tasks, setTasks] = useState([
    {
      id: "",
      title: ""
    }
  ]);

  const [input, setInput] = useState("");

  const classes = useStyles();

  useEffect( () => {
    const unSub = db.collection("tasks").onSnapshot((snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({ id: doc.id, title: doc.data().title }))
      );
    });
    return () => unSub();
  }, []);


  const newTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    db.collection("tasks").add({title: input});
    setInput("");
  }

  return (
    <div className="App">
      <h1>todo app! by React/TS/FS</h1>
      <FormControl>
        <TextField 
          className={classes.field}
          InputLabelProps={{shrink: true}}
          label="new task"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}>
        </TextField>
      </FormControl>

      <button
        disabled={!input}
        onClick={newTask}
      >
        <AddToPhotosIcon />
      </button>

      <List className={classes.list}>
        {tasks.map( (task) => <TaskItem id={task.id} title={task.title}></TaskItem>)}
      </List>
    </div>
  );
}

export default App;
