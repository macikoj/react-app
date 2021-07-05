import React from "react";
import footballField from '../../images/footballField.png'
import classes from '../../containers/TeamComposition/TeamComposition.module.css'
import { useDrop } from 'react-dnd'
const FootballField =(props)=>{


        const [{ isOver }, drop] = useDrop({
            accept: 'player',
            
            collect: monitor => ({
                isOver: !!monitor.isOver(),
            }),
        })
        return(
            <img ref={drop} src={footballField} className={classes.field} alt={"boisko piłkarskie"}/> 
        )
    }
    
export default FootballField