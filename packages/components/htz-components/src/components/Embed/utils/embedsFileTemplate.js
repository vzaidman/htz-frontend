module.exports = (elementsList, elementsWhoDoNotReceiveOnLoadCallback) => `
/* global window */
/* *************************************************************** *
 * THIS IS AN AUTO GENERATED FILE. PLEASE DO NOT EDIT IT DIRECTLY.
 *
 * If you want to change the styleguide example, it is generated
 * from the \`embedsFileTemplate.js\` file is this directory.
 * *************************************************************** */
import React from 'react';
import dynamic from 'next/dynamic';
import { createComponent, } from 'react-fela';
import PropTypes from 'prop-types';
import embedTypes from './utils/embedTypes';
import exampleProps from './utils/exampleProps';
import EmbedRadioGroup from './utils/EmbedRadioGroup';
import LoadingScreen from './utils/LoadingScreen';

const embeds = {
  ${Object.keys(elementsList)
    .map(element => `${element}: () => import('${elementsList[element]}'),`)
    .join('\n  ')}
};

const getEmbed = embedType => {
  const embedPath = embeds[embedType] || null;

  if (embedPath) {
    return new Promise((resolve, reject) => {
      dynamic(
        embedPath()
          .then(Embed => resolve(Embed))
          .catch(err => reject(err))
      );
    });
  }
  return null;
};

const embedWrapperStyle = () => ({
  maxWidth: '600px',
  margin: '0 auto',
});

const EmbedWrapper = createComponent(embedWrapperStyle, 'div');

const menuListStyle = () => ({
  appearance: 'menulist',
});

const MenuList = createComponent(menuListStyle, 'select', props =>
  Object.keys(props)
);

/*
  * An embed component that holds a verity of elements
  * (such as: Youtube, Twitter, Facebook, etc).
  */
export default class Embed extends React.Component {
  static propTypes = {
    /**
     * This input template is created in Polopoly, and by it this Embed
     * component can determined which element to import and mount
     * (for example: for 'com.polobase.YouTubeEmbed' inputTemplate, the Embed
     * component will import the [***Youtube***](./#youtube) component).
     */
    inputTemplate: PropTypes.string.isRequired,
    /**
     * The element source code that comes from the Polopoly.
     * for most of the elements, this content had been processed and modified
     * (according to the user's input and selections) in the element's Policy.
     */
    content: PropTypes.string,
    /**
     * Some of the elements can have different type options
     * (for example, Facebook has Post, Video or Comment),
     * so this prop is the type of this specific element
     */
    embedType: PropTypes.string,
    /**
     * An object that contains a various settings/option/attributes for the embedded element.
     */
    settings: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    content: '',
    settings: null,
    embedType: '',
  };

  state = {
    showLoading: true,
    props: null,
    component: null,
    type: null,
    multiProps: null,
    isLoading: false,
  };

  componentDidMount() {
    if (this.props.inputTemplate) {
      this.setState({ fromProps: true, }); // eslint-disable-line react/no-did-mount-set-state
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      !this.state.props ||
      nextState.props !== this.state.props ||
      nextState.component !== this.state.component
    ) {
      return true;
    }
    return nextState.isLoading !== this.state.isLoading;
  }

  componentDidUpdate() {
    switch (this.state.type) {
      case 'Facebook':
        // eslint-disable-next-line no-undef
        return typeof FB !== 'undefined' ? FB.XFBML.parse() : '';
      case 'Instagram':
        // eslint-disable-next-line no-undef
        return typeof window.instgrm !== 'undefined'
          ? window.instgrm.Embeds.process()
          : '';
      case 'Pinterest':
        // eslint-disable-next-line no-undef
        return typeof doBuild !== 'undefined' ? doBuild() : '';
      case 'Twitter':
        // eslint-disable-next-line no-undef
        return typeof twttr !== 'undefined' ? twttr.widgets.load() : '';
      default:
        return null;
    }
  }

  onSelectEmbed = e => {
    if (e.target.selectedOptions) {
      const type = e.target.selectedOptions[0].value;
      const props = exampleProps(type);
      const showLoading =
        this.componentsWhoDoNotReceiveOnLoadCallback.findIndex(
          component => component === type
        ) === -1;
      this.setState({
        type,
        props,
        showLoading,
        multiProps: Array.isArray(props) ? props : null,
        component: null,
        isLoading: showLoading && !Array.isArray(props),
      });
    }
    else {
      const propsIndex = e.target.value;
      this.setState({
        props: this.state.multiProps[propsIndex],
        isLoading: this.state.showLoading,
      });
    }
  };

  onLoaded = () => {
    this.setState({ isLoading: false, });
  };

  getEmbedComponentFromProps = () => {
    const EmbedType = embedTypes[this.props.inputTemplate];
    return <EmbedType {...this.props} />;
  };

  getEmbedComponentFromState = () => {
    if (!Array.isArray(this.state.props)) {
      getEmbed(this.state.type)
        .then(response =>
          this.setState({
            component: response.default,
          })
        )
        .catch(err => console.log(err));
    }
    return null;
  };

  getButtonsComponent = () => (
    <RadioGroup
      options={this.state.multiProps}
      groupName={this.state.type}
      onSelection={this.onSelectEmbed}
    />
  );

  componentsWhoDoNotReceiveOnLoadCallback = [
    ${elementsWhoDoNotReceiveOnLoadCallback
    .map(element => `'${element}'`)
    .join(',\n    ')},
  ];

  render() {
    const Component = this.state.component;
    if (!this.state.fromProps) {
      return (
        <div style={{ position: 'relative', }}>
          <MenuList
            name="elementType"
            onChange={this.onSelectEmbed}
            defaultValue="placeHolder"
          >
            <option value="placeHolder" disabled>
              Select a preview
            </option>
            ${Object.keys(elementsList)
    .map(element => `<option value="${element}">${element}</option>`)
    .join('\n            ')}
          </MenuList>
          <LoadingScreen isLoading={this.state.isLoading} />
          {this.state.multiProps && this.getButtonsComponent()}
          {this.state.props && this.getEmbedComponentFromState()}
          {Component && (
            <EmbedWrapper>
              <Component
                {...this.state.props}
                onLoadCallback={this.state.showLoading ? this.onLoaded : null}
              />
            </EmbedWrapper>
          )}
        </div>
      );
    }
    return this.getEmbedComponentFromProps();
  }
}
`;
