import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { COUNTRY_LIST } from '../constants';
import { setCountryCode } from '../actions';
import { storeDataInDevice, DeviceStorageKeys } from '../utils';

export class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Settings'
  };
  constructor(props) {
    super(props);
  }

  onChangeCountry = async country => {
    try {
      await storeDataInDevice(DeviceStorageKeys.countryCode, country.key);
      this.props.setCountryCode(country.key);
    } catch (e) {
      console.error(e);
    }
  };

  renderCountryItem = country => {
    const isSelected = this.props.settings.countryCode === country.key;
    return (
      <TouchableOpacity
        style={{
          padding: 10,
          paddingStart: 0,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
        onPress={() => this.onChangeCountry(country)}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: isSelected ? 'bold' : null
          }}
        >
          {country.name}
        </Text>
        {isSelected ? <Text style={{ fontSize: 18 }}>👈</Text> : null}
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={{ margin: 20 }}>
        <Text style={{ fontWeight: 'bold', marginBottom: 5, opacity: 0.5 }}>
          Country
        </Text>
        <FlatList
          extraData={this.props.settings.countryCode}
          data={COUNTRY_LIST}
          renderItem={({ item }) => this.renderCountryItem(item)}
        />
      </View>
    );
  }
}

mapStateToProps = state => {
  return {
    settings: state.settings
  };
};

mapDispatchToProps = dispatch => {
  return {
    setCountryCode: code => dispatch(setCountryCode(code))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);
