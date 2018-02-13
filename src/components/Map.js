import React, { Component } from 'react';
import WorldWind from '@nasaworldwind/worldwind';

/**
 * This component displays Web World Wind in the application. In order to decide what will the map look like and what
 * should be displayed on top of that it is possible to work with the wwd inside of the componentDidMount, where the
 * Web World Wind instance is also created.
 *
 * The props can contain function onMapCreated. This method is called when Web World Wind instance is created and receive
 * the instance of Web World Wind as the only parameter. It is called only once.
 */
class Map extends Component {
    constructor(props){
        super(props);
        this.state = {
            wwdCreated: false
        };
    }

    /**
     * In this method we create the Web World Wind component itself and store it in the state for the later usage.
     */
    componentDidMount(){
        if(!this.state.wwd) {
            let wwd = new WorldWind.WorldWindow("wwd-results");
            this.setState({wwd: wwd});

            let mapLayer = new WorldWind.BMNGLandsatLayer();

            wwd.addLayer(mapLayer);
            wwd.redraw();

            if(this.props.onMapCreated && typeof this.props.onMapCreated === "function") {
                this.props.onMapCreated(wwd);
            }
        }
    }

    render(){
        return (
            <canvas id="wwd-results" />
        )
    }
}

export default Map;