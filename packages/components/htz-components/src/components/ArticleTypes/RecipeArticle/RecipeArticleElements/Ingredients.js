import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';
import Section from '../../../AutoLevels/Section';
import H from '../../../AutoLevels/H';

const propTypes = {
  ingredientLists: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string,
      ingredients: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
};
const defaultProps = {};

function Ingredients({ ingredientLists, }) {
  return (
    <FelaComponent
      style={theme => ({
        marginTop: '4rem',
        maxWidth: theme.articleStyle.body.maxWidth,
        marginRight: 'auto',
        marginLeft: 'auto',
      })}
      render={({ theme, className, }) => (
        <Section className={className}>
          <FelaComponent
            style={{
              fontWeight: 'bold',
              color: theme.color('primary'),
              marginBottom: '3rem',
              maxWidth: '41rem',
              extend: [ theme.type('2'), borderBottom('2px', 1, 'solid', theme.color('primary')), ],
            }}
            render={({ className, }) => (
              <H className={className}>{theme.recipeIngredientsI18n.sectionTitle}</H>
            )}
          />
          <Section>
            {ingredientLists.map((list, idx) => (
              <FelaComponent
                style={{ marginTop: idx !== 0 ? '2rem' : 0, }}
                key={list.header || list.ingredients[0]}
              >
                {list.header ? (
                  <FelaComponent
                    style={{
                      fontWeight: 'bold',
                      marginTop: '1rem',
                      marginBottom: '1rem',
                    }}
                    render={({ className, }) => <H>{list.header}</H>}
                  />
                ) : null}
                <FelaComponent style={{ paddingInlineStart: '1rem', }} render="ul">
                  {list.ingredients.map(ingredient => (
                    <FelaComponent
                      key={ingredient}
                      style={{
                        paddingInlineStart: '1em',
                        ':before': {
                          marginInlineStart: '-1em',
                          marginInlineEnd: '0.5em',
                          transform: 'translateY(-50%)',
                          display: 'inline-block',
                          content: '""',
                          borderRadius: '50%',
                          height: '1rem',
                          width: '1rem',
                          backgroundColor: theme.color('neutral', '-3'),
                        },
                        extend: [ theme.type(-2), ],
                      }}
                      render="li"
                    >
                      <FelaComponent
                        style={{
                          extend: [ theme.type(0), ],
                        }}
                        render="span"
                      >
                        {ingredient}
                      </FelaComponent>
                    </FelaComponent>
                  ))}
                </FelaComponent>
              </FelaComponent>
            ))}
          </Section>
        </Section>
      )}
    />
  );
}

Ingredients.propTypes = propTypes;
Ingredients.defaultProps = defaultProps;

export default Ingredients;
