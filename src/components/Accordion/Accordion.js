import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableHighlight, TouchableOpacity, FlatList } from 'react-native';
import { Icon, Grid, WhiteSpace, Carousel, Flex } from 'antd-mobile';
import Collapsible from './Collapsible';
import { ViewPropTypes } from './config/index';
import * as Animatable from 'react-native-animatable';



const COLLAPSIBLE_PROPS = Object.keys(Collapsible.propTypes);
const VIEW_PROPS = Object.keys(ViewPropTypes);

export default class Accordion extends Component {
  static propTypes = {
    sections: PropTypes.array.isRequired,
    renderHeader: PropTypes.func.isRequired,
    renderContent: PropTypes.func.isRequired,
    renderMainBody: PropTypes.func,
    onChange: PropTypes.func,
    align: PropTypes.oneOf(['top', 'center', 'bottom']),
    duration: PropTypes.number,
    easing: PropTypes.string,
    initiallyActiveSection: PropTypes.number,
    activeSection: PropTypes.oneOfType([
      PropTypes.bool, // if false, closes all sections
      PropTypes.number, // sets index of section to open
    ]),
    underlayColor: PropTypes.string,
    touchableComponent: PropTypes.func,
    touchableProps: PropTypes.object,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    underlayColor: 'black',
    disabled: false,
    touchableComponent: TouchableOpacity,
    flatListProps: {}
  };

  constructor(props) {
    super(props);

    // if activeSection not specified, default to initiallyActiveSection
    this.state = {
      activeSection:
        props.activeSection !== undefined
          ? props.activeSection
          : props.initiallyActiveSection,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeSection !== undefined) {
      this.setState({
        activeSection: nextProps.activeSection,
      });
    }
  }

  _toggleSection(section) {
    if (!this.props.disabled) {
      const activeSection =
        this.state.activeSection === section ? false : section;

      if (this.props.activeSection === undefined) {
        this.setState({ activeSection });
      }
      if (this.props.onChange) {
        this.props.onChange(activeSection);
      }
    }
  }





  renderItem = ({ item, index }) => {
    let viewProps = {};
    let collapsibleProps = {};
    Object.keys(this.props).forEach(key => {
      if (COLLAPSIBLE_PROPS.indexOf(key) !== -1) {
        collapsibleProps[key] = this.props[key];
      } else if (VIEW_PROPS.indexOf(key) !== -1) {
        viewProps[key] = this.props[key];
      }
    });
    const animation = [
      'bounceIn', 'bounceInDown', 'bounceInUp', 'bounceInLeft', 'bounceInRight'
    ];
    const Touchable = this.props.touchableComponent;
    return (
      <Animatable.View {...viewProps}  animation={'bounceIn'} duration={2000}>
        <View>
          {this.props.renderMainBody ? this.props.renderMainBody(
            item,
            index,
            this.state.activeSection === index,
            this.props.sections
          ) : false}
        </View>
        <Collapsible
          collapsed={this.state.activeSection !== index}
          {...collapsibleProps}
        >
          {this.props.renderContent(
            item,
            index,
            this.state.activeSection === index,
            this.props.sections
          )}
        </Collapsible>
        <Touchable
          onPress={() => this._toggleSection(index)}
          // underlayColor={this.props.underlayColor}
          activeOpacity={1}
          {...this.props.touchableProps}
        >
          {this.props.renderHeader(
            item,
            index,
            this.state.activeSection === index,
            this.props.sections
          )}
        </Touchable>
      </Animatable.View>
    );
  }

  render() {
    return (
      <FlatList
        data={this.props.sections}
        extraData={this.state}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => index}
        {...this.props}
      />
    )

  }

}
