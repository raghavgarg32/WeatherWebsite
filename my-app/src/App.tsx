import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './App.css';

interface IState {
  weather: any,
  city: any
}

export default class App extends React.Component<{}, IState> {
  
  constructor(props: any) {
    super(props)
    this.state = {
      weather: "",
      city: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //Sets up initial weather text
  public componentDidMount(){
    this.setState({weather: "Enter in a name of a city to get its weather"});
  }

  //Handles the change in city
  handleChange(event) {
    this.setState({city: event.target.value});
  }

  //Fetches the weather of the city
  handleSubmit(event) {
    console.log("This gets to this place")
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+ this.state.city+ '&appid=2f2d83bc1a4664834a4b1e34fc39791e')
    .then(response => {return response.json()})
    .then(parsedJSON => {
      console.log(parsedJSON.weather[0].main)
      this.setState({weather: "Weather: " + parsedJSON.weather[0].main});
    })
    .catch(error => this.setState({weather: "Incorrect city, please try again..."}));    
    event.preventDefault();
  }


  //Renders ths city website
  public render() {
    return (
      <div className="container-fluid">
        <div className="centreText">
          <h2>City Weather Website</h2>
          <p>{this.state.weather}</p>
          <form onSubmit={ this.handleSubmit }>  
              City: 
            <TextField type="text"   name="name" value={this.state.city} onChange={this.handleChange} />
            <Button variant="fab" type="submit" color="primary" aria-label="Add"  value="Submit">
              Enter
            </Button>
          </form>   
        </div>
      </div>
    );
  }
}
