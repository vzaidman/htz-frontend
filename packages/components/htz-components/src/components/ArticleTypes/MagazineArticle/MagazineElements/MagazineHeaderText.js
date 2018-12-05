import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, FelaTheme, } from 'react-fela';

HeaderText.propTypes = {
  /** Class(es) to be added to the DOM element.
   * Can be passed by manually, or by Fela's createComponent
   */
  className: PropTypes.string,
  /** Headline (title) of an Article */
  title: PropTypes.string.isRequired,
  /** Subtitle of an Article */
  subtitle: PropTypes.string,
  /** is the magazine design variation b */
  variationB: PropTypes.bool.isRequired,
};

HeaderText.defaultProps = {
  className: null,
  subtitle: null,
};

const titleStyle = ({ theme, variationB, }) => ({
  display: 'inline',
  fontWeight: 200,
  extend: [
    theme.type(6, { untilBp: 's', }),
    theme.type(8, { fromBp: 's', untilBp: 'l', }),
    ...(variationB
      ? [
        theme.type(8, { fromBp: 'l', untilBp: 'xl', lines: 10, }),
        theme.type(10, { fromBp: 'xl', lines: 12, }),
      ]
      : [ theme.type(10, { fromBp: 'l', }), ]),
  ],
});

const subTitleStyle = ({ theme, variationB, }) => ({
  fontWeight: '700',
  marginTop: '3rem',
  marginInlineStart: 'auto',
  marginInlineEnd: 'auto',
  maxWidth: '145rem',
  extend: [
    theme.type(2, { fromBp: 's', untilBb: 'l', }),
    theme.type(1, { fromBp: 'l', }),
    theme.mq({ from: 'l', until: 'xl', }, { marginTop: '2rem', }),
  ],
});

function HeaderText({ title, subtitle, className, variationB, }) {
  return (
    <FelaTheme
      render={theme => (
        <div className={className}>
          <FelaComponent rule={titleStyle} variationB={variationB} render="h1">
            {title}
          </FelaComponent>
          {subtitle ? (
            <FelaComponent variationB={variationB} rule={subTitleStyle} render="p">
              {subtitle}
            </FelaComponent>
          ) : null}
        </div>
      )}
    />
  );
}

export default HeaderText;
