import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { HtzLink, } from '@haaretz/htz-components';
import { LoginContentStyles, } from '../StyleComponents/LoginStyleComponents';

export default class TabsFrame extends React.Component {
  state = {
    activeTab: 0,
    isLink: [],
  };

  static propTypes = {
    activeTab: PropTypes.number,
    isLink: PropTypes.array,
    findRout: PropTypes.func,
    doTransition: PropTypes.func,
  };

  static defaultProps = {
    findRout: null,
    doTransition: null,
    activeTab: 1,
    isLink: [],
  };

  /* ---------- Lifecycle Methods ---------- */
  componentWillMount() {
    this.setInitTab();
  }

  /* ------------ Functionality ------------ */
  changeTab = (index) => {
    return () => {
      this.setState({ activeTab: index, });
    };
  }

  setInitTab = () => {
    this.setState({ activeTab: this.props.activeTab || 0, isLink: this.props.isLink, });
  }

  createNavButton = (child, index) => {
    return !this.state.isLink[index] ?
      (
        <span className={index === this.state.activeTab ? "on" : ""} >
          <input
            type="radio"
            name="tab"
            id={`tab${index}`}
            value={`tab${index}`}
            onClick={this.changeTab(index)}
          />
          <label htmlFor={`tab${index}`} tabIndex={index}>{child.props.tabname || `Tab ${index}`}</label>
        </span>
      ) :
      (this.props.findRout && this.props.doTransition ? (
        <HtzLink
          href={`${this.props.findRout(this.state.isLink[index])}`}
          onClick={e => {
            e.preventDefault();
            Router.push(this.props.doTransition(this.state.isLink[index]));
          }}
        >
          {child.props.tabname || `Tab ${index}`}
        </HtzLink>
      ) : null);
  }

  navClickHandler = (index) => {
    this.state.isLine[index] ?
      this.changeTab(index) :
      console.log("do router action");
  }

  /* ----------- Tabs Rendering ------------ */
  createNavigation(children) {
    const { TopLinks, } = LoginContentStyles;
    return (
      <TopLinks>
        {React.Children.map(children, (child, i) => (
          this.createNavButton(child, i)
        ))}
      </TopLinks>
    );
  }

  renderTab(children) {
    return React.Children.map(children, (child, i) => {
      if (i === this.state.activeTab) {
        return React.isValidElement(child)
          ? React.cloneElement(child, { formindex: this.props.formIndex, })
          : null;
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
