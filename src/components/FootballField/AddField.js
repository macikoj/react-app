import React from "react";
import Input from '../../components/UI/Input/Input'
import classes from './AddField.module.css'
import Button from 'react-bootstrap/Button'
import API from '../../API'
class RegisterPlayer extends React.Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Nazwa'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        labelName: 'Nazwa boiska'
      },
      type: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Rodzaj'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        labelName: 'Rodzaj boiska'
      },
      adress: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Adres'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false,
        labelName: 'Adres boiska'
      },
      



    },

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

    return isValid;
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
        {<Button  variant="primary"  disabled={!this.state.formIsValid} onClick={()=>{this.props.addFieldHandler(this.state.orderForm)}}>Dodaj boisko</Button>}


      </form>
    );

    return (
      <div className={classes.ContactData2}>

        {form}
      </div>
    );
  }

}
export default RegisterPlayer;