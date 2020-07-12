import React from 'react';

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

    handleDrag = (e, ui) => {
        const {x, y} = this.state.deltaPosition;
        this.setState({
          deltaPosition: {
            x: x + ui.deltaX,
            y: y + ui.deltaY,
          }
        });
      };

    render() {
        return (
            <Draggable onDrag={this.handleDrag}>
                <div className="node">

                </div>
            </Draggable>
            
        )
    }
}