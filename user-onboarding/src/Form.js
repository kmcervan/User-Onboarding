import React from 'react';


export default function Form(props){
    const {values, submit, change, disabled, errors} = props;

    const onSubmit = (evt) =>{
        evt.preventDefault();
        submit();
    };

    const onChange = (evt) => {
        const { name, value, type, checked } = evt.target;
        const valueToUse = type === 'checkbox' ? checked : value;
        change(name, valueToUse);
    };

  return(
    <div className='main-container'>
      <form onSubmit={onSubmit}>
        <div className='submit'>  
          <h2>Add Info Here</h2>  
          
            
        </div> 
        <div className='inputs'>
          <label>Name
            <input 
            value={values.name}
            onChange={onChange}
            name='name'
            type='text'
            />    
            </label> 

            <label>email
            <input 
            value={values.email}
            onChange={onChange}
            name='email'
            type='email'
            />    
            </label> 

            <label>password
            <input 
            value={values.password}
            onChange={onChange}
            name='password'
            type='text'
            />    
            </label> 

            <label>Terms of Service
            <input 
            onChange={onChange}
            name='terms'
            type='checkbox'
            checked={values.terms}
            />    
            </label> 
        </div>    
            <div>
            <button id='submit' disabled={disabled}>submit</button>
            <div className='error'>
                <p id='err'>{errors.name}</p>
                <p>{errors.email}</p>
                <p>{errors.password}</p>
                <p>{errors.terms}</p>
            </div>
            </div>
           
      </form>
        
    </div>
  )
}