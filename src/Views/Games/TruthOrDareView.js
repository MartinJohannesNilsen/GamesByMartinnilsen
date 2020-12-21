import React, { Component } from 'react';
import firebaseConfig from '../../firebaseConfig';
import '../../Styles/Games/truthOrDare.scss';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
const categories = require('../../categories.json')

class TruthOrDareView extends Component {
    constructor(props) {
        super(props);
        var category = localStorage.getItem('selectedCategory');
        var index = categories.findIndex(function(item, i){
            return item.name === category
        });
        if(category === null || index === -1 ){
            category = "random";
        }
        this.state = { questions: [], dares: [], dareNumber: 0, questionNumber: 0, shownText: "går ut på enten å ta en utfordring eller å svare ærlig på et spørsmål", shownTitle: "Nødt eller Sannhet", category: category}; 
        this.showNewText.bind(this);
    }
    componentDidMount(){
        window.scrollTo(0,0);
        let dbRef = firebaseConfig.database().ref('truthOrDare/'+this.state.category).orderByKey().limitToLast(1000);
        dbRef.once('value', snapshot => {
            snapshot.forEach(childSnap => {
                if(childSnap.val().type === 'Sannhet'){
                    this.setState({ questions: [childSnap.val().text].concat(this.state.questions) });
                }else if(childSnap.val().type === 'Nødt'){
                    this.setState({ dares: [childSnap.val().text].concat(this.state.dares) });
                }
            });
            let randomNumberDares = Math.floor(Math.random() * this.state.dares.length);
            let randomNumberQuestions = Math.floor(Math.random() * this.state.questions.length);
            this.setState({dareNumber: randomNumberDares, questionNumber: randomNumberQuestions});
        });
    }

    showNewText(isTruth){
        if(isTruth){
            if(this.state.questionNumber === this.state.questions.length){
                this.setState({questionNumber: 1});
            }else{
                this.setState({questionNumber: (this.state.questionNumber+1)});
            }
            let s = this.state.questionNumber;
            let newText = this.state.questions[(s-1)];
            this.setState({shownText: newText, shownTitle: "Helt ærlig,"});
        }else{
            if(this.state.dareNumber === this.state.dares.length){
                this.setState({dareNumber: 1});
            }else{
                this.setState({dareNumber: (this.state.dareNumber+1)});
            }
            let s = this.state.dareNumber;
            let newText = this.state.dares[(s-1)];
            this.setState({shownText: newText, shownTitle: "Du er nødt til å"});
        }
    } 


    render() { 
        return (
            <div>
                <div id="truthOrDareContainer">
                    <div>
                        <IconButton aria-label="back" id="truthOrDareBackButton" size="large" onClick={() => window.location.href="/"}>
                            <ArrowBackIos fontSize="inherit" id="truthOrDareBackButtonIcon"/>
                        </IconButton>  
                    </div>
                    <div id="truthOrDareTitleDiv">
                        <h1>{this.state.shownTitle}</h1>
                    </div>
                    <div id="truthOrDareStatementDiv">
                        <h2>{this.state.shownText}</h2>
                    </div>
                    <div id="truthOrDareNextStatementButton">
                        <Button variant="contained" disabled={this.state.dares.length===0} onClick={() => this.showNewText(false)}>Nødt</Button>
                        <Button variant="contained" disabled={this.state.questions.length===0} onClick={() => this.showNewText(true)}>Sannhet</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default TruthOrDareView;
