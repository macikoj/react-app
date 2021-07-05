import "./box.module.css"
import React from "react";
import Input from '../components/UI/Input/Input'
import classes from './loginBox.module.css'
import {withAlert} from "react-alert"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import API from '../API'
import { Redirect } from 'react-router-dom'
class LoginBox extends React.Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Twoje imię'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        labelName: 'Imię'
      },
      surname: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Twoje nazwisko'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        labelName: 'Nazwisko'
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Twoj email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false,
        labelName: 'Adres email'
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Twoje hasło'
        },
        value: '',
        validation: {
          required: true,
          minLength: 8,
          maxLength: 20
        },
        valid: false,
        touched: false,
        labelName: 'Hasło'
      },

      team: {
        elementType: 'select',
        elementConfig: {
          options: []
        },
        value: 1,
        validation: {
          required: true,
        },
        valid: true,
        touched: false,
        labelName: 'Drużyna'
      },


    },
    selectedTeam: null,

    loading: false
  }


  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  }

  componentDidMount = () => {
    API.get('teams/simpleTeams')
      .then(response => {
        var t = { ...this.state.orderForm }

        var opt = []
        t.team.elementConfig.options = response.data.forEach(team => {

          opt.push({ value: team.id, displayValue: team.teamName })
        })
        t.team.elementConfig.options = opt

        this.setState({ orderForm: t });
      })
      .catch(error => {

      });


  }
  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }
    if (rules.isEmail) {

      isValid =(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))

    }
    return isValid;
  }

  submitRegister = () => {

    var authData = {
      Name: this.state.orderForm.name.value,
      Surname: this.state.orderForm.surname.value,
      EmailAdresss: this.state.orderForm.email.value,
      Paswsword: this.state.orderForm.password.value,
      TeamId: this.state.orderForm.team.value,


    }
    API.post('trainers/register', authData)
      .then(response => {
        this.props.alert.success('Pomyślnie zarejestrowano trenera')
      })
      .catch(err => {
        this.props.alert.error('Nie udało się zarejestrować trenera')
      })   
      
    }

    
  
  
    render() {
        const formElementsArray = [];
        for(let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            labelName={formElement.config.labelName}
            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ))}
        {<Button btnType="Success" disabled={!this.state.formIsValid} onClick={this.submitRegister}>Zarejestruj się</Button>}


      </form>
    );

    return (
      <div className={classes.ContactData}>

        {form}
      </div>
    );
  }

}
export default withAlert()(LoginBox);