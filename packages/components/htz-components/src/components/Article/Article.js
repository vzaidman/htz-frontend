import React, { Fragment, } from 'react';
import { createComponent, withTheme, } from 'react-fela';
import PropTypes from 'prop-types';
import { parseComponentProp, } from '@haaretz/htz-css-tools';
import ArticleBody from '../ArticleBody/ArticleBody';
import ArticleHeader from '../ArticleHeader/ArticleHeader';
import HeadlineElement from '../HeadlineElement/HeadlineElement';

const propTypes = {
  articleType: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.object).isRequired,
  body: PropTypes.arrayOf(
    PropTypes.oneOfType([ PropTypes.string, PropTypes.object, ])
  ).isRequired,
  exclusive: PropTypes.string,
  modDate: PropTypes.number,
  pubDate: PropTypes.number.isRequired,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const defaultProps = {
  exclusive: null,
  modDate: null,
};

const wrapperStyle = () => ({
  display: 'flex',
});
const ArticleWrapper = createComponent(wrapperStyle, 'article');

const contentStyle = ({ theme, }) => ({
  ...parseComponentProp(
    'width',
    theme.articleStyle.article.width,
    theme.mq,
    (prop, value) => ({ [prop]: value, })
  ),
});
const ArticleContent = createComponent(contentStyle);

const asideStyle = ({ theme, }) => ({
  width: '30rem',
  backgroundColor: theme.color('primary', '-6'),
});
const ArticleAside = createComponent(asideStyle, 'aside');

const breadCrumbsStyle = () => ({
  marginTop: '2rem',
  marginBottom: '3rem',
});
const BreadCrumbs = createComponent(breadCrumbsStyle);

const headerStyle = () => ({
  marginStart: '4rem',
  marginBottom: '3rem',
});
const Header = createComponent(headerStyle, ArticleHeader, props =>
  Object.keys(props)
);

const sharingToolsStyle = () => ({
  marginBottom: '2rem',
});
const SharingTools = createComponent(sharingToolsStyle);

class Article extends React.Component {
  state = {
    headlineElement: null,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.headlineElement !== nextState.headlineElement;
  }

  setHeadlineElement = elementObj =>
    this.setState({
      headlineElement: elementObj,
    });

  render() {
    const {
      articleType, // eslint-disable-line no-unused-vars
      authors,
      body,
      exclusive,
      modDate, // eslint-disable-line no-unused-vars
      pubDate,
      subtitle,
      title,
      theme,
    } = this.props;
    return (
      <Fragment>
        <ArticleWrapper>
          <ArticleAside />
          <ArticleContent>
            <BreadCrumbs>BreadCrumbs Here</BreadCrumbs>
            <Header
              author={authors[0]}
              kicker={exclusive}
              publishDateTime={pubDate}
              subtitle={subtitle}
              title={title}
            />
            <SharingTools>SharingTools Here</SharingTools>
            {this.state.headlineElement && (
              <HeadlineElement elementObj={this.state.headlineElement} />
            )}
            <ArticleBody
              body={body}
              miscStyles={{
                ...theme.mq(
                  { until: 'm', },
                  {
                    marginStart: '2rem',
                    marginEnd: '2rem',
                  }
                ),
                ...theme.mq(
                  { from: 'm', until: 'l', },
                  {
                    marginStart: '10rem',
                    marginEnd: '10rem',
                  }
                ),
                ...theme.mq(
                  { from: 'l', },
                  {
                    marginStart: '4rem',
                  }
                ),
              }}
              setHeadlineElement={this.setHeadlineElement}
            />
          </ArticleContent>
        </ArticleWrapper>
      </Fragment>
    );
  }
}

Article.propTypes = propTypes;
Article.defaultProps = defaultProps;

export default withTheme(Article);
