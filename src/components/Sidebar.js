import React, {Component} from 'react';
import Select from 'react-select';

import Colors from './settings/Colors';
import WorldWind from '@nasaworldwind/worldwind';

import 'react-select/dist/react-select.css';

import {ControlLabel, FormControl} from 'react-bootstrap';
import RadiantCircleTile from "../map/RadiantCircleTile";
import RadiantSquareTile from '../map/RadiantSquareTile';

class Sidebar extends Component {
    constructor(props){
        super(props);

        this.state = {
            incrementPerIntensity: 0.025,
            shapeToVisualize: 'circle-radient',
            blur: 10,
            radius: 1,
            colors: ['#0000ff','#00ffff', '#00ff00', '#ffff00', '#ff0000']
        };

        this.layer = null;
    }

    rebuildHeatMap() {
        let tile = WorldWind.ColoredSquareTile;
        if(this.state.shapeToVisualize === 'circle') {
            tile = WorldWind.ColoredTile;
        } else if(this.state.shapeToVisualize === 'circle-radient') {
            tile = RadiantCircleTile;
        } else if(this.state.shapeToVisualize === 'square-radient') {
            tile = RadiantSquareTile;
        }

        return new WorldWind.HeatMapLayer("HeatMap, Default version", this.props.data, {
            tile: tile,
            incrementPerIntensity: this.state.incrementPerIntensity,
            blur: this.state.blur,
            scale: this.state.colors
        })
    }

    calculatePointRadius(sector, tileWidth, tileHeight) {
        let latitude = Math.ceil(Math.abs(sector.maxLatitude - sector.minLatitude));
        if(latitude < 1) {
            return tileHeight;
        } else {
            return this.state.radius * Math.round(tileHeight / latitude); // Make sure that the result is the whole numbers
        }
    }

    onIncrementChange(e) {
        this.setState({
            incrementPerIntensity: e.target.value
        });
    }

    onColorsChange(colors){
        this.setState({
            colors: colors
        });
    }

    onShapeChange(shape) {
        this.setState({
            shapeToVisualize: shape.value
        });
    }

    onRadiusChange(e) {
        this.setState({
            radius: e.target.value
        });
    }

    onBlurChange(e) {
        this.setState({
            blur: e.target.value
        });
    }

    render() {
        if(this.layer) {
            this.props.wwd.removeLayer(this.layer);
            this.props.wwd.redraw();
        }

        setTimeout(() => {
            this.layer = this.rebuildHeatMap();
            this.props.wwd.addLayer(this.layer);
        }, 1);

        return (
            <div className="sidebar">
                <h2>HeatMap</h2>
                <div>
                    In this example it is possible to play with the parameters about HeatMap.
                </div>
                <ControlLabel>Colors</ControlLabel>
                <Colors
                    onChange={this.onColorsChange.bind(this)}
                    colors={this.state.colors}
                />
                <ControlLabel>Increment per intensity</ControlLabel>
                <FormControl
                    type="number"
                    onChange={this.onIncrementChange.bind(this)}
                    value={this.state.incrementPerIntensity}
                />
                <ControlLabel>Shape to visualize</ControlLabel>
                <Select
                    name="form-field-shape"
                    onChange={this.onShapeChange.bind(this)}
                    value={this.state.shapeToVisualize}
                    options={[
                        {value: 'square-radient', label: 'Square radient'},
                        {value: 'circle-radient', label: 'Circle radient'},
                        {value: 'square', label: 'Square'},
                        {value: 'circle', label: 'Circle'}
                    ]}
                />
                <ControlLabel>Radius ratio</ControlLabel>
                <FormControl
                    type="number"
                    onChange={this.onRadiusChange.bind(this)}
                    value={this.state.radius}
                />
                <ControlLabel>Blur Size in pixels</ControlLabel>
                <FormControl
                    type="number"
                    onChange={this.onBlurChange.bind(this)}
                    value={this.state.blur}
                />
            </div>
        );
    }
}

export default Sidebar;