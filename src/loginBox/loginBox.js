import "./box.module.css"
import React from "react";
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

import {connect} from 'react-redux'
import Input from '../components/UI/Input/Input'
import classes from './loginBox.module.css'
import * as actions from '../store/actions/index'
import Spinner from '../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom'
import { withAlert } from 'react-alert'
class LoginBox extends React.Component {
  state={
    orderForm:{
      email:{
        elementType: 'input',
        elementConfig:{
          type: 'text',
          placeholder: 'Twoj email'
        },
        value:'',
        validation:{
          required:true,
          isEmail:true
        },
        valid:false,
        touched:false,
        labelName:'Email'
      },
        password:{
          elementType: 'input',
          elementConfig:{
            type: 'password',
            placeholder: 'Twoje hasło'
          },
          value:'',
          validation:{
            minLength:8,
            maxLength:20,
            required:true
          },
          valid:false,
          touched:false,
          labelName:'Hasło'
        }
    
  },
  formIsValid: false,
  loading: false,
  trainer:true
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
  if (rules.isEmail){
    isValid =(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))

  }
  return isValid;
}

submitHandler=(event)=>{

  event.preventDefault();


  this.props.onAuth(this.state.orderForm.email.value,this.state.orderForm.password.value,this.state.trainer)

  
};



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
  this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
}

  
    render() {
 
      if(this.props.token&&this.state.trainer){
        localStorage.setItem('token', this.props.token)
      return <Redirect to="/traininggenerator" />
    }else if(this.props.token&& !this.state.trainer){
      localStorage.setItem('token', this.props.token)

    return <Redirect to="/playertrainings" />

    }
      const formElementsArray = [];
      for (let key in this.state.orderForm) {
          formElementsArray.push({
              id: key,
              config: this.state.orderForm[key]
          });
      }
      let form = (
          <form >

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
             <Button variant="primary" disabled={!this.state.formIsValid} onClick={this.submitHandler}>Zaloguj</Button>
          </form>
      );
      if(this.props.loading){
        form=<Spinner/>
      }
      let errorMessage=null;
      if (this.props.error){
        errorMessage=(
          <Alert variant="danger"  >
          <Alert.Heading>Nieprawidłowy login lub hasło!</Alert.Heading>
          </Alert>
        );
      }
      return (
        <div className={classes.ContactData}>

            {errorMessage}
                        <BootstrapSwitchButton
                checked={this.state.trainer}
                onlabel='Trener'
          
                offlabel='Zawodnik'
              
                style='w-100'
                onChange={() => {
                    this.setState({trainer:!this.state.trainer })
                }}
            />
            {form}
        </div>
    );
    }
  
  }
const mapStateToProps=state=>{
  return{ 
    loading:state.auth.loading,
    error: state.auth.error,
    token:state.auth.token
  }
}
  const mapDispatchToProps=dispatch=>{
    return {
      onAuth: (email,password,trainer) =>dispatch(actions.auth(email,password,trainer))
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(LoginBox);