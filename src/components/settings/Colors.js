import React, {Component} from 'react';

import {Button, FormControl} from 'react-bootstrap';

class Colors extends Component {
    onColorChange(index, e){
        let colors = this.props.colors.slice();
        colors[index] = e.target.value;

        this.props.onChange(colors);
    }

    onColorRemove(index) {
        let colors = this.props.colors.slice();
        colors.splice(index, 1);

        this.props.onChange(colors);
    }

    onColorAdd() {
        let colors = this.props.colors.slice();
        colors.push(['#000000']);

        this.props.onChange(colors);
    }

    render() {
        return (
            <div>
            {
                this.props.colors.map((color, index) => {
                    return (
                        <div key={index}>
                            <FormControl type="color" onChange={this.onColorChange.bind(this, index)} value={color}/>
                            <Button onClick={this.onColorRemove.bind(this, index)}>Remove</Button>
                        </div>
                    )
                })
            }
                <Button onClick={this.onColorAdd.bind(this)}>Add</Button>
            </div>
        );
    }
}

export default Colors;