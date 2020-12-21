import React, { useState } from 'react';
import '../Styles/Main.scss';
import { Fab, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Tooltip} from '@material-ui/core';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Particles from 'react-particles-js'
const particlesOpt = require('../Components/ParticlesBackground/bubblesUpwards.json')
const categories = require('../categories.json')

const MainView = (props) => {
    window.scrollTo(0,0);
    
    //Modal
    const [modal, setModal] = useState(false);
    const toggle = () => {setModal(!modal)};
    const closeBtn = <button className="close" onClick={toggle}>&times;</button>;
    const [selectedCategory, setSelectedCategory] = React.useState(localStorage.getItem('selectedCategory'));
    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    React.useEffect(() => {
        localStorage.setItem('selectedCategory', selectedCategory);
    }, [selectedCategory]);
    
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
                    <div id="MainViewButtons">
                        <Fab onClick={() => {toggle()} } aria-labelledby="category-selection" variant="extended" id="MainViewCategorybuttonDesign" tabindex="0" alt='Velg kategori'>
                            <a>Velg modus</a>
                        </Fab>
                    </div>
                </div>  
            </div>
            <Modal isOpen={modal} toggle={toggle} className="modal-dialog modal-dialog-centered">
                <ModalHeader toggle={toggle} close={closeBtn} id="categoryModal">Moduser</ModalHeader>
                <ModalBody id="categoryModal">
                    <FormControl component="fieldset">
                    <FormLabel component="legend">Velg modus</FormLabel>
                    <RadioGroup aria-label="categories" name="category" value={selectedCategory} onChange={handleChange}>
                        {categories.map(category => (
                            <Tooltip title={category.description}>
                                <FormControlLabel 
                                        value={category.name} control={
                                        <Radio/>
                                        } label={category.showName} />
                            </Tooltip>
                        ))}
                    </RadioGroup>
                    </FormControl>
                </ModalBody>
                <ModalFooter id="categoryModal">
                    <Button color="dark" onClick={toggle}>Velg</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Lukk</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
    
}



export default MainView;
