import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { HtzLink, } from '@haaretz/htz-components';
import { sendTrackingEvents, } from '../../util/trackingEventsUtil';
import { LoginContentStylesThemed, } from '../StyleComponents/LoginStyleComponentsByTheme';

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
    host: PropTypes.string.isRequired,
  };

  static defaultProps = {
    findRout: null,
    doTransition: null,
    activeTab: 1,
    isLink: [],
    host: "haaretz.co.il",
  };

  /* ---------- Lifecycle Methods ---------- */
  componentWillMount() {
    this.setInitTab();
  }

  /* ------------ Functionality ------------ */
  changeTab = (index, flow, eventsTrackers, label) => {
    return () => {
      sendTrackingEvents(eventsTrackers, { page: 'How to login?', flowNumber: flow, label: label, })(() => {
          this.setState({ activeTab: index, });
        }
      );
    };
  }

  keyPressHandler = (index, childProps, event) => {
    if (event.key == 'ArrowRight' || event.key == 'ArrowLeft') {
      this.changeTab(index, childProps.flow, childProps.eventsTrackers, childProps.label)();
    }
  }

  setInitTab = () => {
    this.setState({ activeTab: this.props.activeTab || 0, isLink: this.props.isLink, });
  }

  createNavButton = (child, index) => {
    return !this.state.isLink[index] ?
      (
        <span className={index === this.state.activeTab ? "on" : ""} tabIndex="-1" >
          <label htmlFor={`tab${index}`} tabIndex="-1">
            {child.props.tabname || `Tab ${index}`}
            <input
              type="radio"
              name="tab"
              id={`tab${index}`}
              value={`tab${index}`}
              onClick={this.changeTab(index, child.props.flow, child.props.eventsTrackers, child.props.label)}
              onKeyDown={this.keyPressHandler.bind(this, index, child.props)}
              tabIndex={index === this.state.activeTab ? -1 : 1}
            />
          </label>
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
    const { TopLinks, } = LoginContentStylesThemed(this.props.host);
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
