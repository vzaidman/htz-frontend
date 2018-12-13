// @flow
import * as React from 'react';
import { FelaComponent, } from 'react-fela';
import H from '../../../AutoLevels/H';
import GridItem from '../../../Grid/GridItem';

type Props = {
  title: string,
  gutter: ?number,
};

VogelListTitle.defaultProps = {
  gutter: null,
};

export default function VogelListTitle({ title, gutter, }: Props): React.Node {
  return (
    <GridItem gutter={gutter} miscStyles={{ flexGrow: '0', flexShrink: '1', }}>
      <FelaComponent
        style={theme => ({
          color: theme.color('primary'),
          marginBottom: '1rem',
        })}
        render={({ className, }) => <H className={className}>{title}</H>}
      />
    </GridItem>
  );
}
