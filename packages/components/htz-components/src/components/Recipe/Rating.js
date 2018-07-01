import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import IconStar from '../IconStar/IconStar';

class Rating extends Component {
  static propTypes = {
    numberOfStars: PropTypes.number,
    rating: PropTypes.number,
    newRating: PropTypes.func,
  };
  static defaultProps = {
    numberOfStars: 5,
    rating: 0,
    newRating: null,
  };
  state = {
    hoveredStar: null,
  };

  starColor = (isStarRightHalf, starNumber) => {
    if (this.state.hoveredStar) {
      return this.state.hoveredStar >= starNumber
        ? [ 'primary', ]
        : [ 'neutral', '-5', ];
    }
    if (isStarRightHalf) {
      return this.props.rating >= starNumber - 0.5
        ? [ 'primary', ]
        : [ 'neutral', '-5', ];
    }
    return this.props.rating >= starNumber ? [ 'primary', ] : [ 'neutral', '-5', ];
  };
  render() {
    const { numberOfStars, newRating, } = this.props;
    const starArr = [];
    // eslint-disable-next-line no-plusplus
    for (let starNumber = 1; starNumber < numberOfStars + 1; starNumber++) {
      starArr.push(
        <FelaComponent
          style={{
            ':hover': { outline: 'none', },
            ':focus': { outline: 'none', },
          }}
          render={({ className, }) => (
            <button
              key={`star${starNumber}`}
              className={className}
              onMouseEnter={() => {
                this.setState({ hoveredStar: starNumber, });
              }}
              onMouseLeave={() => this.setState({ hoveredStar: null, })}
              onClick={() => newRating(starNumber)}
            >
              <IconStar
                rightColor={this.starColor(true, starNumber)}
                leftColor={this.starColor(false, starNumber)}
              />
            </button>
          )}
        />
      );
    }
    return <Fragment>{starArr}</Fragment>;
  }
}

export default Rating;
