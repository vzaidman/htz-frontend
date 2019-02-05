/* global window */
import React from 'react';
import { FelaComponent, } from 'react-fela';
import style from './style';
import Button from '../Button/Button';
import NoSSR from '../NoSSR/NoSSR';

export default class Survey extends React.Component {
  state = {
    mode: 'hide',
  };

  render() {
    // eslint-disable-next-line react/prop-types
    if (!this.props.properties) return null;
    // // eslint-disable-next-line react/prop-types
    if (!this.props.properties.xls) return null;
    // // eslint-disable-next-line react/prop-types
    if (!this.props.properties.xls.surveys) return null;

    const xls = this.props.properties.xls;
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
        <div
          ref={el => {
            if (!this.widthChecker) {
              this.widthChecker = el;
              const mode = this.widthChecker.offsetWidth / 64 > parties.length ? 'vertical' : 'horizental';
              this.setState({ mode, });
              window.addEventListener('resize', () => {
                const mode = this.widthChecker.offsetWidth / 64 > parties.length ? 'vertical' : 'horizental';
                this.setState({ mode, });
              });
            }
          }}
        />
        <FelaComponent mode={this.state.mode} rule={style.wrapper}>
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
          <FelaComponent mode={this.state.mode} rule={style.surveyWrapper}>
            {parties.map(partie => (
              <FelaComponent
                itemsAmount={parties.length}
                mode={this.state.mode}
                rule={style.chartWrapper}
              >
                <FelaComponent mode={this.state.mode} rule={style.labalWrapper} render="label">
                  <FelaComponent mode={this.state.mode} rule={style.labal} render="label">
                    {partie}
                  </FelaComponent>
                </FelaComponent>
                <FelaComponent mode={this.state.mode} rule={style.barsWrapper}>
                  {partiesValues[partie].map((v, i) => (
                    <FelaComponent mode={this.state.mode} rule={style.barWrapper}>
                      <FelaComponent
                        mode={this.state.mode}
                        barColor={colors[i]}
                        value={v}
                        rule={style.bar}
                      />
                      <FelaComponent mode={this.state.mode} rule={style.barValue}>
                        {v}
                      </FelaComponent>
                    </FelaComponent>
                  ))}
                </FelaComponent>
              </FelaComponent>
            ))}
          </FelaComponent>
          <FelaComponent style={style.buttonWrapper}>
            <Button
              variant="primary"
              href="https://www.haaretz.co.il/EXT-INTERACTIVE-1.6826451"
              style={style.button}
            >
              לכל הסקרים
            </Button>
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
}
