import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import Button from '../Button/Button';
import IconAlefLogo from '../Icon/icons/IconAlefLogo';
import Title from '../ArticleHeader/Title';
import Link from '../Link/Link';

const SpecialPromotionsStyle = ({ theme, }) => ({
  backgroundColor: theme.color('quaternary'),
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
});
const textStyle = ({ theme, }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignSelf: 'center',
  padding: '1rem',
  fontWeight: 'bold',
  //   extend: [ theme.type(-1), ],
});
const IconStyle = {
  alignSelf: 'center',
  flexShrink: '0',
};
SpecialPromotions.propTypes = {
  /**
   * An object comes from polopoly for each special promotion.
   */

  data: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string,
    urlText: PropTypes.string,
  }).isRequired,
};

function SpecialPromotions(props) {
  const SpecialData = props.data;
  return (
    <FelaComponent
      rule={SpecialPromotionsStyle}
      render={({ className, theme, }) => (
        <div className={className}>
          {/* todo: replace this with BlockLink Component */}
          <Link href={SpecialData.url}>
            <FelaComponent
              rule={textStyle}
              render={({ className, }) => (
                <div className={className}>
                  <IconAlefLogo
                    fill="quaternary"
                    size={3}
                    miscStyles={IconStyle}
                  />
                  <Title
                    text={SpecialData.title}
                    level={2}
                    fontSize={-1}
                    miscStyles={{ padding: '1rem', }}
                  />
                </div>
              )}
            />
          </Link>
          <Button variant="neutralOpaque" href={SpecialData.url}>
            {SpecialData.urlText}
          </Button>
        </div>
      )}
    />
  );
}

export default SpecialPromotions;
