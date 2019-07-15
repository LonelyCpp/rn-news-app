import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StatusBar,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

let styles;

export default class TestScreen extends Component {
  static navigationOptions = {
    title: 'Test Screen'
  };

  render() {
    item = {
      title: 'sample title sample title sample',
      author: 'sample author',
      urlToImage:
        'https://assets.fireside.fm/file/fireside-images/podcasts/images/b/bc7f1faf-8aad-4135-bb12-83a8af679756/cover_medium.jpg'
    };
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View
          style={{
            flexWrap: 'wrap',
            flex: 1,
            justifyContent: 'center'
          }}
        >
          <Text>{item.title}</Text>
          <Text>{item.author}</Text>
        </View>
        <Image source={{ uri: item.urlToImage }} style={styles.articleImage} />
      </View>
    );
  }
}

styles = StyleSheet.create({
  listItemContainer: {
    paddingBottom: 10,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    borderWidth: 1
  },
  title: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 18,
    fontWeight: 'bold'
  },
  author: { fontSize: 14, marginTop: 5 },
  articleImage: {
    width: 80,
    height: 80,
    marginStart: 10,
    alignSelf: 'center'
  }
});
