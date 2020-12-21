import React, { Component } from 'react';
import firebaseConfig from '../../firebaseConfig';
import '../../Styles/Games/statementgame.scss';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
const categories = require('../../categories.json')

class PointTowardsWhoView extends Component {
    constructor(props) {
        super(props);
        var category = localStorage.getItem('selectedCategory');
        var index = categories.findIndex(function(item, i){
            return item.name === category
        });
        if(category === null || index === -1 ){
            category = "random";
        }
        this.state = { statements: [], statementNumber: 0, shownStatement: "man synes påstanden passer best til. Enten så kan man telle til tre og la alle peke, eller så kan man spille slik at kun den som blir pekt på skal peke videre på neste spørsmål", category: category}; 
        //this.state = { statements: [], statementNumber: 0, shownStatement: "man synes påstanden passer best til. Forslag til utførelse kan være å enten telle til 3 og la alle peke, eller at den som blir pekt på peker videre på neste spørsmål", category: category}; 
        this.showNewStatement.bind(this);
    }
    componentDidMount(){
        window.scrollTo(0,0);
        let dbRef = firebaseConfig.database().ref('pointTowardsWho/'+this.state.category).orderByKey().limitToLast(1000);
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
        if(this.state.statementNumber === this.state.statements.length){
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
                        <Button variant="contained" disabled={this.state.statements.length===0} onClick={() => this.showNewStatement()}>Neste påstand</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default PointTowardsWhoView;
