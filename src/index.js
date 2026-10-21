import React from 'react';
import ReactDOM from 'react-dom/client';
import { StyleSheet, Text, View } from 'react-native';

let content =(
  <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2da0de'}}>
    <div>
      <h1>Enter desired login information: </h1>
      <label>Username: <input type="text" username = "USERNAME" /></label>
      <h1></h1>
      <label>Password: <input type="text" password = "PASSWORD" /></label>
      <h1></h1>
      <label>Confirm Password: <input type="text" passwordConfirm = "PASSWORD" /></label>
      <h1></h1>
      <button type="confirm"> Create Account </button>
    </div>
  </View>
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {content}
  </React.StrictMode>
);


