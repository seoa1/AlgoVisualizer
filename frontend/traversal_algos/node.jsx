import React from 'react';
import Draggable from 'react-draggable';

export default class Node extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deltaPosition: {
                x: 0, y: 0
            }
        }

        this.handleDrag = this.handleDrag.bind(this);
    }

    get pos() {
        return this.props.pos;
    }

    handleDrag(e, ui) {
        const {x, y} = this.state.deltaPosition;
        this.setState({
          deltaPosition: {
            x: x + ui.deltaX,
            y: y + ui.deltaY,
          }
        });
      };

    render() {
        let pos = this.props.pos;
        return (
            <Draggable onDrag={this.handleDrag} 
                positionOffset={{x: pos[0].toString()+"vw", y: ((pos[1] - 7)/1.3).toString()+"vh"}}>
                <div className="node">

                </div>
            </Draggable>
            
        )
    }
}