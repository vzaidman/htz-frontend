import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { createComponent, withTheme, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';
import Link from '../../../Link/Link';
import { ColumnTypes, PairTypes, } from './DesktopElementPropTypes';
import LayoutExtendedFooterContainer from '../../../PageLayout/LayoutContainer';

const extendedListContainerStyle = {
  justifyContent: 'space-between',
  paddingBottom: '6rem',
  marginBottom: '2rem',
};

const expandedListStyle = ({ theme, }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  alignItems: 'baseline',
  tabindex: '-1',
});
const StyledExpandedLists = createComponent(expandedListStyle);

const listUlStyle = ({ theme, }) => ({
  marginInlineEnd: '8rem',
});

const StyledSection = createComponent(listUlStyle, 'section');

const titleLiStyle = ({ theme, }) => ({
  fontWeight: 'bold',
});

const StyledUlTitle = createComponent(titleLiStyle, 'h4');

const listLinkStyle = ({ theme, isLast, isBold = false, }) => ({
  ...(isBold ? { fontWeight: 'bold', } : {}),
  extend: [ theme.type(-1), ],
});

const StyledListLink = createComponent(listLinkStyle, Link, [
  'content',
  'href',
  'focus',
]);

const toolboxListStyle = () => ({
  minWidth: '20rem',
});

const StyledToolboxList = createComponent(toolboxListStyle, StyledSection);

ExpandedList.propTypes = {
  /** Footer's array of columns data */
  columnsArr: PropTypes.arrayOf(ColumnTypes).isRequired,
  /** Indicates display mode */
  showMe: PropTypes.bool.isRequired,
  /** Footer's toolbox data */
  toolbox: PairTypes.isRequired,
  theme: PropTypes.shape({
    /**
     * Customized object defined in htz-theme.
     * No nested border properties for flexablity and reusability
     * */
    footerBorderStyle: PropTypes.object.isRequired,
    color: PropTypes.func.isRequired,
  }).isRequired,
};

function ExpandedList({
  columnsArr,
  toolbox,
  showMe,
  theme: { color, footerBorderStyle: { borderWidth, lines, borderStyle, }, },
}) {
  return (
    <LayoutExtendedFooterContainer
      bgc={color('footer', 'bg')}
      miscStyles={{
        ...extendedListContainerStyle,
        ...{ display: showMe ? 'flex' : 'none', },
        ...borderBottom(borderWidth, 0, borderStyle, color('footer', 'border')),
      }}
      attrs={{ ...(showMe ? { focus: 'true', } : {}), }}
    >
      <StyledExpandedLists>
        {columnsArr.map((lists, colIdx) => (
          // eslint-disable-next-line react/no-array-index-key
          <StyledSection key={colIdx}>
            {lists.map((innerList, listIdx) => (
              // eslint-disable-next-line react/no-array-index-key
              <Fragment key={listIdx}>
                <StyledUlTitle>{innerList.title}</StyledUlTitle>
                <ul>
                  {innerList.items.map((link, linkIdx) => (
                    <li key={`${link.text}${link.href}`}>
                      <StyledListLink content={link.text} href={link.href} />
                    </li>
                  ))}
                </ul>
              </Fragment>
            ))}
          </StyledSection>
        ))}
      </StyledExpandedLists>
      <StyledToolboxList>
        {toolbox.map(link => (
          <ul key={link.text}>
            <li key={`${link.text}${link.href}`}>
              <StyledListLink content={link.text} href={link.href} isBold />
            </li>
          </ul>
        ))}
      </StyledToolboxList>
    </LayoutExtendedFooterContainer>
  );
}

export default withTheme(ExpandedList);
