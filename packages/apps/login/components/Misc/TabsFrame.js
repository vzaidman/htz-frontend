import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { HtzLink, } from '@haaretz/htz-components';
import { LoginContentStyles, } from '../StyleComponents/LoginStyleComponents';

const findRout = (route) => {
  console.log(route);
}

export default class TabsFrame extends React.Component {
  state = {
    activeTab: 0,
    isLink: [],
  };

  static propTypes = {
    activeTab: PropTypes.number,
    isLink: PropTypes.array,
  };

  static defaultProps = {
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
    this.setState({ activeTab: this.props.activeTab })
  }

  createNavButton = (child, index) => {
    return !this.state.isLink[index] ?
      (
        <span className={index === this.state.activeTab ? "on" : ""} >
          <input
            type="checkbox"
            name="tab"
            id={`tab${index}`}
            value={`tab${index}`}
            onClick={this.changeTab(index)}
          />
          <label htmlFor={`tab${index}`} tabIndex={index}>{child.props.tabname || `Tab ${index}`}</label>
        </span>
      ) : 
      (
        <HtzLink 
          href={`${findRout(this.state.isLink[index])}`}
          onClick={e => {
            e.preventDefault();
            const route = findRout(this.state.isLink[index]);
            //Router.push(route);
          }}
        >
          {child.props.tabname || `Tab ${index}`}
        </HtzLink>
      );
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
