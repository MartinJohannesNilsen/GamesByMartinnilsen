import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseConfig from '../../firebaseConfig';
import '../../Styles/Games/statementgame.scss';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';


class PointTowardsWhoView extends Component {
    constructor(props) {
        super(props);
        this.state = { statements: [], shownStatement: "går ut på at man på 3 skal peke på den man synes påstanden basser best til"}; 
        this.showNewStatement.bind(this);
    }
    componentDidMount(){
        window.scrollTo(0,0);
        let dbRef = firebaseConfig.database().ref('pointTowardsWho').orderByKey().limitToLast(1000);
        dbRef.once('value', snapshot => {
            snapshot.forEach(childSnap => {
                let s = {text: childSnap.val()}
                console.log(s);
                this.setState({ statements: [s].concat(this.state.statements) });
            });
        });
    }

    showNewStatement(){
        let randomNumber = Math.floor(Math.random() * this.state.statements.length);

        if(this.state.statements.length!=null){
            while(this.state.shownStatement == this.state.statements[randomNumber] || this.state.statements[randomNumber] == undefined){
                randomNumber = Math.floor(Math.random() * this.state.statements.length);
            }
        }
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
                        <h1>Pek på den som</h1>
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

export default PointTowardsWhoView;
