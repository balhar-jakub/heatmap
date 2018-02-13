import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

import Map from './components/Map';
import SentinelProductsStore from './stores/SentinelProductsStore';
import Sidebar from './components/Sidebar';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            wwd: null,
            data: []
        };

        new SentinelProductsStore().load().then(products => {
            this.setState({
                data: products
            })
        });
    }

    render() {
        let sidebar;
        if (this.state.wwd) {
            sidebar = <Sidebar
                wwd={this.state.wwd}
                data={this.state.data}
            />
        }

        let height = window.innerHeight;

        return (
                <Grid fluid={true}>
                    <Row className="show-grid">
                        <Col xs={6} md={2}>
                            {sidebar}
                        </Col>
                        <Col xs={12} md={10}>
                            <Map
                                onMapCreated={this.mapCreated.bind(this)}
                                height={height}
                            />
                        </Col>
                    </Row>
                </Grid>
        );
    }

    mapCreated(wwd) {
        this.setState({wwd: wwd});
    }
}

export default App;
