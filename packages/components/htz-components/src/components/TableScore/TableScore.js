// @flow
import React from 'react';

import type { Node, } from 'react';

import SoccerLeaguesTable from './SoccerTableScore/SoccerLeagues/SoccerLeaguesTable';
import SoccerGroupsTable from './SoccerTableScore/SoccerGroups/SoccerGroupsTable';
import NBATableScore from './NBATableScore/AllTable/NBATableScore';

type Props = {
  tableType: string,
  league: string,
  isOpen: boolean,
  number: string,
  coastType: string,
}

Table.defaultProps = {
  isOpen: false,
};


function Table({ tableType, league, isOpen, number, coastType, }: Props): Node {
  const typeMap: Object = new Map([
    [ 'soccer-leagues', <SoccerLeaguesTable league={league} isOpen={isOpen} />, ],
    [ 'soccer-champions', <SoccerGroupsTable number={number} />, ],
    [ 'nba', <NBATableScore coastType={coastType} isOpen={isOpen} />, ],
  ]);
  return typeMap.get(tableType);
}

export default Table;
