import React, { Component, useState } from 'react';
import firebase from 'firebase';
import firebaseConfig from '../firebaseConfig';
import '../Styles/Dataadministration.scss';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Tooltip } from '@material-ui/core';
const categories = require('../categories.json');

const DataadministrationView = (props) => {
  //Checks the url for chosen category against categories.json, if not found, random is chosen
  const { match } = props;
  var category = match.params.id;
  var showName;
  var index = categories.findIndex(function(item, i){
    return item.name === category
  });
  if(category === null || index === -1 ){
    category = "random";
    showName = "Tilfeldig"
  }else{
    showName = categories[index].showName;
  }

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);    

  return (
    <div id="registerNewDataBackground">
      <h1>Dataadministrasjon</h1>
      <div id="categoryBox">
          <Dropdown isOpen={dropdownOpen} toggle={toggle} class="dropdown">
            <DropdownToggle caret>
              {showName}
              </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Kategorier</DropdownItem>
              {categories.map(category => (
                <Tooltip title={category.description}>
                  <DropdownItem onClick={() => window.location.href = "/manageData/"+category.name}>{category.showName}</DropdownItem>
                </Tooltip>
              ))}
              
            </DropdownMenu>
          </Dropdown>
      </div>
      <div id="registerNewDataContainer">
        <div id="registerNewDataTabsContainer">
          <ul class="nav nav-pills" id="pills-tab" role="tablist">
              <li class="nav-item">
                  <a class="nav-link active" id="pills-Game1-tab" data-toggle="pill" href="#pills-Game1" role="tab" aria-controls="pills-Game1" aria-selected="true">Jeg har aldri</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" id="pills-Game2-tab" data-toggle="pill" href="#pills-Game2" role="tab" aria-controls="pills-Game2" aria-selected="false">Nødt eller sannhet</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" id="pills-Game3-tab" data-toggle="pill" href="#pills-Game3" role="tab" aria-controls="pills-Game3" aria-selected="false">Pekeleken</a>
              </li>
          </ul>
          <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-Game1" role="tabpanel" aria-labelledby="pills-Game1-tab"><NeverHaveIEverOverview category={category}/></div>
            <div class="tab-pane fade" id="pills-Game2" role="tabpanel" aria-labelledby="pills-Game 2-tab"><TruthOrDareOverview category={category}/></div>
            <div class="tab-pane fade" id="pills-Game3" role="tabpanel" aria-labelledby="pills-Game3-tab"><PointTowardsWhoOverview category={category}/></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataadministrationView;

class NeverHaveIEverOverview extends Component{
  constructor(props) {
    super(props);
    this.state = { statements: [] }; 
    this.removeStatement.bind(this)
  }
  componentDidMount(){
    let amountOfStatements = 0;
    let messagesRef = firebaseConfig.database().ref('neverHaveIEver/'+this.props.category).orderByValue().limitToLast(1000);
    messagesRef.on('child_added', snapshot => {
      amountOfStatements++;
      let message = { text: snapshot.val(), id: amountOfStatements, db_id: snapshot.key };
      this.setState({ statements: [message].concat(this.state.statements) });
    })
    messagesRef.on('child_removed', snapshot => {
      this.setState({ statements: [].concat(this.state.statements).filter(elements => elements.db_id !== snapshot.key)});
    })
  }

  addStatement(e){
    e.preventDefault();
    if(this.inputStatement.value.trim() !== ""){
      firebaseConfig.database().ref('neverHaveIEver/'+this.props.category).push( this.inputStatement.value );
      this.inputStatement.value = '';
    }
  }

  removeStatement(statementId){
    let dataRef = firebaseConfig.database().ref('neverHaveIEver/'+ this.props.category + '/'+ statementId);
    dataRef.remove();
  }
  
  render() {
    return (
      <div>
        <div id="registerNewDataInput">
          <h3>Jeg har aldri ...</h3>
          <form onSubmit={this.addStatement.bind(this)} id="registrerNewDataInputField">
            <input type="text" class="form-control" placeholder="Skriv inn en ny påstand her" ref={statement => this.inputStatement = statement }/>
            <button type="submit" class="btn btn-light btn-sm">Lagre</button>
          </form>
        </div>
        <div id="registerNewDataTable">
          <table class="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Påstand</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.statements.map( statement => (
                    <tr>
                      <th scope="row" width="30">{statement.id}</th>
                      <td>{statement.text}</td>
                      <td width="30"><button type="submit" class="btn btn-danger btn-sm" onClick={() => this.removeStatement(statement.db_id)}>Slett</button></td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
        </div> 
      </div>
    );
  }
}

class TruthOrDareOverview extends Component{
  constructor(props) {
    super(props);
    this.state = { statements: [] };
    this.removeStatement.bind(this)
  }
  componentDidMount(){
    let amountOfStatements = 0;
    let messagesRef = firebaseConfig.database().ref('truthOrDare/'+this.props.category).orderByKey().limitToLast(1000);
    messagesRef.on('child_added', snapshot => {
      amountOfStatements++;
      let message = { type: snapshot.val().type, text: snapshot.val().text, id: amountOfStatements, db_id: snapshot.key };
      this.setState({ statements: [message].concat(this.state.statements) });
    });
    messagesRef.on('child_removed', snapshot => {
      this.setState({ statements: [].concat(this.state.statements).filter(elements => elements.db_id !== snapshot.key)});
    })
  }

  addStatement(e){
    e.preventDefault();
    var choiceBox = document.getElementById("choiceTruthOrDare");
    var choiceSelected = choiceBox.options[choiceBox.selectedIndex].text;
    if(this.inputStatement.value.trim() !== ""){
      firebaseConfig.database().ref('truthOrDare/'+this.props.category).push({
        type: choiceSelected,
        text: this.inputStatement.value
      });
      this.inputStatement.value = '';
    }
  }

  removeStatement(statementId){
    let dataRef = firebaseConfig.database().ref('truthOrDare/'+this.props.category + '/'+statementId);
    dataRef.remove();
  }
  
  render() {
    return (
      <div>
        <div id="registerNewDataInput">
          <h3>Nødt eller sannhet</h3>
          <form onSubmit={this.addStatement.bind(this)} id="registrerNewDataInputFieldTruthOrDare">
            <select class="browser-default custom-select" id="choiceTruthOrDare">
              <option value="truth">Nødt</option>
              <option value="dare">Sannhet</option>
            </select>
            <input type="text" class="form-control" id="inputTruthOrDare" placeholder="Skriv inn tekst her" ref={statement => this.inputStatement = statement }/>
            <button type="submit" id="buttonTruthOrDare" class="btn btn-light btn-sm">Lagre</button>
          </form>
        </div>
        <div id="registerNewDataTable">
          <table class="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Type</th>
                  <th scope="col">Utfordring/Spørsmål</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.statements.map( statement => (
                    <tr>
                      <th width="30">{statement.id}</th>
                      <th>{statement.type}</th>
                      <td>{statement.text}</td>
                      <td width="30"><button type="submit" class="btn btn-danger btn-sm" onClick={() => this.removeStatement(statement.db_id)}>Slett</button></td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
        </div> 
      </div>
    );
  }
}

class PointTowardsWhoOverview extends Component{
  constructor(props) {
    super(props);
    this.state = { statements: [] }; 
    this.removeStatement.bind(this)
  }
  componentDidMount(){
    let amountOfStatements = 0;
    let messagesRef = firebaseConfig.database().ref('pointTowardsWho/'+this.props.category).orderByKey().limitToLast(1000);
    messagesRef.on('child_added', snapshot => {
      amountOfStatements++;
      let message = { text: snapshot.val(), id: amountOfStatements, db_id: snapshot.key };
      this.setState({ statements: [message].concat(this.state.statements) });
    });
    messagesRef.on('child_removed', snapshot => {
      this.setState({ statements: [].concat(this.state.statements).filter(elements => elements.db_id !== snapshot.key)});
    });
  }

  addStatement(e){
    e.preventDefault();
    if(this.inputStatement.value.trim() !== ""){
      firebaseConfig.database().ref('pointTowardsWho/'+this.props.category).push( this.inputStatement.value );
      this.inputStatement.value = ''; 
    }
  }

  removeStatement(statementId){
    let dataRef = firebaseConfig.database().ref('pointTowardsWho/'+this.props.category + '/' +statementId);
    dataRef.remove();
  }
  
  render() {
    return (
      <div>
        <div id="registerNewDataInput">
          <h3>Pek på den som ...</h3>
          <form onSubmit={this.addStatement.bind(this)} id="registrerNewDataInputField">
            <input type="text" class="form-control" placeholder="Skriv inn en ny påstand her" ref={statement => this.inputStatement = statement }/>
            <button type="submit" class="btn btn-light btn-sm">Lagre</button>
          </form>
        </div>
        <div id="registerNewDataTable">
          <table class="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Påstand</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.statements.map( statement => (
                    <tr>
                      <th scope="row" width="30">{statement.id}</th>
                      <td>{statement.text}</td>
                      <td width="30"><button type="submit" class="btn btn-danger btn-sm" onClick={() => this.removeStatement(statement.db_id)}>Slett</button></td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
        </div> 
      </div>
    );
  }
}