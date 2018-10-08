import React, { Fragment, Component, } from 'react';
import { createComponent, FelaTheme, } from 'react-fela';

export default class LoginPopup extends Component {
  state = {
    pageIndex: 0,
  };

  setPageIndex() {
    this.setState({ pageIndex: this.state.pageIndex + 1, });
  }

  renderChild(childrenList, pageIndex) {
    const grandChildren = childrenList;
    return React.Children.map(grandChildren.props.children, (child, i) => {
      if (i == pageIndex) return child;
    });
  }

  render() {
    // Styling:
    const popupWrapperStyle = () => ({
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.7)',
      zIndex: '100',
      color: '#fff',
    });
    const PopupWrapper = createComponent(popupWrapperStyle);

    const children = this.props.children(this.setPageIndex.bind(this));
    const PopMessage = () => this.renderChild(children, this.state.pageIndex);

    return (
      <Fragment>
        <PopupWrapper>
          <PopMessage />
        </PopupWrapper>
      </Fragment>
    );
  }
}
