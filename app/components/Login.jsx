import React from 'react';
import {Link} from 'react-router';
import * as Redux from 'react-redux';

import * as actions from 'actions';

export var Login = React.createClass({
  onLogin: function(event) {
    var {dispatch} = this.props;
    var provider = event.target.value;
    dispatch(actions.startLogin(provider));
  },
  render: function() {
    return (
      <div>
        <h1 className="page-title">Todo App</h1>
        <div className="row">
          <div className="columns small-centered small-10 medium-6 large-4">
            <div className="callout callout-auth">
              <h3>Login</h3>
              <p>Login with Github account below</p>
              <button className="button" value="github" onClick={this.onLogin}>Login with Github</button>

              <p>Login with Facebook account below</p>
              <button className="button" value="facebook" onClick={this.onLogin}>Login with Facebook</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default Redux.connect()(Login);
