import React from 'react';
import { createComponent, } from 'react-fela';
import { parseComponentProp, } from '@haaretz/htz-css-tools';
import getComponent from '../../../utils/componentFromInputTemplate';

const mediaQueryCallback = (prop, value) => ({ [prop]: value, });

const mainWrapper = ({ theme, }) => ({
  position: 'relative',
  backgroundColor: theme.color('neutral', '-10'),
  paddingLeft: 'calc(300px + 4rem + 4rem)',

  ...parseComponentProp(
    'marginRight',
    [
      { from: 'l', until: 'xl', value: 156/6 },
      { from: 'xl', value: 209/7 },
    ],
    theme.mq,
    mediaQueryCallback
  ),

})
const Wrapper = createComponent(mainWrapper, 'main');

const asideWrapper = () => ({
  position: 'absolute',
  height: '100%',
  width: '300px',
  top: '0',
  left: '4rem',
})
const AsideWrapper = createComponent(asideWrapper, 'aside');

const asideStyle = ({ theme, }) => ({
  position: 'sticky',
  width: '100%',
  top: '12px',
})
const Aside = createComponent(asideStyle);

function Main ({ content, }) {
  const { article, aside, } = content;
  return (
    <Wrapper>
      <article>
        {article.map(element => {
            const Element = getComponent(element.inputTemplate);
            return <Element key={element.contentId} {...element}/>;
        })}
      </article>
      <AsideWrapper>
        <Aside>
          {aside.map(element => {
            const Element = getComponent(element.inputTemplate);
            return <Element key={element.contentId} {...element}/>;
          })}
        </Aside>
      </AsideWrapper>
    </Wrapper>
  )
}

export default Main;
