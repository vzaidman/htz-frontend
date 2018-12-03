// @flow
import * as React from 'react';
// import { FelaComponent, FelaTheme, } from 'react-fela';
import ListView from '../ListView/ListView';
import GridItem from '../Grid/GridItem';
import Teaser from '../Teaser/Teaser';
import TeaserContent from '../TeaserContent/TeaserContent';
import TeaserHeader from '../TeaserHeader/TeaserHeader';
import TeaserMedia from '../TeaserMedia/TeaserMedia';
import TeaserResponsiveText from '../TeaserResponsiveText/TeaserResponsiveText';
import TeaserSubtitle from '../TeaserSubtitle/TeaserSubtitle';
import Image from '../Image/Image';
import type { ListDataType, } from '../../flowTypes/ListDataType';

type Props = {
  data: ListDataType,
};

Wong.defaultProps = {};

function Wong({ data, }: Props): React.Node {
  return (
    <ListView gutter={5}>
      {data.items.map(item => (
        <GridItem>
          <Teaser gutter={2} data={item}>
            <TeaserContent
              width={1}
              data={item}
              renderContent={() => (
                <div>
                  <TeaserMedia data={item} width={1}>
                    <Image
                      data={item.image}
                      imgOptions={{
                        transforms: { width: '1200', aspect: 'full', },
                      }}
                    />
                  </TeaserMedia>
                  {/* <TeaserHeader /> */}
                </div>
              )}
              renderFooter={() => <div>heelllo footer</div>}
            />
          </Teaser>
        </GridItem>
      ))}
    </ListView>
  );
}

export default Wong;
