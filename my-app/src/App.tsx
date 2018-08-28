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
    this.fetchData();
  }

  public fetchData(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=2f2d83bc1a4664834a4b1e34fc39791e')
    .then(response => {return response.json()})
    .then(parsedJSON => {
      console.log(parsedJSON.weather[0].main)
      this.setState({weather: parsedJSON.weather[0].main});
    })
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
      this.setState({weather: parsedJSON.weather[0].main});
    })
    event.preventDefault();
  }



  public render() {
    return (
    
      <div className="container-fluid">
        <div className="centreText">
        <p>{this.state.weather}</p>
        <form onSubmit={ this.handleSubmit }>
  <label>
    Name:
    <TextField type="text" name="name" value={this.state.city} onChange={this.handleChange} />
  </label>
  <Button variant="fab" type="submit" color="primary" aria-label="Add"  value="Submit">
  Submit
  </Button>
</form>

        <p>{this.state.city}</p>

          
        </div>
      </div>
    );
  }
}
