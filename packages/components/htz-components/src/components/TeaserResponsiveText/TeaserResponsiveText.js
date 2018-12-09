// @flow

import * as React from 'react';
import { FelaComponent, } from 'react-fela';

type TextPropTypes = {
  text: ?string,
  mobileText: ?string,
};

TeaserResponsiveText.defaultProps = {
  text: null,
  mobileText: null,
};

const mobileStyle = ({ theme, }) => ({
  ...theme.mq({ from: 's', }, { display: 'none', }),
});
const aboveMobileStyle = ({ theme, }) => ({
  ...theme.mq({ until: 's', }, { display: 'none', }),
});

export default function TeaserResponsiveText({
  text,
  mobileText,
}: TextPropTypes): React.Node {
  return mobileText && text && text !== mobileText ? (
    <React.Fragment>
      <FelaComponent rule={mobileStyle} render="span">
        {mobileText}
      </FelaComponent>
      <FelaComponent rule={aboveMobileStyle} render="span">
        {text}
      </FelaComponent>
    </React.Fragment>
  ) : (
    <React.Fragment>{text || mobileText}</React.Fragment>
  );
}
