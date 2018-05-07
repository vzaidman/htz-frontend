import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { Image, } from '@haaretz/htz-components';

CampaignHeader.propTypes = {
  campaignData: PropTypes.shape({}).isRequired,
};

CampaignHeader.defaultProps = {};

function CampaignHeader({ campaignData, }) {
  return (
    <div>
      <FelaComponent style={{ position: 'relative', }}>
        <FelaComponent
          style={theme => ({
            marginInlineStart: 'auto',
            marginInlineEnd: 'auto',
            paddingTop: '3rem',
            paddingBottom: '2rem',
            marginBottom: '-7rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'start',
            maxWidth: '100rem',
            extend: [
              theme.mq(
                { until: 'l', },
                { flexDirection: 'column-reverse', textAlign: 'center', }
              ),
              //   theme.mq({ until: 'm', }, { paddingBottom: 0, marginBottom: '-7rem',}),
            ],
          })}
        >
          <FelaComponent style={{}}>
            <FelaComponent
              style={theme => ({
                color:
                  theme.campaignHeaderStyle[
                    `headerTopColor${campaignData.theme}`
                  ],
                extend: [
                  theme.type(2, { fromBp: 'xl', }),
                  theme.type(1, { fromBp: 'l', untilBp: 'xl', }),
                  theme.type(0, { untilBp: 'l', }),
                  theme.mq({ until: 'l', }, { marginTop: '2rem', }),
                ],
              })}
              render="h1"
            >
              {campaignData.topRow}
            </FelaComponent>
            <FelaComponent
              style={theme => ({
                color:
                  theme.campaignHeaderStyle[
                    `headerMainColor${campaignData.theme}`
                  ],
                extend: [
                  theme.type(6),
                  theme.type(5, { fromBp: 'l', untilBp: 'xl', }),
                  theme.type(3, { untilBp: 'l', }),
                ],
              })}
              render="h1"
            >
              {campaignData.mainRow}
            </FelaComponent>
            <FelaComponent
              style={theme => ({
                color:
                  theme.campaignHeaderStyle[
                    `headerBottomColor${campaignData.theme}`
                  ],
                extend: [
                  theme.type(6),
                  theme.type(5, { fromBp: 'l', untilBp: 'xl', }),
                  theme.type(3, { untilBp: 'l', }),
                ],
              })}
              render="h1"
            >
              {campaignData.bottomRow}
            </FelaComponent>
          </FelaComponent>
          <FelaComponent
            style={theme => ({
              width: '250px',
              height: '180px',
              extend: [
                theme.mq(
                  { until: 'l', },
                  {
                    width: '125px',
                    height: '90px',
                  }
                ),
              ],
            })}
          >
            <Image
              data={{
                ...campaignData.image,
                isAnimatedGif: campaignData.image.isAnimated,
              }}
              imgOptions={{
                transforms: { width: '1200', aspect: 'full', },
              }}
              miscStyles={{ backgroundColor: 'transparent', }}
            />
          </FelaComponent>
        </FelaComponent>
        <FelaComponent
          style={theme => ({
            top: 0,
            width: '100%',
            height: '200%',
            position: 'absolute',
            zIndex: '-1',
            overflow: 'hidden',
            transformOrigin: 'top left',
            transform: 'skewY(-4deg)',
            extend: [ theme.mq({ until: 'l', }, { height: '150%', }), ],
          })}
        >
          <FelaComponent
            style={theme => ({
              background:
                theme.campaignHeaderStyle[`background${campaignData.theme}`],
              width: '100%',
              height: '100% ',
              overflow: 'hidden',
              transformOrigin: 'top left',
              transform: 'skewY(4deg)',
            })}
          />
        </FelaComponent>
      </FelaComponent>
    </div>
  );
}

export default CampaignHeader;
