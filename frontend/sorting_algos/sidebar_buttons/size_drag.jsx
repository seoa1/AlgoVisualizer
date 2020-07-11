import React from 'react';
import Draggable from 'react-draggable';

export default class SizeDrag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deltaPos: {
                x: 0, 
                y: 0
            }
        }
        this.handle_drag = this.handle_drag.bind(this);
    }

    handle_drag(e, ui) {
        const {x, y} = this.state.deltaPos;
        const init_x = x;
        this.setState({
            deltaPos: {
                x: x + ui.deltaX,
                y: y + ui.deltaY
            }
        })
        if(this.state.deltaPos.x != init_x) {
            this.props.setsize( (this.state.deltaPos.x + 60)/3 | 0);
        }
    }

    render() {
        return (
            <div>
                <div className="sizedrag">
                    Size {(this.state.deltaPos.x + 60)/3 | 0}
                    <Draggable bounds="parent" 
                        onDrag={this.handle_drag} 
                        axis="x">
                        <div className="dragcircle"></div>
                    </Draggable>
                </div>
                
            </div>
        )
    }
}

