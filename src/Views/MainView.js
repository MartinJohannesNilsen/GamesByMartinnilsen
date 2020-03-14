import React, { Component } from 'react';
import '../Css/Main.css';

class MainView extends Component {
    
    componentDidMount(){
        window.scrollTo(0,0);
    }

    render() {  
        return (
            <div>
                <div id="MainViewDiv">
                    <div id="MainViewTitle"><h1>DRIKKELEKER</h1></div>
                    <div id="MainViewText"><h4>Enkle drikkeleker laget av Martin Johannes Nilsen</h4></div>
                    <div id="MainViewButtonDiv">
                        <div id="MainViewButtons">
                            <button type="button" className="btn btn-outline-light btn-lg" onClick={()=> window.location.href = "/neverHaveIEver"}>Jeg har aldri</button>
                        </div>
                        <div id="MainViewButtons">
                            <button type="button" className="btn btn-outline-light btn-lg" onClick={()=> window.location.href = "/truthOrDare"}>Nødt eller sannhet</button>
                        </div>
                        <div id="MainViewButtons">
                            <button type="button" className="btn btn-outline-light btn-lg" onClick={()=> window.location.href = "/pointTowardsWho"}>Pekeleken</button>
                        </div>
                        <div id="MainViewButtons">
                            <button type="button" className="btn btn-outline-warning btn-lg" onClick={()=> window.location.href = "/manageData"}>Dataadministrasjon</button>
                        </div>
                    </div>  
                </div>
            </div>
        )
    }
}

export default MainView;
