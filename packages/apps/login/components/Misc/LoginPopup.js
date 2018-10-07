import React, { Fragment, Component, } from 'react';


export default class LoginPopup extends Component {
  
  state = {
    stage: 1,
    maxStages,
  }

  prevStage() {
    this.state.stage > 1 ?
      this.setState({ stage: this.state.stage--, }) :
      null;
  }

  nextStage() {
    this.state.stage < this.state.maxStages ?
      this.setState({ stage: this.state.stage++, }) :
      null;
  }

  renderChildren() {
    {React.Children.map(children, (child, i) => {
      return i === this.state.stage ? child : null;
    })}
  }

  render() {

    const { children } = this.props;

    return(

      <Fragment>
        {this.renderChildren(this.prevStage.bind(this), this.nextStage.bind(this))}
      </Fragment>

    );

  }

}