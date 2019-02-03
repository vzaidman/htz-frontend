import React, { Fragment, } from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import MobileNavigationMenu from './MobileNavigationMenu/MobileNavigationMenu';
import ApolloConsumer from '../ApolloBoundary/ApolloConsumer';
import ArticleActionButtons from './MobileMenuFooter/MobileBarActionButtons/ArticleActionButtons';
import HomePageActionButtons from './MobileMenuFooter/MobileBarActionButtons/HomePageActionButtons';

const GET_PAGE_TYPE = gql`
  query GetPageType {
    pageType @client
  }
`;

export default class MobileNavigationMain extends React.Component {
  static propTypes = {
    contentId: PropTypes.string.isRequired,
    shouldDisplay: PropTypes.bool.isRequired,
  };

  state = { menuIsOpen: false, };

  toggleMenu = () => {
    this.setState(prevState => ({
      menuIsOpen: !prevState.menuIsOpen,
    }));
  };

  render() {
    const { contentId, shouldDisplay, } = this.props;
    const { menuIsOpen, } = this.state;

    return (
      <ApolloConsumer>
        {client => {
          const { pageType, } = client.readQuery({
            query: GET_PAGE_TYPE,
          });

          const isHomepage = pageType === 'homepage';

          return (
            <FelaComponent
              style={theme => ({
                display: 'flex',
                height: '9rem',
                ...(menuIsOpen
                  ? { backgroundColor: theme.color('secondary', 'base'), }
                  : { backgroundColor: theme.color('neutral', '-10'), }),
                borderTopColor: theme.color('secondary', '+1'),
                borderTopStyle: 'solid',
                borderTopWidth: '1px',
              })}
              render={({ className, }) => (
                <Fragment>
                  <div className={className}>
                    <MobileNavigationMenu
                      isHomepage={isHomepage}
                      contentId={contentId}
                      menuIsOpen={menuIsOpen && shouldDisplay}
                      onClick={this.toggleMenu}
                      wrapperSetState={newState => this.setState(newState)}
                    />
                    {menuIsOpen ? null : isHomepage ? (
                      <HomePageActionButtons />
                    ) : (
                      <ArticleActionButtons shouldMainNavBarDisplay={shouldDisplay} />
                    )}
                  </div>
                </Fragment>
              )}
            />
          );
        }}
      </ApolloConsumer>
    );
  }
}
