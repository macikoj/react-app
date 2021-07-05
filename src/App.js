import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-table/react-table.css'
import TrainingCreator from './containers/TrainingCreator/TrainingCreator'
import TrainingGenerator from './containers/TrainingCreator/TrainingGenerator'
import TrainingsList from './containers/TrainingsList/TrainingsList'
import PlayerTrainings from './containers/TrainingsList/PlayerTrainings'
import TeamComposition from './containers/TeamComposition/TeamComposition'
import PlayerStatistics from './containers/PlayerStatistics/PlayerStatistics'
import Alert from 'react-bootstrap/Alert'
import RegisterPlayer from './loginBox/RegisterPlayer'
import ButtonAppBar from './components/Toolbar/Toolbar'
import Team from './containers/Team/Team'
import OpeningPage from './components/OpeningPage/OpeningPage'

import Moda from './components/Modal/Moda'
import Calendar from './containers/Calendar/Calendar'
  import { Route, Switch } from 'react-router-dom';
  require('dotenv').config()
class App extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    const WithContainer = () => (
      <div>
      <ButtonAppBar/>
      <div className="container">


      <Route path="/trainingCreator"  component={TrainingCreator} />
      <Route path="/trainingList"  component={TrainingsList} />
      <Route path="/teamComposition"  component={TeamComposition} />
      <Route path="/traininggenerator"  component={TrainingGenerator} />
      <Route path="/playerstatistics"  component={PlayerStatistics} />
      <Route path="/registerplayer"  component={RegisterPlayer} />
      <Route path="/calendar"  component={Calendar} />

      <Route path="/team"  component={Team} />
      </div></div>)
    return (
      <div >

      <Switch>

      <Route path="/playerTrainings"  component={PlayerTrainings} />
      <Route path="/" exact component={OpeningPage} />
      <Route component={ WithContainer } />
      
    </Switch>

    </div>

      
    );
  }
}

export default App;


