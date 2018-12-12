// @flow
import * as React from 'react';
import { FelaTheme, } from 'react-fela';
// import ListView from '../../../ListView/ListView';
import GridItem from '../../../Grid/GridItem';
import ListView from '../../../ListView/ListView';
import Teaser from '../../../Teaser/Teaser';
import TeaserContent from '../../../TeaserContent/TeaserContent';
import TeaserHeader from '../../../TeaserHeader/TeaserHeader';
import TeaserMedia from '../../../TeaserMedia/TeaserMedia';
import TeaserAuthors from '../../../TeaserAuthors/TeaserAuthors';
import TeaserRank from '../../../TeaserRank/TeaserRank';
import TeaserTime from '../../../TeaserTime/TeaserTime';
import Image from '../../../Image/Image';
import type { ListDataType, } from '../../../../flowTypes/ListDataType';
import type { TeaserDataType, } from '../../../../flowTypes/TeaserDataType';
import CommentsCount from '../../../CommentsCount/CommentsCount';

// import type { TeaserDataType, } from '../../flowTypes/TeaserDataType';

const getImageOptions = () => {
  const aspect = 'headline';
  return {
    sizes: '(max-width: 600px) 145px, (max-width: 1024px) 264px, (max-width: 1280px) 308px, 315px',
    transforms: [
      {
        width: '375',
        aspect,
        quality: 'auto',
      },
      {
        width: '425',
        aspect,
        quality: 'auto',
      },
      {
        width: '600',
        aspect,
        quality: 'auto',
      },
      {
        width: '768',
        aspect,
        quality: 'auto',
      },
      {
        width: '1028',
        aspect,
        quality: 'auto',
      },
      {
        width: '1280',
        aspect,
        quality: 'auto',
      },
      {
        width: '1920',
        aspect,
        quality: 'auto',
      },
    ],
  };
};

type Props = {
  gutter: ?number,
  list: ListDataType,
};

Pazuzu.defaultProps = {
  gutter: null,
};

function PazuzuTeaser({
  item,
  isSecondItem,
}: {
  item: TeaserDataType,
  isSecondItem: boolean,
}): React.Node {
  return (
    <FelaTheme
      render={theme => (
        <GridItem
          miscStyles={{
            [isSecondItem ? 'paddingInlineStart' : 'paddingInlineEnd']: [
              { until: 's', value: '0.5rem', },
              { from: 's', value: '2rem', },
            ],
          }}
        >
          <Teaser data={item}>
            <TeaserMedia
              data={item}
              width={[ { until: 'xl', value: 1, }, { from: 'xl', value: 1 / 2, }, ]}
            >
              <Image data={item.image} imgOptions={getImageOptions()} />
            </TeaserMedia>
            <TeaserContent
              width={[ { until: 'xl', value: 1, }, { from: 'xl', value: 1 / 2, }, ]}
              data={item}
              padding={[ { until: 'xl', value: [ 0, 1, 7, 1, ], }, { from: 'xl', value: [ 0, 2, 2, 2, ], }, ]}
              renderContent={teaserData => (
                <TeaserHeader
                  {...teaserData}
                  typeScale={[
                    { until: 's', value: -1, },
                    { from: 's', until: 'xl', value: 2, },
                    { from: 'xl', value: 1, },
                  ]}
                />
              )}
              footerMiscStyles={{
                display: 'block',
                color: theme.color('neutral', '-3'),
                marginTop: [ { from: 'xl', value: '0', }, ],
                position: [ { from: 'xl', value: 'initial', }, ],
                type: [
                  { until: 's', value: -3, },
                  { from: 's', until: 'xl', value: -2, },
                  { from: 'xl', value: -3, },
                ],
              }}
              footerPadding={[
                { until: 'xl', value: [ 0, 1, 1, 1, ], },
                { from: 'xl', value: [ 0, 2, 1, 2, ], },
              ]}
              renderFooter={footerData => (
                <React.Fragment>
                  <TeaserAuthors authors={footerData.authors} miscStyles={{ fontWeight: 'bold', }} />
                  {' | '}
                  <TeaserTime {...footerData} />
                  {' '}
                  <CommentsCount
                    miscStyles={{
                      display: [ { until: 's', value: 'none', }, ],
                      marginInlineEnd: '1rem',
                    }}
                    commentsCount={item.commentsCounts}
                    // size={[ { from: 's', until: 'l', value: 2, }, ]}
                  />
                  {/* todo: pass actual rank */}
                  {item.rank && (
                    <TeaserRank
                      maxRank={5}
                      rank={item.rank}
                      miscStyles={{
                        display: [ { until: 's', value: 'none', }, ],
                      }}
                    />
                  )}
                </React.Fragment>
              )}
            />
          </Teaser>
        </GridItem>
      )}
    />
  );
}

function Pazuzu({ gutter, list: { items, }, }: Props): React.Node {
  return (
    <FelaTheme
      render={theme => (
        <GridItem gutter={gutter}>
          <ListView gutter={1}>
            <PazuzuTeaser isSecondItem={false} item={items[0]} />
            <PazuzuTeaser isSecondItem item={items[1]} />
          </ListView>
        </GridItem>
      )}
    />
  );
}

export default Pazuzu;
