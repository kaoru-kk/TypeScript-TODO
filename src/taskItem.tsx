import React, {useState} from 'react';
import firebase from "firebase/app";
import { db } from './firebase';

import { ListItem, TextField, Grid } from '@material-ui/core';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditOutlinedIcon from "@material-ui/icons/EditOutlined"
import { isArrowFunction } from 'typescript';

interface Props {
  id: string;
  title: string;
}

const TaskItem: React.FC<Props> = (props) => {

  const [title, setTitle] = useState(props.title);

  const editTask = () => {
    const document = db.collection("tasks").doc(props.id);
    document.set({title: title}, {merge: true} );
  }

  const deleteTask = () => {
    db.collection("tasks").doc(props.id).delete();
  }
  

  return (
    <ListItem>
      <h2>{ props.title }</h2>

      <Grid container justifyContent="flex-end">
        <TextField
          InputLabelProps={{
            shrink: true
          }}
          label="edit task"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        />
      </Grid>
      <button onClick={editTask}>
        <EditOutlinedIcon />
      </button>

      <button onClick={deleteTask}>
        <DeleteOutlineOutlinedIcon />
      </button>

    </ListItem>
  )
}

export default TaskItem;