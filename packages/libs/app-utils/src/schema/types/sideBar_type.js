// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLList, GraphQLUnionType, } from 'graphql';

import content from './content_type';
import elementGroup from './element_group_type';

const SideBar = new GraphQLList(
  new GraphQLUnionType({
    name: 'SideBar',
    types: [ content, elementGroup, ],
    resolveType: value =>
      (value.inputTemplate === 'com.tm.element.group' ? elementGroup : content),
  })
);

export default SideBar;
