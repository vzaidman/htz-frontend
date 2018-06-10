import React from 'react';
// import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';

const propTypes = {};
const defaultProps = {};

const ingredientLists = [
  {
    ingredients: [
      '2 כפות שמן זית',
      '2sfasfן זית',
      '2 כפותasfasfן זית',
      '2 כפוasf זית',
      '2 כפוasfasfמן זית',
      '2 כפוasfafמן זית',
    ],
  },
  {
    header: 'לבצק',
    ingredients: [
      '2 כפות שמן זית',
      '2sfasfן זית',
      '2 כפותasfasfן זית',
      '2 כפוasf זית',
      '2 כפוasfasfמן זית',
      '2 כפוasfafמן זית',
    ],
  },
];
function Ingredients() {
  return (
    <FelaComponent
      render={({ theme, }) => (
        <div>
          <FelaComponent
            style={{
              fontWeight: 'bold',
              color: theme.color('primary'),
              marginBottom: '2rem',
              maxWidth: '41rem',
              extend: [
                theme.type('2'),
                borderBottom('2px', 1, 'solid', theme.color('primary')),
              ],
            }}
            render="h3"
          >
            רכיבים
          </FelaComponent>
          <div>
            {ingredientLists.map(list => (
              <div>
                {list.header && (
                  <FelaComponent
                    style={{
                      fontWeight: 'bold',
                      marginTop: '1rem',
                      marginBottom: '1rem',
                    }}
                    render="h4"
                  >
                    {list.header}
                  </FelaComponent>
                )}
                <ul>
                  {list.ingredients.map(ingredient => (
                    <FelaComponent
                      style={{
                        listStyleType: 'disc',
                        listStylePosition: 'inside',
                        extend: [ theme.type(-2), ],
                      }}
                      render="li"
                    >
                      <FelaComponent
                        style={{
                          marginInlineStart: '-1rem',
                          extend: [ theme.type(0), ],
                        }}
                        render="span"
                      >
                        {ingredient}
                      </FelaComponent>
                    </FelaComponent>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    />
  );
}

Ingredients.propTypes = propTypes;
Ingredients.defaultProps = defaultProps;

export default Ingredients;
