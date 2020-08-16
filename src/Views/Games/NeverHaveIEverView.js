import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseConfig from '../../firebaseConfig';
import '../../Styles/Games/statementgame.scss';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
const categories = require('../../categories.json')

class NeverHaveIEverView extends Component {
    constructor(props) {
        super(props);
        var category = this.props.match.params.category;
        var index = categories.findIndex(function(item, i){
            return item.name === category
        });
        if(category === null || index === -1 ){
            category = "random";
        }
        this.state = { statements: [], statementNumber: 0, shownStatement: "går ut på at man får en påstand og må være ærlig på om man har gjort det eller ikke", category: category}; 
        this.showNewStatement.bind(this);
    }
    componentDidMount(){
        window.scrollTo(0,0);          

        let dbRef = firebaseConfig.database().ref('neverHaveIEver/'+this.state.category).orderByKey().limitToLast(1000);
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
                        <h1>Jeg har aldri</h1>
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

export default NeverHaveIEverView;
