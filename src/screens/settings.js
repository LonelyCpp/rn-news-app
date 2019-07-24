import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { COUNTRY_LIST } from '../constants';

export default class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Settings'
  };
  constructor(props) {
    super(props);
    this.state = {
      country: 'gb'
    };
  }

  onChangeCountry = country => {
    this.setState({ country: country.key });
  };

  renderCountryItem = country => {
    const isSelected = this.state.country === country.key;
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
          extraData={this.state.country}
          data={COUNTRY_LIST}
          renderItem={({ item }) => this.renderCountryItem(item)}
        />
      </View>
    );
  }
}

/**



 */
