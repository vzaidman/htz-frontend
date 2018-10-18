import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { LoginContentStyles, } from '../StyleComponents/LoginStyleComponents';

export default class TabsFrame extends React.Component {
  state = {
    activeTab: 0,
  };

  static propTypes = {
    activeTab: PropTypes.number,
  };

  static defaultProps = {
    activeTab: 1,
  };

  /* ---------- Lifecycle Methods ---------- */
  componentWillMount() {
    this.setInitTab();
  }

  /* ------------ Functionality ------------ */
  changeTab(index) {
    return () => {
      this.setState({ activeTab: index, });
    };
  }

  setInitTab() {
    this.setState({ activeTab: this.props.activeTab })
  }

  /* ----------- Tabs Rendering ------------ */
  createNavigation(children) {
    const { TopLinks, } = LoginContentStyles;
    return (
      <TopLinks>
        {React.Children.map(children, (child, i) => (
          <span className={i === this.state.activeTab ? "on" : ""} >
            <input
              type="radio"
              name="tab"
              id={`tab${i}`}
              value={`tab${i}`}
              onClick={this.changeTab(i)}
            />
            <label htmlFor={`tab${i}`} tabindex={i}>{child.props.tabname || `Tab ${i}`}</label>
          </span>
        ))}
      </TopLinks>
    );
  }

  renderTab(children) {
    return React.Children.map(children, (child, i) => {
      if (i == this.state.activeTab) {
        return React.isValidElement(child) ? child : null;
      }
      return null;
    });
  }

  /* --------------- Render ---------------- */
  render() {
    const { children, } = this.props;
    const Tab = () => this.renderTab(children);
    const Nav = () => this.createNavigation(children);

    return (
      <Fragment>
        <Nav />
        <Tab />
      </Fragment>
    );
  }
}
