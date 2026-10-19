import React from 'react';
import { useState } from 'react'
//import {login} from statlessApi
//import {createAccount} from statelessApi
function App() {
  const [count, setCount] = useState(0)
  const [sharedPass,setSharedPass] = useState(0)
  const [sharedUser,setSharedUser ] = useState(0)

  function MyButton(sharedPass,sharedUser) {
  return (
    <button 
            style={{width: '200px', // Set explicit width to match inputs
        padding: '8px',
        backgroundColor: '#5C6AC4',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        textAlign: 'center',
        marginBottom: '10px' } }
            //onClick={() => login(username, password)}
          >
            Login
          </button>
    // on button click call login from api
    // login(sharedPass,sharedUser)
  );
}
function Button2(sharedPass,sharedUser){
    return(
      <button 
            style={{
              
    width: '200px', // Set explicit width to match inputs
        padding: '8px',
        backgroundColor: 'transparent',
        color: '#5C6AC4',
        border: '2px solid #5C6AC4',
        borderRadius: '6px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        textAlign: 'center',
  }} 
            //onClick={() => createACC(username, password)}
          >
            createAccount
          </button>
      

      // on button click call create account from api
      // createAccount(sharedPass,sharedUser)
      
    );
  }
function Password(setSharedPass){
  const [text, setText] = useState('');
  var pass =''
  const handleChange = (event) => {
   pass=(event.target.value);
   setSharedPass(pass)
    setText(event.target.value);
  };
  return (
    <div style={{ textAlign: 'center' }}>
      <label htmlFor="user-input" style={{ display: 'block'}}>
        Password
      </label>
      <input
        id="user-input"
        type="text"
        value={text}            // Binds the input box value to our state
        onChange={handleChange} // Fires the function whenever the user types
        placeholder="Type here..."
        style={{marginBottom: '3px'}}
      />
    </div>
  );

}
function Username(setSharedUser){
  const [text, setText] = useState('');
  var user =''
  const handleChange = (event) => {
    user = (event.target.value);
    setSharedUser(user)
    setText(event.target.value);
  };
  return (
    <div style={{ textAlign: 'center' }}>
      <label htmlFor="user-input" style={{ display: 'block'}}>
        Username/Email
      </label>
      <input
        id="user-input"
        type="text"
        value={text}            // Binds the input box value to our state
        onChange={handleChange} // Fires the function whenever the user types
        placeholder="Type here..."
        style={styles.input}
      />
    </div>
  );
}
  const styles = {
  
  
  inputGroup: {
    marginBottom: '20px',
  },
  
 
};

  return (
    <div style={styles.main}>
      <h1 style={{
    color: '#5C6AC4',
    textAlign: 'center',
    margin: '0 0 24px 0',
    fontSize: '28px',
  }}>  Appointment Maker</h1>
      <div>
      </div>
      <div>
       <Username />
       <Password />
       </div>
<div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        marginTop: '20px' 
      }}>
        <MyButton sharedUser={sharedUser} sharedPass={sharedPass} />
        <Button2 sharedUser={sharedUser} sharedPass={sharedPass} />
      </div>
    </div>
  )
}
export default App
