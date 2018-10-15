import React, { Fragment, Component, } from 'react';
import PropTypes from 'prop-types';
import { LoginDialog, } from '../StyleComponents/LoginStyleComponents';

export default class LoginModal extends Component {
  state = {
    show: this.props.show,
    stageIndex: 0,
    stagesCap: 1,
  };

  static propTypes = {
    /**
     * show: determines whether the popup will be randered
     */
    show: PropTypes.bool,

    /**
     * handleClose: a function, should set the value passed to this modal's show prop to false
     */
    handleClose: PropTypes.func.isRequired,
  }

  static defaultProps = {
    show: false,
  }

  /* ------ Methods ----- */
  getStage = () => {
    const allStages = React.Children.toArray(this.props.children(this.nextStage, this.hideModal).props.children);
    return allStages[this.state.stageIndex];
  };

  nextStage = () => {
    this.setState({ stageIndex: this.state.stageIndex + 1 });
  };

  getStagesCount = () => {
    return React.Children.count(this.props.children().props.children);
  }

  setStageCap = () => {
    this.setState({ stagesCap: this.getStagesCount() });
  }

  hideModal = () => {
    this.props.handleClose();
  };

  /* ------- Render ----- */
  render() {
    const { DialogWrapper, DialogContent, } = LoginDialog;
    const Stage = () => this.getStage();

    return this.props.show ? (
      <Fragment>
        <DialogWrapper>
          <DialogContent>
            <Stage></Stage>
          </DialogContent>
        </DialogWrapper>
      </Fragment>
    ) : null;
  }
}
