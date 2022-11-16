import axios from "axios";
import Cookies from 'js-cookie';
import React, {useRef} from 'react';
import {Button, Nav, Row, Tab} from "react-bootstrap";
import Rating from "./Rating";
import Faults from "./Faults";

const Sidebar = (props) => {
    const chbDifficulty = useRef();
    const chbPath = useRef();
    const chbStroller = useRef();
    const chbParking = useRef();
    const chbFood = useRef();
    const reviewText = useRef();

    const tryHillImage = () => {
        try {
            return require(`../img/hills/${processHillName(props.currentHill.name)}-${props.currentHill.elevation}.webp`);
        } catch (err) {
            return require(`../img/nohill.webp`);
        }
    };

    const addHill = async () => {
        await axios.post('http://localhost:8082/api/users/addHill', {
            authToken: Cookies.get('authToken'),
            hillId: props.currentHill._id
        });

        props.setBtnClimb(!props.btnClimb)
    }

    const sendRating = async () => {
        await axios.post(`http://localhost:8082/api/review/addReview`, {
            stars: props.rating,
            hill: props.currentHill,
            user: props.user,
            text: reviewText.current.value,
            difficulty: chbDifficulty.current.value.includes("on") ? props.user._id : null,
            path: chbPath.current.value.includes("on") ? props.user._id : null,
            stroller: chbStroller.current.value.includes("on") ? props.user._id : null,
            parking: chbParking.current.value.includes("on") ? props.user._id : null,
            food: chbFood.current.value.includes("on") ? props.user._id : null
        }).then(() => {
            props.setTxtArea('none')
            props.setBtnReview(!props.btnReview);
            reviewText.current.value = "";
        });
    }

    const helpfulClicked = async (review) => {
        await axios.post(`http://localhost:8082/api/review/addHelpful`, {
            hillId: props.currentHill._id,
            userId: props.user._id,
            reviewId: review
        }).then(async (res) => {
            if (res.data === 'remove') {
                await axios.post(`http://localhost:8082/api/review/removeHelpful`, {
                    hillId: props.currentHill._id,
                    userId: props.user._id,
                    reviewId: review
                })
            }
        });

        props.setBtnHelpful(!props.btnHelpful);
    }

    return (
        <div className={'sidebar'}>
            <div className={'hill'}>
                <h1>{props.currentHill.name}<small style={{fontSize: 'medium'}}>({props.currentHill.elevation}m)</small></h1>
                
                <hr/>
                
                <div style={{
                    width: "100%",
                    height: "200px",
                    backgroundImage: `url(${tryHillImage()})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                    }}></div>
                    
                <h2>Informace</h2>
                    
                <div>
                    {props.currentHill.lat}<br/>
                    {props.currentHill.lon}<br/>
                    {props.currentHill.prominence}<br/>
                    {props.currentHill.isolation}<br/>
                    {props.currentHill.material}<br/>
                    {props.currentHill.basin}<br/>
                    {props.currentHill.district}<br/>
                    {props.currentHill.location}<br/>
                </div>
            </div>

            {props.currentHill.difficulty.length > 0 ? "Obtížné " : ""}
            {props.currentHill.path.length > 0 ? "Dostupná cesta " : ""}
            {props.currentHill.food.length > 0 ? "Vhodné pro kočárky " : ""}
            {props.currentHill.parking.length > 0 ? "Parkoviště " : ""}
            {props.currentHill.stroller.length > 0 ? "Občerstvení " : ""}<br/>

            <div style={{textAlign: 'center'}}>
                <Button id={'btnClaimHill'} type="button" className="btn" onClick={addHill}
                        disabled={props.climbed}>Pokořit
                </Button>
            </div>

            <hr/>

            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Row>
                        <Nav variant="pills" className="flex-row">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Hodnocení</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Závady</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Row>
                    <Row>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <Rating setRating={props.setRating}
                                        setTxtArea={props.setTxtArea}
                                        chbDifficulty={chbDifficulty}
                                        chbPath={chbPath}
                                        chbStroller={chbStroller}
                                        chbParking={chbParking}
                                        chbFood={chbFood}
                                        reviewText={reviewText}
                                        sendRating={sendRating}
                                        reviews={props.reviews}
                                        helpfulClicked={helpfulClicked}>
                                </Rating>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <Faults setTxtArea={props.setTxtArea} currentHill={props.currentHill}
                                        user={props.user}></Faults>
                            </Tab.Pane>
                        </Tab.Content>
                    </Row>
                </Row>
            </Tab.Container>
        </div>
    )
}

function processHillName(name) {
    let hill = name.toLowerCase();
    hill = hill.replace(" ", "-");
    hill = hill.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    return hill;
}

export default Sidebar;