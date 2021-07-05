import React from 'react';

import classes from '../PlayerList.module.css'
import { DragSource, DragPreviewImage } from 'react-dnd'


import { useDrag } from 'react-dnd'
const DraggablePlayer = ( props ) => {
    const {player, left, top,moved } = props
 const [{ isDragging }, drag] = useDrag({
    item: { type: 'box',player , left, top,moved },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })
        var clas=[classes.box];
        switch(props.player.position){
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
        var x=' '
        var p=    <p key={props.player.shirtNumber} >{props.player.name} {props.player.surname} {props.player.shirtNumber}</p>
        if(moved==true)p= <p key={props.player.shirtNumber} >{x}{props.player.shirtNumber}</p>
        return(
            <div className={clas.join(' ')} key={props.player.Id}  ref={drag} 
            onClick={()=>props.onDoubleClickHandler(player.id,player.moved)} style={{
                
                width: moved ? '40px':'100%',
                 height: moved ? '40px':'45px',
                 minWidth: '0em',
                border: isDragging ?'3px solid #000':'none',
                cursor: 'move',
                marginLeft:props.left,
                marginTop:props.top,
                position: 'absolute',
                borderRadius:moved? '50%':'10px' ,
                borderTop: moved ? 0:'4px solid rgba(20, 135, 212, 0.849)',
                borderLeft:moved ? 0: '4px solid rgba(20, 135, 212, 0.849)',
        
              }}
            >
           {p}
            
            </div>
            
            );
    

}

export default  DraggablePlayer;