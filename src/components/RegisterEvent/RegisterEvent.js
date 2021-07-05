import "./RegisterEvent.module.css"
import React from "react";
import Input from '../../components/UI/Input/Input'
import classes from "./RegisterEvent.module.css"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import API from '../../API'
import { Redirect } from 'react-router-dom'
class RegisterEvent extends React.Component {

  constructor(props) {
    super(props)
  
  this.state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Nazwa spotkania'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        labelName: 'Nazwa spotkania'
      },
     
   
     
      position: {
        elementType: 'select',
        elementConfig: {
          options: this.props.teamCompositions
        },
        value: this.props.teamCompositions[0].value,
        validation: {
          required: true,
        },
        valid: true,
        touched: false,
        labelName: 'Formacja'
      },



    },

    loading: false
  }
}

static getDerivedStateFromProps(props, state) {
  if (props.teamCompositions!== state.orderForm.position.elementConfig.options ) {
    var x=[...state.orderForm]
    x.position.elementConfig.options=props.teamCompositions
    return {
   
      orderForm:x,
    };
  }
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
        {<Button  variant="primary" disabled={!this.state.formIsValid} onClick={()=>{this.props.addEvent(this.state.orderForm)}}>Dodaj
        </Button>}


      </form>
    );



    return (
      <div className={classes.ContactData2}>

        {form}
      </div>
    );
  }

}
export default RegisterEvent;