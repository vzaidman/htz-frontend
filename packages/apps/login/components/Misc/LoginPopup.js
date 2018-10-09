import React, { Fragment, Component, } from 'react';
import { createComponent, FelaTheme, } from 'react-fela';

export default class LoginPopup extends Component {
  state = {
    pageIndex: 0,
  };

  setPageIndex() {
    this.setState({ pageIndex: this.state.pageIndex + 1, });
    return this.state.pageIndex;
  }

  renderChild(childrenList, pageIndex) {
    const grandChildren = childrenList;
    return React.Children.map(grandChildren.props.children, (child, i) => {
      if (i == pageIndex) return child;
    });
  }

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
    }
  }

  render() {
    // Styling:
    const { PopupWrapper, PopupContent }  = this.getStyles();

    // Children:
    const children = this.props.children(this.setPageIndex.bind(this));

    // Child to display:
    const PopMessage = () => this.renderChild(children, this.state.pageIndex);

    return (
      <Fragment>
        <PopupWrapper>
          <PopupContent>
            <PopMessage />
          </PopupContent>
        </PopupWrapper>
      </Fragment>
    );
  }
}
