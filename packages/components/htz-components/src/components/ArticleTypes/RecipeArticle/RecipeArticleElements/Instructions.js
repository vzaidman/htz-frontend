import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, FelaTheme, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';
import Section from '../../../AutoLevels/Section';
import H from '../../../AutoLevels/H';
import ArticleBody from '../../../ArticleBody/ArticleBody';

const propTypes = {
  instructions: PropTypes.arrayOf(
    PropTypes.shape({
      inputTemplate: PropTypes.string,
      contentId: PropTypes.string,
      recipeInstructions: PropTypes.arrayOf(
        PropTypes.shape({
          inputTemplate: PropTypes.string,
          contentId: PropTypes.string,
          /**
           * array of elements similar to article body but only include Image, Embed and paragraph
           * Parsed by ArticleBody Component
           */
          body: PropTypes.array,
        })
      ),
    })
  ).isRequired,
};
const defaultProps = {};

function Instructions({ instructions, }) {
  return (
    <FelaTheme
      render={theme => (
        <Section>
          <FelaComponent
            style={{
              fontWeight: 'bold',
              color: theme.color('primary'),
              marginBottom: '2rem',
              maxWidth: '41rem',
              extend: [ theme.type('2'), borderBottom('2px', 1, 'solid', theme.color('primary')), ],
            }}
            render={({ className, }) => (
              <H className={className}>{theme.recipeInstructionsI18n.sectionTitle}</H>
            )}
          />
          <div>
            {instructions.map(instructionsList => (
              <Fragment key={instructionsList.contentId}>
                {instructionsList.recipeInstructions.map(instructionsBody => (
                  <ArticleBody key={instructionsBody.contentId} body={instructionsBody.body} />
                ))}
              </Fragment>
            ))}
          </div>
        </Section>
      )}
    />
  );
}

Instructions.propTypes = propTypes;
Instructions.defaultProps = defaultProps;

export default Instructions;
