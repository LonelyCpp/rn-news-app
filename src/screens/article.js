import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StatusBar,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { fetchArticles } from '../actions';
import NetWorkState from '../constants/NetWorkState';

export default class ArticleScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      title: `${state.params.title || 'Article'}`
    };
  };

  constructor(props) {
    super(props);
    this.article = props.navigation.getParam('article', { title: 'Article' });
    props.navigation.setParams({ title: this.article.title });
    this.WINDOW_WIDTH = Dimensions.get('window').width;
  }

  render() {
    return (
      <ScrollView style={{ margin: 20 }}>
        <Text style={{ fontSize: 27, fontWeight: 'bold' }}>
          {this.article.title}
        </Text>
        <Text style={{ fontWeight: 'bold', marginTop: 10 }}>
          {this.article.author}{' '}
          <Text style={{ color: '#00000050' }}>
            {new Date(this.article.publishedAt).toLocaleDateString('en-GB')}
          </Text>
        </Text>

        <Image
          source={{ uri: this.article.urlToImage }}
          style={{
            width: this.WINDOW_WIDTH,
            height: 200,
            resizeMode: 'cover',
            marginTop: 5,
            marginBottom: 10
          }}
        />
        <Text style={{ fontSize: 14 }}>{this.article.content}</Text>
      </ScrollView>
    );
  }
}
