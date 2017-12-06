import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';

// Todo: work on up and down vote functions
// Todo: change icons to svgs and redo styling

const propTypes = {
  plusRate: PropTypes.number,
  minusRate: PropTypes.number,
  /** general style of component Container, insert a regular css in js object */
  styleObj: PropTypes.shape({}),
};

const defaultProps = {
  plusRate: 0,
  minusRate: 0,
  styleObj: {},
};

const containerStyle = ({ styleObj, }) => ({
  ...styleObj,
});

const Container = createComponent(containerStyle);

const counterStyle = ({ theme, }) => ({
  color: theme.color('neutral', '-3'),
  verticalAlign: 'center',
  marginRight: '1rem',
  extend: [ theme.type(-2), ],
});

const Counter = createComponent(counterStyle, 'span');

const likeIconStyle = ({ theme, }) => ({
  cursor: 'pointer',
});

const LikeIcon = createComponent(likeIconStyle, 'span', [ 'onClick', ]);

const innerContainerStyle = ({ theme, }) => ({
  display: 'inline-block',
  alignItems: 'center',
  marginRight: '2rem',
});

const InnerContainer = createComponent(innerContainerStyle, 'div', [ 'onClick', ]);

function Likes(props) {
  return (
    <Container styleObj={props.styleObj}>
      <InnerContainer>
        <LikeIcon
          onClick={() => {
            console.log('testing upVote');
          }}
        >
          {/* need to change acorrding to eslint rules when changing the html element to the actual like icon */}
          <span role="img" aria-label="like Icon">
            &#9757;
          </span>
        </LikeIcon>
        <Counter>{props.plusRate}</Counter>
      </InnerContainer>
      <InnerContainer>
        <LikeIcon
          onClick={() => {
            console.log('testing downVote');
          }}
        >
          <span role="img" aria-label="like Icon">
            &#9759;
          </span>
        </LikeIcon>
        <Counter>{props.minusRate}</Counter>
      </InnerContainer>
    </Container>
  );
}

Likes.propTypes = propTypes;

Likes.defaultProps = defaultProps;

export default Likes;
