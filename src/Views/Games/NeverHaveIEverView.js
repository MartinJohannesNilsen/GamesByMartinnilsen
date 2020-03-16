import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseConfig from '../../firebaseConfig';
import '../../Styles/Games/statementgame.scss';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';


class NeverHaveIEverView extends Component {
    constructor(props) {
        super(props);
        this.state = { statements: [], shownStatement: "går ut på at man får en påstand og må være ærlig på om man har gjort det eller ikke"}; 
        this.showNewStatement.bind(this);
    }
    componentDidMount(){
        window.scrollTo(0,0);
        let dbRef = firebaseConfig.database().ref('neverHaveIEver').orderByKey().limitToLast(1000);
        dbRef.once('value', snapshot => {
            snapshot.forEach(childSnap => {
                let s = {text: childSnap.val()}
                this.setState({ statements: [s].concat(this.state.statements) });
            });
        });
    }

    showNewStatement(){
        let randomNumber = Math.floor(Math.random() * this.state.statements.length);
        do{
            randomNumber = Math.floor(Math.random() * this.state.statements.length);
        }
        while(this.state.shownStatement == this.state.statements[randomNumber] || this.state.statements[randomNumber] == undefined);
        this.setState({shownStatement: this.state.statements[randomNumber].text});
    } 


    render() { 

          

        return (
            <div>
                <div id="statementgameContainer">
                    <div>
                        <IconButton aria-label="back" id="statementgameBackButton" size="large" onClick={() => window.location.href="/"}>
                            <ArrowBackIos fontSize="inherit" id="statementgameBackButtonIcon"/>
                        </IconButton>  
                    </div>
                    <div id="statementgameTitleDiv">
                        <h1>Jeg har aldri</h1>
                    </div>
                    <div id="statementgameStatementDiv">
                        <h2>{this.state.shownStatement}</h2>
                    </div>
                    <div id="statementgameNextStatementButton">
                        <Button variant="contained" onClick={() => this.showNewStatement()}>Neste påstand</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default NeverHaveIEverView;
