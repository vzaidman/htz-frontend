// @flow
import * as React from 'react';
import type { Node, } from 'react';
import { borderBottom, } from '@haaretz/htz-css-tools';
import { FelaComponent, } from 'react-fela';


type BodyProps = {
  tableData: Array<Object>,
  isOpen: ?boolean,
  borders: ?Object,
}
Body.defaultProps = {
  isOpen: false,
  borders: null,
};

const AllRowsStyle: Object => Object = ({ theme, animationCount, borderColor, }) => ({
  animationIterationCount: animationCount,
  animationDuration: '1.5s',
  animationName: {
    from: { opacity: '0', },
    to: { opacity: '1', },
  },
  color: theme.color('neutral'),
  extend: [
    borderBottom({
      width: '1px',
      lines: 1,
      style: 'solid',
      color: theme.color(borderColor[0], borderColor[1]),
    }),
    theme.type(-1),

  ],
});

const FirstRowStyle: Object => Object = ({ theme, textAlign, }) => ({
  textAlign,
  paddingBlockStart: '1.5rem',
  paddingBlockEnd: '1.5rem',
  fontWeight: '500',
  minWidth: '20rem',
  extend: [
    theme.mq({ until: 's', }, {
      minWidth: '2rem',
      paddingBlockStart: '2rem',
      paddingBlockEnd: '2rem',
    }),
  ],
});


function Body(props: BodyProps): Node {
  const { tableData, isOpen, borders, } = props;
  const animationCount: number = isOpen ? 1 : 0;
  const defaultBorder = [ 'primary', '-6', ];

  return (
    <tbody>
      {
        tableData.map(
          (team, index) => {
            const teamFixed: Object = { ...team, };

            if (team.position) {
              teamFixed.name = `${team.position}&${team.name}`;
              delete teamFixed.position;
            }
            else {
              teamFixed.name = `${index + 1}&${team.name}`;
            }
            return (
              <FelaComponent
                key={team.teamId}
                animationCount={animationCount}
                borderColor={
                  isOpen
                    ? (borders && borders[`${index}`] ? borders[`${index}`] : defaultBorder)
                    : defaultBorder
                }
                rule={AllRowsStyle}
                render={({ className, }) => (
                  <tr className={className}>
                    {
              Object.entries(teamFixed)
                .map(([ key, value, ]) => {
                  // eslint-disable-next-line no-underscore-dangle
                  const current: ?Node = (value === team.__typename || key === 'teamId') ? null
                    : (value === teamFixed.name)
                      ? (
                        <FelaComponent
                          key={team.teamId + key}
                          textAlign="right"
                          rule={FirstRowStyle}
                          render={({ className: innerClassName, }) => {
                            const [ teamPosition, teamName, ] = String(value).split('&');
                            return (
                              <th
                                className={innerClassName}
                              >
                                <strong>{teamPosition}</strong>
                                {'  '}
                                {teamName}
                              </th>
                            );
                          }}
                        />
                      )
                      : (
                        <td key={team.teamId + key}>
                          {String(value)}
                        </td>
                      );
                  return current;
                })
            }
                  </tr>
                )}
              />
            );
          }
        )
    }
    </tbody>
  );
}

export default Body;
