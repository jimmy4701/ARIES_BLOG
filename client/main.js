import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';

Meteor.startup(() => {
  render(
    <h1>HELLO WORLD</h1>,
    document.getElementById('root')
  )
});