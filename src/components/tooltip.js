import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import RenderIntoBody from './render-into-body';

class Tooltip extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: null,
            left: 0,
            top: 0
        };

        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    handleMouseEnter(e) {
        const node = findDOMNode(this)
        const rect = node.getClientRects()

        this.setState({
            isVisible: true,
            left: rect[0].left,
            top: rect[0].top
        })

        e.preventDefault()
        e.stopPropagation()
    }

    handleMouseLeave(e) {
        this.setState({
            isVisible: false
        })

        e.preventDefault()
        e.stopPropagation()
    }

    render() {
        const { children, className } = this.props


        return (
            <div
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                className={className}
            >
                {children}
                {this.state.isVisible ? (
                    <RenderIntoBody>
                        {this.renderTooltip()}
                    </RenderIntoBody>
                ) : null}
            </div>
        )
    }

    renderTooltip() {
        const { element, place, children } = this.props

        if (!children) {
            return null
        }

        const style = {
            left: this.state.left,
            top: this.state.top,
            zIndex: 30,
            display: 'block'
        }

        return (
            <div
                style={style}
                className='tooltip'
            >
                {element}
            </div>
        )
    }
}

Tooltip.propTypes = {
    element: PropTypes.element,
    place: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    children: PropTypes.node.isRequired
};

export default Tooltip;
