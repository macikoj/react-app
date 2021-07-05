import React from "react";
import DatePicker from "react-datepicker";
import moment from 'moment';

import Radium from 'radium';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginBox from "../../loginBox/loginBox"
import RegisterBox from "../../loginBox/registerBox"
import st from './OpeningPage.module.css';

class OpeningPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoginOpen: true,
      isRegisterOpen: false
    };
  }
  showLoginBox() {
    this.setState({isLoginOpen: true, isRegisterOpen: false});
  }

  showRegisterBox() {
    this.setState({isRegisterOpen: true, isLoginOpen: false});
  }

  render() {

    return (

      <div className={st.rootContainer}>
 
        <h4>Witamy w naszej aplikacji <br/> "ProSoccerTeam  " </h4>
<div className={st.boxContainer}>
       <div
         className={[st.controller , (this.state.isLoginOpen
         ? st.selectedController
         : "")].join(' ')}
         onClick={this
         .showLoginBox
         .bind(this)}>
         Login
       </div>
       <div
         className={[st.controller, (this.state.isRegisterOpen
         ? st.selectedController
         : "")].join(' ')}
         onClick={this
         .showRegisterBox
         .bind(this)}>
         Rejestracja
       </div>
     </div>

        <div >
          {this.state.isLoginOpen && <LoginBox/>}
          {this.state.isRegisterOpen && <RegisterBox/>}
        </div>
      </div>

    );
  }
}

export default OpeningPage;