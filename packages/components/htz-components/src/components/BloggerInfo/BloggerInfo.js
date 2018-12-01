import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { borderVertical, } from '@haaretz/htz-css-tools';
import Image from '../Image/Image';
import Paragraph from '../Paragraph/Paragraph';

const bloggerInfoWrapper = theme => ({
  display: 'flex',
  flexDirection: 'column',
  extend: [
    borderVertical({ width: 2, lines: 4, style: 'solid', color: theme.color('primary', 'base'), }),
  ],
});

const bloggerBasicRow = theme => ({
  display: 'flex',
  alignItems: 'center',
  extend: [
    theme.mq(
      { until: 's', },
      {
        justifyContent: 'center',
        flexWrap: 'wrap',
      }
    ),
  ],
});

const bloggerImageWrapper = theme => ({
  extend: [ theme.mq({ until: 's', }, { flex: '100%', textAlign: 'center', }), ],
});

const bloggerImage = {
  width: [
    { until: 'xl', value: '12rem', },
    { from: 'xl', value: '8rem', },
  ],
  height: [
    { until: 'xl', value: '12rem', },
    { from: 'xl', value: '8rem', },
  ],
  borderRadius: '50%',
  overflow: 'hidden',
  display: [ { until: 's', value: 'inline-block', }, { from: 'l', value: 'block', }, ],
  paddingBottom: '0',
  marginInlineEnd: '2rem',
};

const imgOption = {
  transforms: {
    width: '106',
    aspect: 'square',
  },
};

const bloggerName = theme => ({
  color: theme.color('primary', 'base'),
  fontWeight: 'bold',
  extend: [
    theme.type(1, { untilBp: 'xl', }),
    theme.type(0, { fromBp: 'xl', }),
  ],
});

const bloggerNickName = theme => ({
  color: theme.color('primary', 'base'),
  extend: [
    theme.type(1, { untilBp: 'xl', }),
    theme.type(0, { fromBp: 'xl', }),
  ],
});

const bloggerInfoText = theme => ({
  marginTop: '2rem',
  extend: [ theme.type(-1), theme.mq({ from: 's', }), ],
});

function BloggerInfo({ author, blogName, }) {
  return (
    <FelaComponent style={bloggerInfoWrapper}>
      <FelaComponent style={bloggerBasicRow}>
        <FelaComponent style={bloggerImageWrapper}>
          <Image
            attrs={{ id: 'bloggerImage', }}
            data={author.image}
            imgOptions={imgOption}
            miscStyles={bloggerImage}
          />
        </FelaComponent>
        <FelaComponent style={bloggerName} render="span">
          {author.contentName}
        </FelaComponent>

        <FelaComponent render="span" style={bloggerNickName}>
          &nbsp;|
          {' '}
          {blogName}
        </FelaComponent>
      </FelaComponent>
      <FelaComponent style={bloggerInfoText}>
        {
          author.biography.map((p, i) => (
            <Paragraph
              {...p}
              miscStyles={{
                marginBottom: i === author.biography.length - 1
                  ? 0
                  : [
                    { from: 'xl', value: 2, },
                  ],
                type: [
                  { until: 'xl', value: 0, },
                  { from: 'xl', value: -1, },
                ],
              }}
            />
          ))
        }
      </FelaComponent>
    </FelaComponent>
  );
}

BloggerInfo.propTypes = {
  author: PropTypes.shape({
    contentName: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  blogName: PropTypes.string.isRequired,
};

export default BloggerInfo;
