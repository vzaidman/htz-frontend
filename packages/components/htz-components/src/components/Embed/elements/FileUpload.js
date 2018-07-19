/* *************************************************************** *
 * This element accepts these inputTemplates:
  [
    com.polobase.fileUpload,
  ]
 * This element does not emits an onLoad event
 * *************************************************************** */

import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import HtzLink from '../../HtzLink/HtzLink';
import IconPdf from '../../Icon/icons/IconPdf';
import IconDrive from '../../Icon/icons/IconDrive';

// eslint-disable-next-line react/prop-types
const LinkToFile = ({ href, target, children, }) => (
  <FelaComponent
    style={{
      color: '#0895c3',
      textDecoration: 'none',
      ':hover': {
        borderBottom: '1px solid',
        paddingBottom: '.06em',
        outline: '0',
      },
    }}
    render={({ className, }) => (
      <HtzLink className={className} href={href} target={target}>
        {children}
      </HtzLink>
    )}
  />
);

class FileUpload extends React.Component {
  componentDidMount() {
    // This component doesn't have an onLoad event,
    // so we run this function as the component is mounted.
    this.props.onLoadCallback();
  }

  render() {
    const { source, embedType, contentName, } = this.props;
    const Icon = embedType === 'pdf' ? IconPdf : IconDrive;

    return (
      <LinkToFile href={source} target="_blank">
        <Icon size={4} />
        <span>{contentName}</span>
      </LinkToFile>
    );
  }
}

FileUpload.propTypes = {
  /**
   * Contains the file's URL.
   */
  source: PropTypes.string.isRequired,
  /**
   * File's type.
   */
  embedType: PropTypes.string.isRequired,
  /**
   * File's description.
   */
  contentName: PropTypes.string.isRequired,
  /**
   * A function to be called when the audio element finishes to load.
   */
  onLoadCallback: PropTypes.func,
};

FileUpload.defaultProps = {
  onLoadCallback: null,
};

export default FileUpload;
