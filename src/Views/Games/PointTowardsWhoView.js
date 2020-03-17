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
        this.state = { statements: [], statementNumber: 0, shownStatement: "går ut på at man på 3 skal peke på den man synes påstanden passer best til"}; 
        this.showNewStatement.bind(this);
    }
    componentDidMount(){
        window.scrollTo(0,0);
        let dbRef = firebaseConfig.database().ref('pointTowardsWho').orderByKey().limitToLast(1000);
        dbRef.once('value', snapshot => {
            snapshot.forEach(childSnap => {
                let s = {text: childSnap.val()}
                this.setState({ statements: [s].concat(this.state.statements) });
            });
            let randomNumber = Math.floor(Math.random() * this.state.statements.length);
            this.setState({statementNumber: randomNumber});
        });
    }

    showNewStatement(){
        if(this.state.statementNumber == this.state.statements.length){
            this.setState({statementNumber: 1});
        }else{
            this.setState({statementNumber: (this.state.statementNumber+1)});
        }
        let s = this.state.statementNumber;
        let newStatement = this.state.statements[(s-1)].text;
        this.setState({shownStatement: newStatement});
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
                        <Button variant="contained" disabled={this.state.statements.length==0} onClick={() => this.showNewStatement()}>Neste påstand</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default PointTowardsWhoView;
