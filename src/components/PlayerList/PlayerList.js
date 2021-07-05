import React from 'react';
import { IoIosBackspace } from "react-icons/io";
import classes from './PlayerList.module.css'

const playerList = ( props ) => {
    let list=props.players.map(player=>{
        var clas=[classes.box];
        switch(player.position){
            case('Napastnik'):
                clas.push(classes.boxred)
            break;
            case('Pomocnik'):
                clas.push(classes.boxblue)
            break;
            case('Obrońca'):
              clas.push(classes.boxyellow)
            break;
            case('Bramkarz'):
              clas.push(classes.boxgrey)

            break;
        }
   
        var c=<IoIosBackspace size={40} color='FireBrick ' onClick={()=>props.onIconClick(player.id)}/>
        if(props.noIcon==true){c=null}
        var z
        if(props.onPlayerClick){          
        z=<div className={clas.join(' ')} key={player.Id} onClick={()=>props.onPlayerClick(player)} >
        <p key={player.shirtNumber} >{player.name} {player.surname} {player.shirtNumber}</p>
        {c}
        </div>}else{
            z=<div className={clas.join(' ')} key={player.Id} >
            <p key={player.shirtNumber} >{player.name} {player.surname} {player.shirtNumber}</p>
            {c}
            </div>
        }
        
        return(
            z
            
            );
    })
    let content=(<p className={classes.as}>Lista piłkarzy</p>);
    if(props.players.length == 0)content=null;
    else if(props.reserve) content=(<p className={classes.as}>Ławka rezerwowych</p>);
    return (
        <div >
            {content}
           {list}
        </div>
    );
}
export default playerList;