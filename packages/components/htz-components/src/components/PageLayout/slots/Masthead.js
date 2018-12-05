import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';

import Osaka from '../../Osaka/OsakaController';
import HtzLink from '../../HtzLink/HtzLink';
import IconHaaretzLogo from '../../Icon/icons/IconHaaretzLogo';
import IconMarkerLogo from '../../Icon/icons/IconMarkerLogo';
import getComponent from '../../../utils/componentFromInputTemplate';

const propTypes = {
  /**
   * Article's ID
   */
  articleId: PropTypes.string.isRequired,
  /**
   * The elements composing the page’s header.
   */
  content: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * the background color passed to the LayoutRow component.
   */
  rowBgc: PropTypes.string,
  /** should the masthead border bottom be full width */
  mastheadFullWidthBorder: PropTypes.bool.isRequired,
};

const defaultProps = {
  rowBgc: null,
};

// eslint-disable-next-line react/prop-types
const Logo = ({ host, }) => (
  <FelaComponent
    style={theme => {
      const desktopStyle = {
        backgroundColor: theme.color('neutral', '-10'),
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
      };
      return {
        marginLeft: 'auto',
        marginRight: 'auto',
        extend: [
          theme.mq({ from: 's', misc: 'portrait', }, desktopStyle),
          theme.mq({ from: 'm', misc: 'landscape', }, desktopStyle),
        ],
      };
    }}
    render={({ className, }) => (
      <HtzLink href="/" className={className}>
        {host === 'haaretz.co.il' ? (
          <IconHaaretzLogo size={4} />
        ) : host === 'theMarker.com' ? (
          <IconMarkerLogo size={4} />
        ) : null}
      </HtzLink>
    )}
  />
);

function Masthead({ content, articleId, rowBgc, mastheadFullWidthBorder, }) {
  return (
    <Fragment>
      {content
        ? content.map(element => {
          const Element = element.inputTemplate === 'com.tm.GridElementGroup'
            ? Osaka
            : getComponent(element.inputTemplate);
          return (
            <Element
              key={element.contentId}
              {...element}
              {...(element.inputTemplate === 'com.htz.EditableNavigationElement'
                ? { Logo, rowBgc, mastheadFullWidthBorder, }
                : {})}
              articleId={articleId}
            />
          );
        })
        : null}
    </Fragment>
  );
}

Masthead.propTypes = propTypes;
Masthead.defaultProps = defaultProps;

export default Masthead;
