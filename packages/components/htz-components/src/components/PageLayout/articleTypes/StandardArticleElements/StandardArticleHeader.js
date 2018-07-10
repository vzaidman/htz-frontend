/* global fetch, Headers */
import React from 'react';
import { FelaComponent, } from 'react-fela';
import PropTypes from 'prop-types';

import HeaderText from '../../../ArticleHeader/HeaderText';
import ArticleHeaderMeta from '../../../ArticleHeader/ArticleHeaderMeta';
import ActionButtons from '../../../ActionButtons/ActionButtons';
import HeadlineElement from '../../../HeadlineElement/HeadlineElement';
import Breadcrumbs from '../../../Breadcrumbs/Breadcrumbs';

Header.propTypes = {
  /**
   * An array of Article's authors.
   */
  authors: PropTypes.arrayOf(
    PropTypes.oneOfType([ PropTypes.string, PropTypes.object, ])
  ).isRequired,
  articleId: PropTypes.string.isRequired,
  elementName: PropTypes.string.isRequired,
  elementUrl: PropTypes.string.isRequired,
  hasBreadCrumbs: PropTypes.bool.isRequired,
  exclusive: PropTypes.string.isRequired,
  /**
   * The publishing date of the article
   */
  publishDate: PropTypes.instanceOf(Date).isRequired,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  elementObj: PropTypes.shape({}).isRequired,
  facebookCount: PropTypes.number,
  reportingFrom: PropTypes.string.isRequired,
};
Header.defaultProps = {
  facebookCount: 0,
};

function Header({
  articleId,
  hasBreadCrumbs,
  elementName,
  elementUrl,
  authors,
  exclusive,
  publishDate,
  subtitle,
  title,
  elementObj,
  facebookCount,
  reportingFrom,
}) {
  return (
    <FelaComponent
      style={theme => ({
        textAlign: 'start',
        paddingTop: '3rem',
        extend: [
          theme.mq(
            { until: 'm', },
            { display: 'flex', flexDirection: 'column', }
          ),
        ],
      })}
      render={({ className, theme, }) => (
        <header className={className}>
          {hasBreadCrumbs && (
            <FelaComponent
              style={{
                paddingInlineStart: '2rem',
                extend: [
                  theme.mq({ from: 'xl', }, { paddingInlineStart: '3rem', }),
                  theme.mq({ until: 's', }, { order: 1, marginTop: '1rem', }),
                ],
              }}
              render={({ className, }) => (
                <Breadcrumbs articleId={articleId} className={className} />
              )}
            />
          )}
          <FelaComponent
            style={{
              marginTop: '3rem',
              paddingInlineStart: '2rem',
              extend: [
                theme.mq({ from: 'xl', }, { paddingInlineStart: '3rem', }),
                theme.mq({ until: 'l', }, { paddingInlineEnd: '2rem', }),
                theme.mq({ until: 's', }, { order: 2, }),
              ],
            }}
            render={({ className, }) => (
              <HeaderText
                className={className}
                kicker={exclusive}
                subtitle={subtitle}
                title={title}
              />
            )}
          />
          <ArticleHeaderMeta
            authors={authors}
            publishDate={publishDate}
            reportingFrom={reportingFrom}
            miscStyles={{
              marginTop: [
                { until: 's', value: '3rem', },
                { from: 's', until: 'l', value: '2rem', },
              ],
              marginInlineStart: '2rem',
              marginInlineEnd: '2rem',
              display: [
                { until: 'l', value: 'flex', },
                { from: 'l', value: 'none', },
              ],
              order: [ { until: 's', value: 3, }, ],
            }}
          />

          <ActionButtons
            miscStyles={{
              marginTop: '3rem',
              marginInlineStart: [
                { until: 'xl', value: '2rem', },
                { from: 'xl', value: '3rem', },
              ],
              marginInlineEnd: [ { until: 'l', value: '2rem', }, ],
              display: [ { until: 's', value: 'none', }, ],
            }}
            elementName={elementName}
            elementUrl={elementUrl}
            buttons={{
              start: [
                {
                  name: 'facebookLogo',
                  buttonText: facebookCount,
                  iconStyles: {
                    color: theme.color('facebook'),
                  },
                },
                {
                  name: 'whatsapp',
                  iconStyles: {
                    color: theme.color('whatsapp'),
                  },
                },
                'mailAlert',
              ],
              end: [
                {
                  name: 'comments',
                  buttonText: 78,
                },
                'print',
                {
                  name: 'zen',
                  buttonText: 'קריאת זן',
                },
              ],
            }}
            globalButtonsStyles={{
              minWidth: '10rem',
            }}
            globalIconsStyles={{
              color: theme.color('primary'),
            }}
            size={2.5}
          />

          <HeadlineElement
            elementObj={elementObj}
            miscStyles={{
              marginTop: '2rem',
            }}
          />
        </header>
      )}
    />
  );
}

export default Header;
