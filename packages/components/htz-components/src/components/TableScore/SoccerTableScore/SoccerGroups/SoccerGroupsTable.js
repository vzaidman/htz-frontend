/* eslint-disable react/no-unused-prop-types */
// @flow
import * as React from 'react';
import { FelaComponent, } from 'react-fela';
import type { ChildrenArray, Node, } from 'react';
import TableHeader from '../Header/TableHeader';
import TableBody from './Body/GroupsTableBody';
import GroupBar from '../Header/GroupBar';
import { fetchGroups, } from '../../SoccerData/fetchUtils';


// Flow validation
type Props = {
  number: string,

}

type State = {
  group: number,
  groupData: ?Array<Object>,
}

type Options = {
  children: ChildrenArray<Node> | Node,
}


function Table({ children, }: Options): Node {
  return (
    <FelaComponent render="table" dir="rtl" style={{ position: 'relative', width: '100%', }}>{children}</FelaComponent>
  );
}


const fetchFromGroups: number => Object = group => new Promise((resolve, reject) => (
  fetchGroups(group)
    .then(data => resolve(data))
    .catch(err => reject(err))
));


export default class SoccerLeaguesTable extends React.Component<Props, State> {
  // Is all score board open
  state = {
    group: 1,
    groupData: null,
  };


  static getDerivedStateFromProps(props: Props, state: State) {
    const groupNumber = Number(props.number) || 1;
    return {
      group: groupNumber,
    };
  }

  setGroupData: number => void = groupNumber => {
    fetchFromGroups(groupNumber)
      .then(data => {
        if (typeof data === 'string') {
          console.log(data);
        }
        else {
          this.setState({
            groupData: data.table,
          });
        }
      }).catch(error => console.log(error));
  }

  setGroup: number => void = groupNumber => {
    this.setGroupData(groupNumber);
    this.setState({ group: groupNumber, });
  }

  render(): Node {
    const { group, groupData, } = this.state;


    // Validate data existence
    if (!groupData) {
      this.setGroupData(group);
      return null;
    }

    return (
      <div style={{ display: 'inline-block', }}>
        <GroupBar setGroup={this.setGroup} groupNumber={group} />
        <Table>
          <TableHeader />
          <TableBody groupData={groupData} />
        </Table>
      </div>
    );
  }
}
