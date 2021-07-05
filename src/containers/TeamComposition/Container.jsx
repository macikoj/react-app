import React, { useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'
import ItemTypes from './ItemTypes'
import Button from 'react-bootstrap/Button'
import { useAlert } from 'react-alert'

import Form from 'react-bootstrap/Form'

import DraggablePlayer from '../../components/PlayerList/DraggablePlayer/DraggablePlayer'
import footballField from '../../images/footballField.png'
import PlayerList from '../../components/PlayerList/PlayerList'
import API from '../../API'
const styles = {
  width: 700,
  height: 800,

  border: '1px solid black',
  position: 'relative',
  backgroundImage: `url(${footballField})`,
  backgroundSize: '100% 100%',
}

const Container = (props) => {

  const [players, setPlayers] = useState(
    []
  )

  const [teamCompositions, setTeamCompositions] = useState(
    []
  )

  const [compositionName, setCompositionName] = useState(
    ''
  )
  const [selectedComposition, setSelectedComposition] = useState(
    
  )
  const [playersOnBoard, setplayersOnBoard] = useState(
    0
  )
  const [reservePlayers, setreservePlayers] = useState(
    []
  )

  const alert = useAlert()

  React.useEffect(() => {
    var x = 0

    props.players.forEach(player => {
      player.left = 750
      player.top = (x += 50)
      player.moved = false
    })
    var p = JSON.parse(JSON.stringify(props.players));


    API.get('teamcompositions/', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
      .then(response => {


        if (response.data.length != 0) {
          for (let i = 0; i < 11; i++) {
            
            var pl = p.find(x => x.id == response.data[0].playerIds[i])
            pl.top = response.data[0].playerPositionsY[i]
            pl.left = response.data[0].playerPositionsX[i]
            pl.moved = true
          }


          var updated = JSON.parse(JSON.stringify(reservePlayers));
          for (let j = 0; j < 6; j++) {


            var pl = p.find(x => x.id == response.data[0].reservePlayerIds[j])
            updated.push(pl)
            p.splice(p.indexOf(pl), 1);



          }
          setplayersOnBoard(11)
          setCompositionName(response.data[0].compositonName)

          setreservePlayers(updated)
        }
        setPlayers(p)
        setTeamCompositions(response.data);

      })

      .catch(error => {

      });



  }, [props])


const removeTeamComposition=()=>{
  
  API.delete(`TeamCompositions/${selectedComposition}`, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
      'Accept': 'application/json', 'Content-Type': 'application/json'
    }
  })
    .then(res => {
    
        alert.success("Usunięto formację");
        setplayersOnBoard(0)
        setreservePlayers([])
        var x = 0
        props.players.forEach(player => {
          player.left = 750
          player.top = (x += 50)
          player.moved = false
        })
        var p = JSON.parse(JSON.stringify(props.players));
        setPlayers(p)

        var updated= teamCompositions.filter(tc=>{
          return tc.id!==selectedComposition
        });
        setTeamCompositions(updated)
    }).catch(error => {

    });

}
  const onDoubleClickHandler = (id, moved) => {


    if (!moved) {
      if (reservePlayers.length < 6) {
        var updated = JSON.parse(JSON.stringify(reservePlayers));
        var newPlayers = JSON.parse(JSON.stringify(players));
        for (var i = 0; i < newPlayers.length; i++) {
          if (newPlayers[i].id == id) {
            updated.push(JSON.parse(JSON.stringify(newPlayers[i])))
            newPlayers.splice(i, 1);
          }
        }

        setreservePlayers(updated)
        setPlayers(newPlayers)
      }
    } else {
      var x = []
      players.forEach(player => {

        if (player.id == id) {

          var pl = props.players.find(x => x.id == id);

          player = JSON.parse(JSON.stringify(pl));

        }

        x.push(player)

        setplayersOnBoard(playersOnBoard - 1)

        setPlayers(x)

      })
      // HTMLFormControlsCollection.log('wywolano')
      // var p = JSON.parse(JSON.stringify(players ));

    }

  }
  const onRemove = (id) => {
    let updatedPlayers = JSON.parse(JSON.stringify(reservePlayers));;
    var newPlayers = [...players];
    updatedPlayers = updatedPlayers.filter((player) => {

      return id != player.id
    }
    )
    props.players.forEach(player => {

      if (player.id == id) {
        var pl = JSON.parse(JSON.stringify(player));
        newPlayers.push(pl)



      }
    })
    setPlayers(newPlayers)
    setreservePlayers(updatedPlayers)



  }


  const submitComposition = () => {
    var playerIds = []


    var playerPositionsX = []


    var playerPositionsY = []

    var reservePlayerIds = []

    players.forEach(player => {
      if (player.left != 750) {
        playerIds.push(player.id)
        playerPositionsX.push(player.left)
        playerPositionsY.push(player.top)
      }
    });
    reservePlayers.forEach(player => {
      reservePlayerIds.push(player.id)
    });
    const DTO = {
      compositionName: compositionName,
      playerIds: playerIds,
      playerPositionsX: playerPositionsX,
      playerPositionsY: playerPositionsY,
      reservePlayerIds: reservePlayerIds

    }
    API.post('TeamCompositions/', DTO, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json', 'Content-Type': 'application/json'
      }
    })
      .then(res => {
        alert.success('Dodano nową kompozycję')
      }).catch(error => {
        alert.error('Nie udało się dodać kompozycji')
      });

  }


  const onNameChangeHandler = (event) => {
    setCompositionName(event.target.value)
   

  }
  const onSelectedTeamCompositionChange=(event)=>{
    var p = JSON.parse(JSON.stringify(props.players));
    setSelectedComposition(parseInt(event.target.value))
    const tc=teamCompositions.find(x=>x.id==event.target.value)
    for (let i = 0; i < 11; i++) {

      var pl = p.find(x => x.id == tc.playerIds[i])

      pl.top = tc.playerPositionsY[i]
      pl.left = tc.playerPositionsX[i]
      pl.moved = true
    }


    var updated = [];
    for (let j = 0; j < 6; j++) {
      var pl = p.find(x => x.id == tc.reservePlayerIds[j])
      updated.push(pl)
      p.splice(p.indexOf(pl), 1);



    }
    setplayersOnBoard(11)


    setreservePlayers(updated)
    setPlayers(p)
  }


  
  const moveBox = useCallback(

    (player, left, top) => {

      if (playersOnBoard < 11 && player.moved == false) {
        setplayersOnBoard(playersOnBoard + 1)
        var p = players.map(element => {

          if (element.id == player.id) {
            element.left = left;
            element.top = top;
            element.moved = true;

          }
          return JSON.parse(JSON.stringify(element))
        })

        setPlayers([...p])
      }
      if (playersOnBoard < 12 && player.moved == true) {

        var p = players.map(element => {

          if (element.id == player.id) {
            element.left = left;
            element.top = top;
            element.moved = true;

          }
          return JSON.parse(JSON.stringify(element))
        })

        setPlayers([...p])
      }
    }, [players]

  )


  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset()
      let left = Math.round(item.left + delta.x)
      let top = Math.round(item.top + delta.y)
      moveBox(item.player, left, top)
      return undefined
    },
  })

  const compositionDisplay =teamCompositions.map(teamcomp=>{
    return (
      <option value={teamcomp.id}>{teamcomp.compositionName}</option>
      )
    })
  return (

    <div>

      <br />
      <div ref={drop} style={styles}>

        {players.map(player => {

          return <DraggablePlayer player={player} left={player.left} top={player.top} moved={player.moved}  onDoubleClickHandler={onDoubleClickHandler} />

        })}

      </div>
  
      <div style={{width: '700px', display: 'inline-block'}} >
      <Form.Control size="lg" type="text" placeholder="Nazwa treningu"
        onChange={onNameChangeHandler} value={compositionName} style={{width: '350px', float: 'left'} }/>

      <Button disabled={!(playersOnBoard==11 && reservePlayers.length==6)} variant="success"size="lg" block="false" onClick={submitComposition} style={{width: '350px', float: 'left'}} >Dodaj nową kompozycję</Button>

        </div>
        <div style={{width: '700px', display: 'inline-block'}} >
      <Form.Control size="lg" style={{width: '350px' ,float:'left'}} as="select" onChange={onSelectedTeamCompositionChange}  >
                {compositionDisplay}

      </Form.Control>
      <Button variant="danger"size="lg" block="false" onClick={removeTeamComposition} style={{width: '350px', float: 'left'}} >Usuń kompozycję</Button>


      </div>
      <br/>
      <div style={{width: '300px'}}>
      <PlayerList players={reservePlayers} onIconClick={onRemove} reserve={true}/>
      </div>

    </div>
  )
}
export default Container
