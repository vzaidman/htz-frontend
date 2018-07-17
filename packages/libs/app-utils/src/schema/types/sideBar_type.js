// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLList, GraphQLUnionType, } from 'graphql';

import content from './content_type';
import changeableElementGroup from './changeable_element_group_type';

const SideBar = new GraphQLList(
  new GraphQLUnionType({
    name: 'SideBar',
    types: [ content, changeableElementGroup, ],
    resolveType: value =>
      (value.inputTemplate === 'com.tm.element.group'
        ? changeableElementGroup
        : content),
  })
);

export default SideBar;
