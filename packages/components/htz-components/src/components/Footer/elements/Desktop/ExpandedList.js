import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, FelaComponent, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';
import HtzLink from '../../../HtzLink/HtzLink';
import Grid from '../../../Grid/Grid';
import GridItem from '../../../Grid/GridItem';
import H from '../../../AutoLevels/H';
import { ColumnTypes, PairTypes, } from './DesktopElementPropTypes';
import Section from '../../../AutoLevels/Section';

const extendedListContainerStyle = ({
  theme: {
    color,
    footerBorderStyle: { borderWidth, lines, borderStyle, },
  },
  showMe,
}) => ({
  display: showMe ? 'flex' : 'none',
  backgroundColor: color('footer', 'bg'),
  alignItems: 'baseline',
  paddingBottom: '3rem',
  marginBottom: '2rem',
  ...borderBottom(borderWidth, 0, borderStyle, color('footer', 'border')),
});

const ExtendedFooterContainer = createComponent(extendedListContainerStyle);

const listUlStyle = ({ theme, }) => ({
  ...theme.mq({ from: 'xl', }, { marginInlineEnd: '8rem', }),
  marginBottom: '2rem',
});

const StyledSection = createComponent(listUlStyle, Section);

const titleLiStyle = ({ theme, }) => ({
  marginBottom: '1rem',
  fontWeight: 'bold',
});

const StyledUlTitle = createComponent(titleLiStyle, H);

const listLinkStyle = ({ theme, isLast, isBold = false, }) => ({
  marginBottom: '1rem',
  ...(isBold ? { fontWeight: 'bold', } : {}),
});

const StyledListLink = createComponent(listLinkStyle, HtzLink, [
  'content',
  'href',
  'focus',
]);

ExpandedList.propTypes = {
  /** Footer's array of columns data */
  columnsArr: PropTypes.arrayOf(ColumnTypes).isRequired,
  /** Indicates display mode */
  showMe: PropTypes.bool.isRequired,
  /** Footer's toolbox data */
  toolbox: PairTypes.isRequired,
};

function ExpandedList({ columnsArr, toolbox, showMe, }) {
  return (
    <ExtendedFooterContainer showMe={showMe}>
      <Grid>
        <GridItem
          width={[
            { from: 'm', until: 'l', value: 2 / 3, },
            { from: 'l', until: 'xl', value: 4 / 5, },
            { from: 'xl', value: 5 / 6, },
          ]}
          miscStyles={{ type: -1, }}
        >
          <Grid>
            {columnsArr.map((lists, colIdx) => (
              <GridItem
                width={[
                  { from: 'm', until: 'l', value: 1 / 2, },
                  { from: 'l', until: 'xl', value: 1 / 4, },
                  { from: 'xl', value: 1 / 5, },
                ]}
                // eslint-disable-next-line  react/no-array-index-key
                key={colIdx}
              >
                {lists.map((innerList, listIdx) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <StyledSection key={listIdx}>
                    <StyledUlTitle>{innerList.contentName}</StyledUlTitle>
                    <ul>
                      {innerList.rows.map((link, linkIdx) => (
                        <FelaComponent
                          style={{ marginBottom: '1rem', }}
                          render="li"
                          key={`${link.contentName}${link.value}`}
                        >
                          <StyledListLink
                            content={link.contentName}
                            href={link.value}
                          />
                        </FelaComponent>
                      ))}
                    </ul>
                  </StyledSection>
                ))}
              </GridItem>
            ))}
          </Grid>
        </GridItem>
        <GridItem
          width={[
            { from: 'm', until: 'l', value: 1 / 3, },
            { from: 'l', until: 'xl', value: 1 / 5, },
            { from: 'xl', value: 1 / 6, },
          ]}
        >
          {toolbox ? (
            <ul>
              {toolbox.map(link => (
                <FelaComponent
                  style={{ marginBottom: '1rem', }}
                  render="li"
                  key={`${link.text}${link.value}`}
                >
                  <StyledListLink
                    content={link.contentName}
                    href={link.value}
                    isBold
                  />
                </FelaComponent>
              ))}
            </ul>
          ) : null}
        </GridItem>
      </Grid>
    </ExtendedFooterContainer>
  );
}

export default ExpandedList;
