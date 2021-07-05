import React from 'react';
import { IoIosBackspace } from "react-icons/io";
import classes from './PlayerList.module.css'
import { DragSource } from 'react-dnd'
import DraggablePlayer from './DraggablePlayer/DraggablePlayer'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'


const playerListDraggable = ( props ) => {
    let list=props.players.map(player=>{
 

        return(
            <DndProvider backend={HTML5Backend}> <DraggablePlayer player={player}/></DndProvider>)
        })
    let content=(<p className={classes.as}>Lista piłkarzy</p>);
    if(props.players.length == 0)content=null;
    return (
        <div >
            {content}
           {list}
        </div>
    );
}

export default playerListDraggable;