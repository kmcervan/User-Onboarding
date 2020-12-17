import './App.css';
import React, { useState, useEffect } from 'react';
import Form from './Form';

import schema from './schema';
import axios from 'axios';
import * as yup from 'yup';

const defaultValues = {
  name:'',
  email:'',
  password:'',
  terms: false,
};

const initialFormErrors = {
  name:'',
  email:'',
  password:'',
  terms: false,
};
const initialUsers = [];
const initialDisabled = true;

function App() {
// STATES //
  const [signUp, setSignUp] = useState(initialUsers) // array of new people
  const [formValues, setFormValues] = useState(defaultValues) //object
  const [formErrors, setFormErrors] = useState(initialFormErrors) //object
  const [disable, setDisable] = useState(initialDisabled) // boolean

  const postNewUser = (newUser) => {
    axios
    .post('https://reqres.in/api/users', newUser)
    .then((res) => {
      setSignUp([res.data, ...signUp]);
      setFormValues([defaultValues]);
    })
    .catch((err) => {
      console.log(err);
      debugger;
    });
  };
// yup.reach will allow us to 'reach' into the schema and test only one part.
// We give reach the schema as the first argument, and the key we want to test as the second.
  const change = (name, value) => {
    yup
    .reach(schema, name)
    .validate(value)
    .then(() => {
      setFormErrors({
        ...formErrors,
      [name]: '',
      });
    })
    .catch((err) => {
      setFormErrors({...formErrors, [name]: err.errors[0], });
    });
    setFormValues({...formValues, [name]: value });
  }

  const formSubmit = () => {
    const newUser = {
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
      terms: formValues.terms,
    };
    postNewUser(newUser);
  };

  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisable(!valid);
    });
  }, [formValues]);


  return (
    <div className="App">
      <Form
      values={formValues}
      change={change}
      submit={formSubmit}
      disabled={disable}
      errors={formErrors}
      />
      
    </div>
  );
}

export default App;
