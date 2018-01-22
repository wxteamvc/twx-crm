import React from 'react';
import PropTypes from 'prop-types';
import { View,StatusBar,Text } from 'react-native';
import { NavigationBar } from 'teaset';
import  FontAwesome  from 'react-native-vector-icons/FontAwesome';

class GiftedFormModal extends React.Component {

  static navigationOptions({ navigation }) {
    const { getTitle, onClose } = navigation.state.params || {};

    return {
      headerTitle: getTitle(),
      headerStyle: { backgroundColor: '#40a9ff' },
      headerTitleStyle: { color: 'white' },
      headerLeft: <FontAwesome
        name="chevron-left"
        color="white"
        size={25}
        style={{ paddingLeft: 10 }}
        onPress={() => {
          navigation.goBack();
        }}
      />,
      headerRight: <FontAwesome
        name="check"
        color="white"
        size={25}
        style={{ paddingRight: 10 }}
        onPress={() => {
          onClose(null, null);
          navigation.goBack();
        }}
      />
    };
  }

  render() {
    const { renderContent, getTitle, onClose } = this.props.navigation.state.params || {};
    return (
      <View style={{flex:1}}>
      <StatusBar
        translucent={false}
        backgroundColor='#40a9ff'
      />
     
      <View style={{height:70}}>
          <NavigationBar title={getTitle()} 
          leftView={<NavigationBar.BackButton title='Back' onPress={()=>{this.props.navigation.goBack();}} />} />
      </View>
        {renderContent()}
      </View>
    );
  }
}

GiftedFormModal.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
    state: PropTypes.shape({
      params: PropTypes.object
    })
  })
};

GiftedFormModal.defaultProps = {
  navigation: null
};

export default GiftedFormModal;