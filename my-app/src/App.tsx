import * as React from 'react';
// import Dropzone from 'react-dropzone'
// import Loader from 'react-loader-spinner'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './App.css';

interface IState {
  imageFiles: any[],
  results: any,
  dropzone: any,
  weather: any,
  city: any
}



export default class App extends React.Component<{}, IState> {
  
  constructor(props: any) {
    super(props)
    this.state = {
      imageFiles: [],
      results: "",
      dropzone: this.onDrop.bind(this),
      weather: "",
      city: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleChange = this.handleChange.bind(this);

  }

  public onDrop(files: any) {
    this.setState({
      imageFiles: files,
      results: ""
    })
    const file = files[0]
    const reader = new FileReader();
    reader.onload = (readerEvt: any ) => {
        const binaryString = readerEvt.target!!.result;
        this.upload(btoa(binaryString))
    };

    reader.readAsBinaryString(file);
  }


  public upload(base64String: string) {
    fetch('https://danktrigger.azurewebsites.net/api/dank', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify({
        file: base64String,
      })
    })
    .then((response : any) => {
      if (!response.ok) {
        this.setState({results: response.statusText})
      }
      else {
        response.json().then((data:any) => this.setState({results: data[0].class}))
      }
      return response
    })
  }
  
  public componentDidMount(){
    this.setState({weather: "Enter in a name of a city to get its weather"});
  }


  
  handleChange(event) {
    this.setState({city: event.target.value});
  }

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
