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
    style={theme => ({
      color: theme.color('link'),
      textDecoration: 'none',
      ':hover': {
        color: theme.color('link'),
        borderBottom: '1px solid',
        paddingBottom: '.06em',
        outline: '0',
      },
    })}
    render={({ className, }) => (
      <HtzLink className={className} href={href} target={target}>
        {children}
      </HtzLink>
    )}
  />
);

function FileUpload({ source, embedType, contentName, }) {
  const Icon = embedType === 'pdf' ? IconPdf : IconDrive;

  return (
    <LinkToFile href={source} target="_blank">
      <Icon size={5.5} />
      <FelaComponent style={{ marginStart: '1rem', }} render="span">
        {contentName}
      </FelaComponent>
    </LinkToFile>
  );
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
};

export default FileUpload;
