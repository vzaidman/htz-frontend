// @flow
import * as React from 'react';

import SoccerLeaguesTable from './SoccerTableScore/SoccerLeagues/SoccerLeaguesTable';
import SoccerGroupsTable from './SoccerTableScore/SoccerGroups/SoccerGroupsTable';
import NBATableScore from './NBATableScore/NBATableScore';

type League = "2125" | "2021" | "2019" | "2015" | "2014" | "2002";
export type CoastType = "east" | "west";

type SoccerLeagueProps = {
  tableType: "soccer-leagues",
  league: League,
  isOpen: boolean,
};
type ChampionsProps = {
  tableType: "soccer-champions",
  number: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8",
};
type NbaProps = {
  tableType: "nba",
  isOpen: boolean,
  coastType: CoastType,
};

type Props = NbaProps | ChampionsProps | SoccerLeagueProps;

export default function Table(props: Props): React.Node {
  if (isNba(props)) return <NBATableScore coastType={props.coastType} isOpen={props.isOpen} />;
  if (isChampions(props)) return <SoccerGroupsTable number={props.number} />;
  if (isLegue(props)) return <SoccerLeaguesTable league={props.league} isOpen={props.isOpen} />;
  return null;
}

function isNba(props: Props): boolean %checks {
  return props.tableType === 'nba';
}
function isChampions(props: Props): boolean %checks {
  return props.tableType === 'soccer-champions';
}

function isLegue(props: Props): boolean %checks {
  return props.tableType === 'soccer-leagues';
}
