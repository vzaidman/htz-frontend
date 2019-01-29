// @flow
import * as React from 'react';
import type { Node, } from 'react';
import { FelaComponent, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';


type Props = {
  isOpen: boolean,
  data: Object,
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
    theme.mq({
      from: '0px',
      until: 'm',
    },
    {
      ...theme.type(-1),
    }),
  ],
});


export default function TableBody(props: Props): Node {
  const objectKeys: Array<string> = Object.keys(props.data[0]).filter(data => data !== 'teamId');

  const allData: Array<Object> = props.isOpen
    ? [ ...props.data, ]
    : [ ...props.data, ]
      .splice(0, 8);

  const animationCount: number = props.isOpen ? 1 : 0;

  return (
    <tbody>
      {
        allData.map((fullObject, objectIndex) => {
          const borderColor: Array<string> = (objectIndex === 7 && props.isOpen) ? [ 'gplus', '', ] : [ 'primary', '-6', ];

          return (
            <FelaComponent
              animationCount={animationCount}
              rule={AllRowsStyle}
              borderColor={borderColor}
              key={fullObject.name}
              render={({ className, }) => (
                <tr>
                  {
                  objectKeys.map((objectKey, keysIndex) => (keysIndex === 0
                    ? (
                      <td className={className} style={{ textAlign: 'right', }} key={objectKey}>
                        <span style={{ marginLeft: '4rem', }}>
                          <strong>{objectIndex + 1}</strong>
                        </span>
                        {fullObject[objectKey]}
                      </td>
                    )
                    : (
                      <td className={className} style={{ textAlign: 'center', }} key={objectKey}>
                        {fullObject[objectKey]}
                      </td>
                    ))
                  )}
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
