import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'

class App extends Component {
  // changing state causes a rerender. Updating the DOM. Prop changes also causes a rerender
  state ={
    persons: [
      { id: 'asfa1', name: 'Max', age: 28},
      { id: 'vasdf1', name: 'Manu', age: 29},
      { id: 'asdf11', name: 'Sthephanie', age: 26}
    ],
    otherState: 'some other value',
    showPersons: false
  }

  deletePersonHandler = (personIndex) => {
    // create a copy do mutate objects
    const persons = [...this.state.persons]; 
    persons.splice(personIndex,1);
    this.setState({
      persons: persons
    })
    
  }

  nameChangeHandler = (event, id) => {
    // look for the index of the selected person 
    const personIndex = this.state.persons.findIndex(person =>{
      return id === person.id 
    })

    // create a copy of the person using the personIndex
    const person = {
      ...this.state.persons[personIndex]
    };

    // update the person name with the value form the input field;
    person.name = event.target.value;

    // create a copy of the persons state; 
    const persons = [...this.state.persons];

    // add the updated person to the  copy of persons. 
    persons[personIndex] = person; 
    
    // set the copy of persons as the new state
    this.setState({
      persons: persons
    })

  }

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({
      showPersons: !doesShow
    })
  }


  render() {

    let persons = null; 

    if(this.state.showPersons){
      persons = this.state.persons.map((person, index) => {
        return (
                <Person 
                name={person.name} 
                age={person.age} 
                key={person.id} 
                click={() => this.deletePersonHandler(index)}
                changed={(event) => this.nameChangeHandler(event, person.id)}
                />
                )
      })
    }



    return (
      <div className="App">
        <h1>Hi I am A React App!</h1>
        <p>This is Really Working</p>
        <button className="button" onClick={this.togglePersonHandler}
        // style={style}
        >Toggle Persons</button>
        {persons}
      </div>
    );
  }
}

export default App;
