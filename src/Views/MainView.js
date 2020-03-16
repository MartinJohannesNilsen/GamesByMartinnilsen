import React, { Component } from 'react';
import '../Styles/Main.scss';
import { Fab } from '@material-ui/core';



import Particles from 'react-particles-js'
const particlesOpt = require('../Components/ParticlesBackground/bubblesUpwards.json')


class MainView extends Component {
    
    componentDidMount(){
        window.scrollTo(0,0);
    }

    render() {  
        return (
            <div>
                <Particles params={particlesOpt} canvasClassName="Particles" />
                <div id="MainViewDiv">
                    <div id="MainViewTitle"><h1>GRUPPELEKER</h1></div>
                    <div id="MainViewText"><h4>av Martin Johannes Nilsen</h4></div>
                    <div id="MainViewButtonDiv"> 
                        <div id="MainViewButtons">
                            <Fab onClick={() => window.location.href = "/neverHaveIEver"} aria-labelledby="game-button" variant="extended" id="MainViewButtonsDesign" tabindex="0" alt='Gå til "Jeg har aldri"'>
                                <a>Jeg har aldri</a>
                            </Fab> 
                        </div>
                        <div id="MainViewButtons">
                            <Fab onClick={() => window.location.href = "/truthOrDare"} aria-labelledby="game-button" variant="extended" id="MainViewButtonsDesign" tabindex="0" alt='Gå til "Nødt eller sannhet"'>
                                <a>Nødt eller sannhet</a>
                            </Fab>
                        </div>
                        <div id="MainViewButtons">
                            <Fab onClick={() => window.location.href = "/PointTowardsWho"} aria-labelledby="game-button" variant="extended" id="MainViewButtonsDesign" tabindex="0" alt='Gå til "Pekeleken"'>
                                <a>Pekeleken</a>
                            </Fab>
                        </div>
                    </div>  
                </div>
            </div>
        )
    }
}

export default MainView;
