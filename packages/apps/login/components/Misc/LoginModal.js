import React, { Fragment, Component, } from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';

export default class LoginModal extends Component {
  state = {
    isOpen: this.props.isOpen,
    pageIndex: -1,
    pageIndexCap: -1,
  };

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.func.isRequired,
  };

  setEventListener() {
    window.addEventListener('LoginModal', function () {
      this.setState({ isOpen: true, });
    });
  }

  /* ------- Lifecycle Methods -------- */
  componentDidMount() {
    const grandChildrenList = this.props.children(this.setPageIndex.bind(this)).props.children;
    this.setPageIndexCap(grandChildrenList);
    this.setInitialIndex(grandChildrenList);
    this.setEventListener();
  }

  /* ----- Check & Render Methods ----- */
  setPageIndex() {
    return this.state.pageIndex < this.state.pageIndexCap
      ? this.setState({ pageIndex: this.state.pageIndex + 1, })
      : null;
  }

  getGrandchildrenSize(grandChildren) {
    return React.Children.count(grandChildren);
  }

  setPageIndexCap(grandChildren) {
    const indexCap = this.getGrandchildrenSize(grandChildren);
    this.setState({ pageIndexCap: indexCap - 1, });
  }

  setInitialIndex(grandChildren) {
    return grandChildren ? this.setState({ pageIndex: 0, }) : null;
  }

  renderChild(childrenList, pageIndex) {
    const grandChildren = childrenList.props.children;
    return this.state.pageIndexCap > -1
      ? React.Children.map(grandChildren, (child, i) => {
        if (i == pageIndex) return child;
      })
      : null;
  }

  /* ------ Functionality Methods ----- */
  closePopup() {
    this.setState({ pageIndex: -10, });
    return this.state.pageIndex;
  }

  /* ---------- Misc Methods ---------- */
  getStyles() {
    const popupWrapperStyle = () => ({
      display: 'flex',
      alignItems: 'center',
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.7)',
      zIndex: '100',
    });
    const popupContentStyle = () => ({
      width: '450px',
      margin: '0 auto',
      textAlign: 'center',
      backgroundColor: '#ffffff',
      border: 'solid 1px #acd2ed',
    });

    return {
      PopupWrapper: createComponent(popupWrapperStyle),
      PopupContent: createComponent(popupContentStyle),
    };
  }

  render() {
    // Styling:
    const { PopupWrapper, PopupContent, } = this.getStyles();

    // Children:
    const children = this.props.children(this.setPageIndex.bind(this), this.closePopup.bind(this));

    // Child to display:
    const PopMessage = () => this.renderChild(children, this.state.pageIndex);

    return this.props.isOpen && this.state.pageIndex > -1 ? (
      <Fragment>
        <PopupWrapper>
          <PopupContent>
            <PopMessage />
          </PopupContent>
        </PopupWrapper>
      </Fragment>
    ) : null;
  }
}
