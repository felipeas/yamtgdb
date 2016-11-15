import { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

class RenderIntoBody extends Component {
    componentDidMount() {
        this.container = document.createElement('div');
        document.body.appendChild(this.container);
        this.renderIntoBody();
    }

    componentDidUpdate() {
        this.renderIntoBody();
    }

    componentWillUnmount() {
        ReactDOM.unmountComponentAtNode(this.container);
        document.body.removeChild(this.container);
    }

    renderIntoBody() {
        ReactDOM.render(this.props.children, this.container);
    }

    render() {
        return null;
    }
}

RenderIntoBody.propTypes = {
    children: PropTypes.node.isRequired
};

export default RenderIntoBody;
