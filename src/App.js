import React, { Component } from 'react';

import Select from 'react-select';
import Options from './Options';
import 'react-select/dist/react-select.css';
import './App.css';

const options = new Options();

class App extends Component {
  state = {
    selectedOption: '',
    options: []
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Selected: ${selectedOption.label}`, selectedOption, selectedOption[0]['label']);
  }

  componentDidMount(){
    options.get('http://localhost:3000/states')
      .then(
        options => {
          console.log(options);
          this.setState({options: options})
          console.log(this.state)
        }
      )
      
  }


  render() {
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">This is a tiny app with a dropdown containing list of US states</h1>
        </header>
        <section> 
          <Select
            name="form-field-name"
            value={value}
            onChange={this.handleChange}
            options={this.state.options} 
            multi={true}
          />
        </section>
      </div>
    );
  }
}

export default App;
