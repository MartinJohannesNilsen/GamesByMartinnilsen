import React, { Component } from 'react';
import '../../Css/Main.css';

class NeverHaveIEverView extends Component {
    
    componentDidMount(){
        window.scrollTo(0,0);
    }

    render() {  
        return (
            <div>
                <div id="MainViewDiv">
                    <div id="MainViewTitle"><h1>Jeg har aldri</h1></div>
                    <div id="MainViewText"><h4>Enkle drikkeleker laget av Martin Johannes Nilsen</h4></div>
                    
                </div>
            </div>
        )
    }
}

export default NeverHaveIEverView;
