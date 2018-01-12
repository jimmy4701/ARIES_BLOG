import React, { Component } from "react";
import { Grid, Header, Button } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

import SignInForm from "/imports/components/SignInForm";
import SignUpForm from "/imports/components/SignUpForm";

class SigninPage extends Component {
  state = {
    signing_up: false
  };

  toggleState = e => {
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    });
  };

  on_connected = () => {
    this.props.history.push("/");
  };

  render() {
    const { signing_up } = this.state;
    return (
      <Grid stackable>
        {signing_up ? (
          <Grid.Column width={16}>
            <Header as="h1">Inscrivez-vous</Header>
            <SignUpForm />
          </Grid.Column>
        ) : (
          <Grid.Column width={16}>
            <Header as="h1">Connectez-vous</Header>
            <SignInForm onSignedIn={this.on_connected} />
          </Grid.Column>
        )}
        <Grid.Column width={16}>
          <Button onClick={this.toggleState} name="signing_up">
            {signing_up ? "J'ai déjà un compte" : "Créer un compte"}
          </Button>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(SigninPage);
