/* globals OBR */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { createComponent, FelaComponent, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';
import ListItem from '../../elements/ListItem';

const wrapperStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  maxWidth: `${300 / 7}rem`,
};

const titleStyle = ({ theme, }) => ({
  ...theme.type(1),
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  fontWeight: '700',
  color: theme.color('primary'),
  ...borderBottom('2px', 1, 'solid', theme.color('primary')),
  marginBottom: '2rem',
});
const Title = createComponent(titleStyle);

const outbrainStyle = ({ outbrain, theme, }) => ({
  ...theme.type(-3),
  fontWeight: '300',
  color: theme.color('neutral', '-3'),
  marginBottom: '0.25rem',
  marginStart: '1rem',
  marginTop: '1rem',
  position: 'relative',
  paddingStart: '3rem',
  ':after': {
    background:
      'url(//widgets.outbrain.com/images/widgetIcons/ob_logo_16x16.png) no-repeat center top',
    backgroundSize: '100% 200%',
    content: '""',
    height: '2.3rem',
    position: 'absolute',
    right: '0',
    bottom: '55%',
    transform: 'translateY(50%)',
    width: '2.3rem',
  },
  ':hover': {
    color: theme.color('neutral'),
    textDecoration: 'underline',
    lineSkip: 'ink',
    ':after': {
      backgroundPosition: 'center bottom',
    },
  },
});
const Outbrain = createComponent(outbrainStyle, 'a');

const itemStyle = ({ theme, }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: `${143 / 7}rem`,
  marginBottom: '3rem',
  ':nth-of-type(odd)': {
    marginEnd: '2rem',
  },
});
const Item = createComponent(itemStyle, 'a', [ 'href', ]);

const itemImageStyle = () => ({
  flexShrink: '0',
  marginBottom: '1rem',
});
const ItemImage = createComponent(itemImageStyle);

const itemTitleStyle = ({ theme, }) => ({
  ...theme.type(-1),
  fontWeight: '700',
});
const ItemTitle = createComponent(itemTitleStyle, 'p');

const itemSourceStyle = ({ theme, }) => ({
  ...theme.type(-2),
  color: theme.color('tertiary'),
  fontWeight: '700',
  marginBottom: '1rem',
});
const ItemSource = createComponent(itemSourceStyle, 'p');

// eslint-disable-next-line react/prop-types
const Fry = ({ data, }) => {
  if (data.loading) {
    return <div>loading ...</div>;
  }
  if (data.error) {
    return <h1>ERROR</h1>;
  }
  return (
    <FelaComponent
      style={wrapperStyle}
      render={({ className, theme, }) => (
        <div className={className}>
          <Title>
            {theme.fryListI18n.title}
            <Outbrain
              href="#"
              onMouseDown={event => {
                // eslint-disable-next-line no-param-reassign
                event && event.cancelBubble && (event.cancelBubble = true);
                event && event.stopPropagation && event.stopPropagation();
                return true;
              }}
              onClick={() => {
                OBR.extern.callWhatIs(
                  'https://www.outbrain.com/what-is/default/he',
                  '',
                  -1,
                  -1,
                  true,
                  null
                );
                return false;
              }}
            >
              <span>Recommended by</span>
            </Outbrain>
          </Title>
          {data.list.items.map(item => (
            <ListItem>
              <Item href={item.path}>
                <ItemImage>
                  <img src={item.thumbnail.url} width="143px" alt="" />
                </ItemImage>
                <ItemTitle>{item.content}</ItemTitle>
                <ItemSource>{item.source_display_name}</ItemSource>
              </Item>
            </ListItem>
          ))}
        </div>
      )}
    />
  );
};

export default Fry;
