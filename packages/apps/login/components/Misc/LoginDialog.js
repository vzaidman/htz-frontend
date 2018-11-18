import React, { Fragment, Component, } from 'react';
import PropTypes from 'prop-types';
import { LoginDialogBox, } from '../StyleComponents/LoginStyleComponents';

export default class LoginDialog extends Component {
  state = {
    stageIndex: 0, // current stage (grand-child) to display
    stagesCap: 1, // max stages
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
  };

  static defaultProps = {
    show: false,
  };

  /* ------ Methods ----- */
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  /** - returns all grand children passed to the component */
  getAllStages = () =>
    React.Children.toArray(
      this.props.children(this.nextStage, this.hideDialog, this.getCloseButton).props.children
    );

  /** - return the grand child that should be displayd (according to state stageIndex) */
  getStage = () => {
    const allStages = this.getAllStages();
    return allStages[this.state.stageIndex];
  };

  /** - increase the stageIndex state in order to display the next grand child */
  nextStage = () => {
    this.setState({ stageIndex: this.state.stageIndex + 1, });
  };

  /** - set the stageIndex to 0. used thwn closing the dialog */
  resetStages = () => {
    this.setState({ stageIndex: 0, });
  };

  /** - returns grand children cound */
  getStagesCount = () => React.Children.count(this.props.children().props.children);

  /** - set max stages */
  setStageCap = () => {
    this.setState({ stagesCap: this.getStagesCount(), });
  };

  /** - handles hiding the dialog */
  hideDialog = () => {
    this.resetStages();
    this.props.handleClose();
  };

  /** - handle keyboard interaction */
  handleKeyPress = event => {
    if (this.props.show) {
      if (event.key == 'Escape') {
        return this.hideDialog();
      }
    }
  };

  /** - create and return the close button layout */
  getCloseButton = () => (
    <LoginDialogBox.CloseButton>
      <button onClick={this.hideDialog} />
    </LoginDialogBox.CloseButton>
  );

  /* ------- Render ----- */
  render() {
    const { DialogWrapper, DialogContent, CloseButton, } = LoginDialogBox;
    const Stage = () => this.getStage();

    return this.props.show ? (
      <Fragment>
        <DialogWrapper onKeyPress={this.handleKeyPress}>
          <DialogContent>
            <Stage />
          </DialogContent>
        </DialogWrapper>
      </Fragment>
    ) : null;
  }
}
