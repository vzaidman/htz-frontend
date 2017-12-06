import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, } from 'react-fela';

FileUpload.propTypes = {
  content: PropTypes.string.isRequired,
  embedType: PropTypes.string.isRequired,
  contentName: PropTypes.string.isRequired,
};

const fileIcon = () => ({
  float: 'right',
  color: '#e22134',
  backgroundColor: 'transparent',
  border: '0',
  cursor: 'pointer',
  display: 'inline-block',
  padding: '0',
  position: 'relative',
  textAlign: 'center',
  verticalAlign: 'middle',
  height: '2.625rem',
  lineHeight: '2.625rem',
  minWidth: '2.625rem',
  fontStyle: 'normal',
  width: '1em',
  fontSize: '2.25rem',
  fontWeight: '700',
  textRendering: 'optimizeLegibility',
});

const FileIcon = createComponent(fileIcon, 'i', props => Object.keys(props));

const linkToFile = () => ({
  color: '#0895c3',
  textDecoration: 'none',
  ':hover': {
    borderBottom: '1px solid',
    paddingBottom: '.06em',
    outline: '0',
  },
});

const LinkToFile = createComponent(linkToFile, 'a', props =>
  Object.keys(props)
);

function FileUpload(props) {
  const content = props.content;
  const embedType = props.embedType;
  const contentName = props.contentName;

  const icon = embedType === 'pdf' ? '&' : '-';

  return (
    <LinkToFile href={content} target="_blank">
      <FileIcon aria-hidden="true" data-icon={icon} />
      <span>{contentName}</span>
    </LinkToFile>
  );
}

export default FileUpload;
