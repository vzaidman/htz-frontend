import React from 'react';
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
});
const StyledExpandedLists = createComponent(expandedListStyle);

const listUlStyle = ({ theme, }) => ({
  marginInlineEnd: '8rem',
  paddingTop: '3rem',
  paddingBottom: '3rem',
});

const StyledLinkUl = createComponent(listUlStyle, 'ul');

const titleLiStyle = ({ theme, }) => ({
  fontWeight: 'bold',
});

const StyledTitleLi = createComponent(titleLiStyle, 'li');

const listLinkStyle = ({ theme, isLast, isBold = false, }) => ({
  ...(isBold ? { fontWeight: 'bold', } : {}),
  extend: [ theme.type(-1), ],
});

const StyledListLink = createComponent(listLinkStyle, Link, [ 'content', 'href', 'ref', ]);

const toolboxListStyle = () => ({
  minWidth: '20rem',
});

const StyledToolboxList = createComponent(toolboxListStyle, StyledLinkUl);

ExpandedList.propTypes = {
  /** Footer's array of columns data */
  columnsArr: PropTypes.arrayOf(ColumnTypes).isRequired,
  /** Indicates display mode */
  showMe: PropTypes.bool.isRequired,
  /** Footer's toolbox data */
  toolbox: PairTypes.isRequired,
};
// eslint-disable-next-line react/prop-types
function ExpandedList({ columnsArr, toolbox, showMe, theme, }) {
  return (
    // <StyledExpandedListsCont showMe={showMe}>
    <LayoutExtendedFooterContainer
      bgc={theme.color('footer', 'bg')}
      miscStyles={Object.assign(
        { display: showMe ? 'flex' : 'none', },
        // todo : check how to pass borderBottom to LayoutContainer
        { borderBottom: borderBottom('1px', '2', 'solid', 'white'), },
        extendedListContainerStyle
      )}
    >
      <StyledExpandedLists>
        {columnsArr.map((lists, colIdx) => (
          // eslint-disable-next-line react/no-array-index-key
          <StyledLinkUl key={colIdx}>
            {lists.map((innerList, listIdx) => (
              <div key={`${innerList.title}`}>
                <StyledTitleLi>{innerList.title}</StyledTitleLi>
                {innerList.items.map((link, linkIdx) => (
                  <li key={`${link.text}${link.href}`}>
                    <StyledListLink
                      content={link.text}
                      href={link.href}
                      // {...(colIdx === 0 && listIdx === 0
                      //   ? {
                      //     ref: firstLiEl => {
                      //       this.firstLiEl = firstLiEl;
                      //     },
                      //   }
                      //   : {})}
                    />
                  </li>
                ))}
              </div>
            ))}
          </StyledLinkUl>
        ))}
      </StyledExpandedLists>
      <StyledToolboxList>
        {toolbox.map(link => (
          <li key={`${link.text}${link.href}`}>
            <StyledListLink content={link.text} href={link.href} isBold />
          </li>
        ))}
      </StyledToolboxList>
    </LayoutExtendedFooterContainer>
  );
}

export default withTheme(ExpandedList);
