import React, { Component } from 'react';
import '../../Css/Main.css';

class TruthOrDareView extends Component {
    
    componentDidMount(){
        window.scrollTo(0,0);
    }

    render() {  
        return (
            <div>
                <div id="MainViewDiv">
                    <div id="MainViewTitle"><h1>Nødt eller sannhet</h1></div>
                    <div id="MainViewText"><h4>Enkle drikkeleker laget av Martin Johannes Nilsen</h4></div>
                    
                </div>
            </div>
        )
    }
}

export default TruthOrDareView;
