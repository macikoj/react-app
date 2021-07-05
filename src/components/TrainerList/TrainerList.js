import React from 'react';
import { IoIosBackspace } from "react-icons/io";
import classes from './TrainerList.module.css'
const trainerList = ( props ) => {
    let list=props.trainers.map(trainer=>{

        return(
            <div className={classes.box} key={trainer.id} >
            <p key={trainer.id} >{trainer.name} {trainer.surname}</p>
            <IoIosBackspace size={40} color='FireBrick ' onClick={()=>props.onIconClick(trainer.id)}/>
            </div>
            
            );
    })
    let content=(<p className={classes.as}>Lista trenerów</p>);
    if(props.trainers.length == 0)content=null;
    return (
        <div >
            {content}
           {list}
        </div>
    );
}
export default trainerList;