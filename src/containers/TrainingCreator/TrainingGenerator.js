import React from "react";
import DatePicker from "react-datepicker";
import InputGroup from 'react-bootstrap/InputGroup'
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Select from 'react-select';
import API from '../../API'
import { connect } from 'react-redux'
import TrainerList from '../../components/TrainerList/TrainerList'
import moment from 'moment';
import classes from './TrainingCreator.module.css'
import PlayerList from '../../components/PlayerList/PlayerList'
import { withAlert } from 'react-alert'
export class TrainingGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playersList: [],
            selectedPlayersList: [],
            startTime: new Date().setHours(7, 30),
            endTime: new Date().setHours(8, 30),
            endTime: null,
            Name: null,
            selectedTrainer: null,
            selectedfieldPart: '1',
            selectedPlayer: null,
            trainerList: [],
            selectedGroup: 'Napastnicy',
            selectedTrainersList: [],
            selectedFootbalField: null,
            footballFieldList: [],
            trainingAmmount:1,
            selectedWeek:new Date(),
            trainingTime:45

        };
    }
    componentDidMount = () => {
        API.get('players/', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
            .then(response => {
                this.setState({ playersList: response.data });
            })
            .catch(error => {

            });
        API.get('trainers/simpletrainers/', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
            .then(response => {
                this.setState({selectedTrainer:response.data[0].id})
                this.setState({ trainerList: response.data });
            })
            .catch(error => {

            });
        API.get('FootballFields/simplefootballfields/', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
            .then(response => {
                this.setState({selectedFootbalField:response.data[0].id})
                this.setState({ footballFieldList: response.data });
            })
            .catch(error => {

            });


    }

    removeTrainerHandler = (id) => {
        let updatedTrainers = this.state.selectedTrainersList.slice(0);

        updatedTrainers = updatedTrainers.filter((trainer) => {

            return id != trainer.id
        }
        )
        this.setState({ selectedTrainersList: updatedTrainers })

    }
    onStartTimeChange = (date) => {
        this.setState({ selectedWeek: date })
        //todo zmiana daty inne zablokwoane godziny
    }
    onNameChangeHandler = (event) => {
        this.setState({ Name: event.target.value })
    }
    onFootballFieldChange = (event) => {
        this.setState({ selectedFootbalField: event.target.value })
    }
    onTrainingAmmountChange=(event)=>{
        this.setState({trainingAmmount:event.target.value})

    }
    onTrainingTimeChange=(event)=>{
        this.setState({trainingTime:event.target.value})

    }
    addTrainerHandler = () => {
        let UpdatedSelectedTrainersList = this.state.selectedTrainersList.slice(0);
        let trainer = this.state.trainerList.find(x => x.id == this.state.selectedTrainer);
        if (UpdatedSelectedTrainersList.map((trainer) => {
            return trainer.id
        }).indexOf(this.state.selectedTrainer) == -1) {
            UpdatedSelectedTrainersList.push(trainer)
            this.setState({ selectedTrainersList: UpdatedSelectedTrainersList });
        }

    }
    submitTraining = () => {
        var trainerIds = []
        this.state.selectedTrainersList.forEach(element => {
            trainerIds.push(element.id)
        });
        var playerIds = []
        this.state.selectedPlayersList.forEach(element => {
            playerIds.push(element.id)
        });
        const DTO = {

            Name: this.state.Name,


            PartUsed: this.state.selectedfieldPart,
            FootballFieldId: this.state.selectedFootbalField,
            TrainersIds: trainerIds,
            PlayersIds: playerIds,
            trainingAmmount:this.state.trainingAmmount,
            selectedWeek:this.state.selectedWeek,
            trainingTime:this.state.trainingTime

        }
        API.post('trainings/generateTrainings/', DTO, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
                'Accept': 'application/json', 'Content-Type': 'application/json'
            }
        })
            .then(res => {
                this.props.alert.success('Pomyślnie wygnerowano treningi')
           
            })
            .catch(error => {
                this.props.alert.error('Nie udało się dodać treningu')
            });



    }
    removePlayerHandler = (id) => {
        let updatedPlayers = this.state.selectedPlayersList.slice(0);

        updatedPlayers = updatedPlayers.filter((player) => {
            return id != player.id
        }
        )
        this.setState({ selectedPlayersList: updatedPlayers })

    }
    addPlayerHandler = () => {



        let UpdatedSelectedPlayersList = this.state.selectedPlayersList.slice(0);
        let player = this.state.playersList.find(x => x.id === this.state.selectedPlayer);

        if (UpdatedSelectedPlayersList.map((player) => {
            return player.id
        }).indexOf(this.state.selectedPlayer) == -1) {
            UpdatedSelectedPlayersList.push(player)
            this.setState({ selectedPlayersList: UpdatedSelectedPlayersList });
        }

    }

    addPlayerGroupHandler = () => {
        let UpdatedSelectedPlayersList = this.state.selectedPlayersList.slice(0);
        let players = this.state.playersList.slice(0)
        switch (this.state.selectedGroup) {
            case 'Napastnicy':
                players = players.filter(x => { return x.position == 'Napastnik' });
                break;
            case 'Obrońcy':
               
                players = players.filter(x => { return x.position == 'Obrońca' });
                break;
            case 'Pomocnicy':
                players = players.filter(x => { return x.position == 'Pomocnik' });
                break;
            case 'Bramkarze':
                players = players.filter(x => { return x.position == 'Bramkarz' });
                break;
            default: players = this.state.playersList.slice(0)
                break;
        }
        players.forEach((player) => {


            if (UpdatedSelectedPlayersList.indexOf(player) == -1) UpdatedSelectedPlayersList.push(player);
        });
        this.setState({ selectedPlayersList: UpdatedSelectedPlayersList });


    }
    onSelectPlayerChange = (event) => {
        this.setState({ selectedPlayer: event.value })

    }
    onSelectedWeekChange=(date)=>{
        this.setState({selectedWeek:date})


    }
    onSelectedGroupChange = (event) => {
        this.setState({ selectedGroup: event.target.value })
    }
    onSelectedTrainerChange = (event) => {

        this.setState({ selectedTrainer:parseInt( event.target.value )})

    }
    onFootballFieldPartChange = (event) => {
        this.setState({ selectedfieldPart: event.target.value })
    }
    render() {

        const playersDisplay = this.state.playersList.map(player => {
            return (
                { value: player.id, label: player.shirtNumber + ' ' + player.name + ' ' + player.surname }
            )

        })
        const trainerDisplay = this.state.trainerList.map(trainer => {
            return (
                <option value={trainer.id}>{trainer.name + ' ' + trainer.surname}</option>
            )
        })
        const footballFieldDisplay =
            this.state.footballFieldList.map(footballfield => {
                return (
                    <option value={footballfield.id}>{footballfield.name + ' ' + footballfield.type}</option>
                )
            })
            const alert = this.props.alert;
        return (

            <div className={classes.rootContainer}>
                <div className={classes.boxContainer}>


                    <div className={classes.individualBox}>

                        <Form.Control size="lg" type="text" placeholder="Nazwa treningu" onChange={this.onNameChangeHandler} value={this.state.Name} />
                        <br />
                        <div className={classes.individualBox2}>
                            <p style={{
                                width: '300px'
                            }}>Liczba treningów w tygodniu:</p>
                            <Form.Control style={{
                                width: '160px'
                            }} as="select" onChange={this.onTrainingAmmountChange} >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>


                            </Form.Control>
                        </div>
                        <br />
                        <div className={classes.individualBox2}>
                            <p style={{
                                width: '300px'
                            }}>Czas trwania treningu:</p>
                            <Form.Control style={{
                                width: '160px'
                            }}  onChange={this.onTrainingTimeChange} value={this.state.trainingTime} placeholder="<min>" />



                            
                        </div>
                        <br/>
                        <Select

                            onChange={this.onSelectPlayerChange}
                            options={playersDisplay}


                        />
                        <Button variant="primary" disabled={this.state.selectedPlayer==null?true:false} onClick={this.addPlayerHandler} >
                            Dodaj pojedyńczo zawodnika
                </Button>
                    </div>



                    <Form.Group controlId="exampleForm.ControlSelect1">

                        <Form.Label>Wybierz grupę treningową:</Form.Label>
                        <Form.Control as="select" onChange={this.onSelectedGroupChange} >
                            <option>Napastnicy</option>
                            <option>Pomocnicy</option>
                            <option>Obrońcy</option>
                            <option>Bramkarze</option>
                            <option>Wszyscy</option>


                        </Form.Control>
                        <Button variant="primary" style={{ width: '200px' }} onClick={this.addPlayerGroupHandler}>
                            Dodaj Zawodników
                </Button>
                    </Form.Group>


                    <Form.Label>Dodaj trenerów:</Form.Label>
                    <Form.Control as="select" onChange={this.onSelectedTrainerChange} >
                        {trainerDisplay}

                    </Form.Control>



                    <Button variant="primary"  disabled={this.state.selectedTrainer==null?true:false}  style={{ width: '200px', margin: '13px' }} onClick={this.addTrainerHandler}>
                        Dodaj Trenera
                </Button>


                    Wybierz boisko
                <Form.Control as="select" onChange={this.onFootballFieldChange}>
                        {footballFieldDisplay}
                    </Form.Control>
                    Wybierz część boiska
                <Form.Control as="select" onChange={this.onFootballFieldPartChange} value={this.state.fieldPart}>
                        <option>1</option>
                        <option>0.5</option>

                    </Form.Control>

                    <div className={classes.separtor}>
                        Wybierz tydzień:
                <DatePicker
                            selected={this.state.selectedWeek}
                            onChange={this.onSelectedWeekChange}


                            minDate={new Date()}
                            dateFormat="yyyy/MM/dd"

                        />
                    </div>

                    <Button className={classes.buttonCreate} onClick={this.submitTraining} variant="success" >Generuj treningi</Button>
                </div>
                <div className={classes.separtor}>
                    <PlayerList players={this.state.selectedPlayersList} onIconClick={this.removePlayerHandler} />
                    <TrainerList trainers={this.state.selectedTrainersList} onIconClick={this.removeTrainerHandler} />
                </div>
            </div>
        );
    }
}

export default withAlert()(TrainingGenerator);