import React, {Component} from 'react';
import Select from 'react-select';

import Colors from './settings/Colors';
import WorldWind from '@nasaworldwind/worldwind';

import 'react-select/dist/react-select.css';

import {ControlLabel, FormControl} from 'react-bootstrap';

class Sidebar extends Component {
    constructor(props){
        super(props);

        this.state = {
            incrementPerIntensity: 0.025,
            shapeToVisualize: 'square',
            colors: ['#0000ff','#00ffff', '#00ff00', '#ffff00', '#ff0000']
        };

        this.layer = null;
    }

    rebuildHeatMap() {
        let tile = WorldWind.ColoredSquareTile;
        if(this.state.shapeToVisualize === 'circle') {
            tile = WorldWind.ColoredTile;
        }

        return new WorldWind.HeatMapLayer("HeatMap, Default version", this.props.data, {
            radius: Sidebar.calculatePointRadius,
            tile: tile,
            incrementPerIntensity: this.state.incrementPerIntensity,
            scale: this.state.colors
        })
    }

    static calculatePointRadius(sector, tileWidth, tileHeight) {
        let latitude = Math.ceil(Math.abs(sector.maxLatitude - sector.minLatitude));
        if(latitude < 1) {
            return tileHeight;
        } else {
            return Math.round(tileHeight / latitude); // Make sure that the result is the whole numbers
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

    render() {
        if(this.layer) {
            this.props.wwd.removeLayer(this.layer);
        }

        this.layer = this.rebuildHeatMap();
        this.props.wwd.addLayer(this.layer);
        this.props.wwd.redraw();

        return (
            <div>
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
                        {value: 'square', label: 'Square'},
                        {value: 'circle', label: 'Circle'}
                    ]}
                />
            </div>
        );
    }
}

export default Sidebar;