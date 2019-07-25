import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';

import { COUNTRY_LIST, STRINGS } from '../constants';
import { setCountryCode } from '../actions';
import { storeDataInDevice, DeviceStorageKeys } from '../utils';

let styles;

export class SettingsScreen extends Component {
  static navigationOptions = {
    title: STRINGS.SCREEN_NAMES.SETTINGS
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
        style={styles.itemContainer}
        onPress={() => this.onChangeCountry(country)}
      >
        <Text
          style={[styles.itemText, { fontWeight: isSelected ? 'bold' : null }]}
        >
          {country.name}
        </Text>
        {isSelected ? (
          <Text style={{ fontSize: 18 }}>{STRINGS.EMOJI_POINT_LEFT}</Text>
        ) : null}
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={{ margin: 20 }}>
        <Text style={styles.category}>{STRINGS.COUNTRY}</Text>
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

styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    paddingStart: 0,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemText: {
    fontSize: 18
  },
  category: {
    fontWeight: 'bold',
    marginBottom: 5,
    opacity: 0.5
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);
