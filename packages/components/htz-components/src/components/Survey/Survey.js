import React from 'react';
import { FelaComponent, } from 'react-fela';
import style from './style';
import NoSSR from '../NoSSR/NoSSR';

export default function Survey(props) {
  // eslint-disable-next-line react/prop-types
  const xls = props.properties.xls;
  const partiesValues = {};
  let parties;
  const colors = [ [ 'primary', ], [ 'quaternary', '+2', ], [ 'primary', '-3', ], [ 'black', ], ];

  const { comment, legend, ...data } = xls.surveys ? xls.surveys[0] : xls.survey;
  if (xls.surveys) {
    parties = Object.keys(data);
    // eslint-disable-next-line array-callback-return
    parties.map(v => {
      partiesValues[v] = [];
    });

    // eslint-disable-next-line array-callback-return
    xls.surveys.map(item => {
      parties.map(v => partiesValues[v].push(parseInt(item[v], 10)));
    });
  }

  // window.parties = parties;
  // window.partiesValues = partiesValues;
  parties.sort(
    (a, b) => partiesValues[b][0] + partiesValues[b][1] - (partiesValues[a][0] + partiesValues[a][1])
  );

  return (
    <NoSSR>
      <FelaComponent itemsAmount={parties.length} rule={style.wrapper}>
        <FelaComponent style={style.legendsWrapper}>
          {xls.surveys.map((v, i) => (
            <FelaComponent style={style.legend}>
              <FelaComponent color={colors[i]} rule={style.legendcolor} render="span" />
              <FelaComponent style={style.legendLabel} render="span">
                {v.legend}
              </FelaComponent>
            </FelaComponent>
          ))}
        </FelaComponent>
        <FelaComponent itemsAmount={parties.length} rule={style.surveyWrapper}>
          {parties.map(partie => (
            <FelaComponent itemsAmount={parties.length} rule={style.chartWrapper}>
              <FelaComponent itemsAmount={parties.length} rule={style.labalWrapper} render="label">
                <FelaComponent itemsAmount={parties.length} rule={style.labal} render="label">
                  {partie}
                </FelaComponent>
              </FelaComponent>
              <FelaComponent itemsAmount={parties.length} rule={style.barsWrapper}>
                {partiesValues[partie].map((v, i) => (
                  <FelaComponent itemsAmount={parties.length} rule={style.barWrapper}>
                    <FelaComponent
                      itemsAmount={parties.length}
                      barColor={colors[i]}
                      value={v}
                      rule={style.bar}
                    />
                    <FelaComponent itemsAmount={parties.length} rule={style.barValue}>
                      {v}
                    </FelaComponent>
                  </FelaComponent>
                ))}
              </FelaComponent>
            </FelaComponent>
          ))}
        </FelaComponent>
        <FelaComponent style={style.comment}>
          <div
            dangerouslySetInnerHTML={{
              __html: comment.replace('*', '<br>*'),
            }}
          />
        </FelaComponent>
      </FelaComponent>
    </NoSSR>
  );
}
