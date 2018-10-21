// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLList, GraphQLUnionType, } from 'graphql';

import content from './content_type';
import changeableElementGroup from './changeable_element_group_type';
import { htzPageTypes, } from '../../utils/htzPageTypes';

const SideBar = new GraphQLList(
  new GraphQLUnionType({
    name: 'SideBar',
    types: [ content, changeableElementGroup, ],
    resolveType: value => (Object.values(htzPageTypes)
      .filter(v => v && v.includes(value.inputTemplate))
      .length > 0
      ? changeableElementGroup
      : content),
  })
);

export default SideBar;
