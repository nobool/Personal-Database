// The landing page for the web app
import React, {Component} from 'react'
import Navigation from '../../Containers/Navigation'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import './index.scss'

class Index extends Component {
    render() {
        return (
            <div className="landing-page">
                <section className="banner">
                    <div className="color-filter">
                        <Navigation />

                        <div className="banner-description">
                            <Container>
                                <Col md={6}>
                                    <h1 className="main-description-header"><strong>Manage Your Relationships</strong></h1>
                                    <p className="main-description-p">Personal Database keeps track of your social circle.</p>
                                    <Button href="/signup">Signup</Button>
                                </Col>
                            </Container>
                        </div>

                    </div>
                </section>

                <section className="main-description">
                    <div className="main-description-container">
                        <h1>Easy to use</h1>
                        <p>
                            Personal Database makes managing even a complex network of relationships a breeze.
                            No social network is too large for it to handle. It's well-suited for everyone - whether
                            you are a casual user or a high-powered networker.
                        </p>
                    </div>
                    <div className="main-description-container">
                        <h1>Easy to use</h1>
                        <p>
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero aspernatur delectus doloremque quisquam tempora!
Quibusdam, eos officiis distinctio expedita, amet sunt, modi ipsam mollitia perferendis maxime velit quia iste! Quidem!
                        </p>
                    </div>
                </section>


            </div>
        )
    }
}

/*

                */

/*
<div className="description-container">
                        <div class="description">
                            <h1>Easy to use</h1>
                            <p>Personal Database keeps track of your social circle.
                            Never forget anything about anyone again.</p>
                        </div>
                    </div>
                    */

export default Index