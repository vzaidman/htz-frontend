import React, { Fragment, Component, } from 'react';
import PropTypes from 'prop-types';
import { LoginDialogBox, } from '../StyleComponents/LoginStyleComponents';

export default class LoginDialog extends Component {
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
    const allStages = React.Children.toArray(this.props.children(this.nextStage, this.hideModal, this.getCloseButton).props.children);
    return allStages[this.state.stageIndex];
  };

  nextStage = () => {
    this.setState({ stageIndex: this.state.stageIndex + 1, });
  };

  resetStages = () => {
    this.setState({ stageIndex: 0 });
  }

  getStagesCount = () => React.Children.count(this.props.children().props.children)

  setStageCap = () => {
    this.setState({ stagesCap: this.getStagesCount(), });
  };

  hideModal = () => {
    this.resetStages();
    this.props.handleClose();
  };

  getCloseButton = () => {
    return (
      <LoginDialogBox.CloseButton>
        <button onClick={this.hideModal}>X</button>
      </LoginDialogBox.CloseButton>
    )
  }

  /* ------- Render ----- */
  render() {
    const { DialogWrapper, DialogContent, CloseButton } = LoginDialogBox;
    const Stage = () => this.getStage();

    return this.props.show ? (
      <Fragment>
        <DialogWrapper>
          <DialogContent>
            <Stage />
          </DialogContent>
        </DialogWrapper>
      </Fragment>
    ) : null;
  }
}
