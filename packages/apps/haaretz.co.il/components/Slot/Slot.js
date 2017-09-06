import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { graphql, gql, } from 'react-apollo';

const StandardArticle = dynamic(import('../StandardArticle/StandardArticle'));

const propTypes = {
  /**
   * The name of the slot, e.g. `header`, `footer`, `main`.
   */
  name: PropTypes.string.isRequired,
  /**
   * An array of content element data that should be rendered in the slot.
   */
  content: PropTypes.arrayOf(
    PropTypes.shape({
      contentId: PropTypes.string.isRequired,
      contentName: PropTypes.string,
      inputTemplate: PropTypes.string,
      properties: PropTypes.object.isRequired,
    })
  ).isRequired,
};

const fragments = {
  content: gql`
    fragment SlotContent on Slot {
      name
      content {
        contentId
        contentName
        inputTemplate
        properties
      }
    }
  `,
};

function Slot(props) {
  const { name, content, } = props;
  // Placeholder output, useful for debugging.
  return (
    <div style={{ border: '1px solid #bbb', margin: 2, padding: 2, }}>
      <h2>Slot: {name}</h2>
      {content.map((element, i) => (
        <div
          // There can indeed be duplicate content elements in the returned
          // list, so we have no choice but to add an extra key identifier like
          // the index.
          // eslint-disable-next-line react/no-array-index-key
          key={`${element.contentId}:${i}`}
          style={{ border: '1px solid #ddd', margin: 2, padding: 2, }}
        >
          {element.inputTemplate === 'com.htz.StandardArticle' ? (
            <StandardArticle {...element} {...element.properties} />
          ) : (
            <dl>
              <dt>contentId</dt>
              <dd>{element.contentId}</dd>
              <dt>contentName</dt>
              <dd>{element.contentName}</dd>
              <dt>inputTemplate</dt>
              <dd>{element.inputTemplate}</dd>
              <dt>properties</dt>
              {Object.keys(element.properties)
                .sort()
                .map(key => <dd key={key}>{key}</dd>)}
            </dl>
          )}
        </div>
      ))}
    </div>
  );
}

Slot.fragments = fragments;
Slot.propTypes = propTypes;

export default Slot;
