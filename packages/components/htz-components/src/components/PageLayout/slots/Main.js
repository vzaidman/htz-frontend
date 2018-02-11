import React from 'react';
import { createComponent, } from 'react-fela';
import { parseComponentProp, } from '@haaretz/htz-css-tools';
import getComponent from '../../../utils/componentFromInputTemplate';

const mediaQueryCallback = (prop, value) => ({ [prop]: value, });

const mainWrapper = ({ theme, }) => ({
  position: 'relative',
  backgroundColor: theme.color('neutral', '-10'),

  ...parseComponentProp(
    'paddingLeft',
    [
      { until: 'l', value: 'unset', },
      { from: 'l', value: 'calc(300px + 4rem + 4rem)', },
    ],
    theme.mq,
    mediaQueryCallback
  ),

  ...parseComponentProp(
    'marginRight',
    [
      { from: 'l', until: 'xl', value: 156/6 },
      { from: 'xl', value: 209/7 },
    ],
    theme.mq,
    mediaQueryCallback
  ),

});
const Wrapper = createComponent(mainWrapper, 'main');

const asideWrapper = ({ theme, }) => ({
  position: 'absolute',
  height: '100%',
  width: '300px',
  top: '0',
  left: '4rem',

  ...parseComponentProp(
    'display',
    [
      { until: 'l', value: 'none', },
      { from: 'l', value: 'block', },
    ],
    theme.mq,
    mediaQueryCallback
  ),
});
const AsideWrapper = createComponent(asideWrapper, 'aside');

const asideStyle = ({ theme, }) => ({
  backgroundColor: 'red',
  position: 'sticky',
  width: '100%',
  top: '12px',
});
const Aside = createComponent(asideStyle);

const extractContent = content => (
  content.map(element => {
    const Element = getComponent(element.inputTemplate);
    return <Element key={element.contentId} {...element}/>;
  })
);

function Main ({ content, }) {
  const { article, aside, } = content;
  return (
    <Wrapper>
      <article>
        {extractContent(article)}
      </article>
      <AsideWrapper>
        <Aside>
          {extractContent(aside)}
        </Aside>
      </AsideWrapper>
    </Wrapper>
  )
}

export default Main;
