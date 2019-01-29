// @flow
import React from 'react';
import { FelaComponent, } from 'react-fela';
import { borderBottom, createMqFunc, } from '@haaretz/htz-css-tools';

import type { Node, } from 'react';


// Media Query
// noinspection JSDuplicatedDeclaration
const mq: (Object, Object) => Object = createMqFunc();


type Props = {
  isOpen: ?boolean,
  leagueData: Array<Object>,
}


const AllRowsStyle: Object => Object = ({ theme, minWidth, animationCount, borderColor, }) => ({
  animationIterationCount: animationCount,
  animationDuration: '1.5s',
  animationName: {
    from: { opacity: '0', },
    to: { opacity: '1', },
  },
  minWidth,
  padding: '2rem 1rem',
  color: theme.color('neutral'),
  extend: [
    borderBottom({
      width: '2px',
      lines: 1,
      style: 'solid',
      color: theme.color(borderColor[0], borderColor[1]),
    }),
    theme.type(-1),
  ],
  ...mq({
    from: '0px',
    until: 'm',
  },
  {
    extend: [
      theme.type(-1),
    ],
  }),
});


export default function TableBody(props: Props): Node {
  // Filtering data - creating array of leagues (team = name)
  const finalData: Array<Object> = [ ...props.leagueData, ].map(e => {
    const temp: Object = { ...e, };
    temp.team = temp.team.name;
    temp.remain = `${temp.goalsAgainst}-${temp.goalsFor}`;
    delete temp.goalsFor;
    delete temp.goalsAgainst;
    return temp;
  });


  // Every object keys
  const objectKeys: Array<string> = Object.keys([ ...finalData, ][0]);

  // Changing data by open state
  const allData: Array<Object> = props.isOpen
    ? [ ...finalData, ]
    : [ ...finalData, ].splice(0, 6);

  const animationCount: number = props.isOpen ? 1 : 0;


  return (
    <tbody>
      {
        allData.map((fullObject, objectIndex) => {
          let borderColor: Array<string>;

          if (objectIndex === 5 && props.isOpen) {
            borderColor = [ 'button', 'positiveBorder', ];
          }
          else if (objectIndex === 11) {
            borderColor = [ 'gplus', '', ];
          }
          else {
            borderColor = [ 'primary', '-6', ];
          }
          return (
            <FelaComponent
              animationCount={animationCount}
              rule={AllRowsStyle}
              borderColor={borderColor}
              key={fullObject.name}
              render={({ className, }) => (
                <tr>
                  {
                  objectKeys.map((objectKey, keysIndex) => {
                    let td;

                    switch (keysIndex) {
                      case 0:
                        td = (
                          <td className={className} style={{ textAlign: 'right', }} key={objectKey}>
                            <span style={{ marginLeft: '1rem', }}>
                              <strong>{fullObject.position}</strong>
                            </span>
                            {fullObject.team}
                          </td>
                        );
                        break;
                      case 2:
                        td = (
                          <td className={className} style={{ textAlign: 'center', }} key={objectKey}>
                            {fullObject.playedGames}
                          </td>
                        );
                        break;
                      case 3:
                        td = (
                          <td className={className} style={{ textAlign: 'center', }} key={objectKey}>
                            {fullObject.won}
                          </td>
                        );
                        break;
                      case 4:
                        td = (
                          <td className={className} style={{ textAlign: 'center', }} key={objectKey}>
                            {fullObject.lost}
                          </td>
                        );
                        break;
                      case 5:
                        td = (
                          <td className={className} style={{ textAlign: 'center', }} key={objectKey}>
                            {fullObject.draw}
                          </td>
                        );
                        break;
                      case 6:
                        td = (
                          <td className={className} style={{ textAlign: 'center', }} key={objectKey}>
                            {fullObject.remain}
                          </td>
                        );
                        break;
                      case 7:
                        td = (
                          <td className={className} style={{ textAlign: 'center', }} key={objectKey}>
                            {fullObject.points}
                          </td>
                        );
                        break;

                      default:
                        td = null;
                    }
                    return td;
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
