import React, { Component } from 'react';
import { Text, Image, Dimensions, ScrollView, StyleSheet } from 'react-native';

let styles;
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
    const publishDate = new Date(this.article.publishedAt).toLocaleDateString(
      'en-GB'
    );
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{this.article.title}</Text>
        <Text style={styles.author}>
          {this.article.author} <Text style={styles.date}>{publishDate}</Text>
        </Text>
        <Image source={{ uri: this.article.urlToImage }} style={styles.image} />
        <Text style={styles.content}>{this.article.content}</Text>
      </ScrollView>
    );
  }
}

styles = StyleSheet.create({
  container: { margin: 20 },
  title: { fontSize: 27, fontWeight: 'bold' },
  author: { fontWeight: 'bold', marginTop: 10 },
  date: { color: '#00000050' },
  image: {
    width: this.WINDOW_WIDTH,
    height: 200,
    resizeMode: 'cover',
    marginTop: 5,
    marginBottom: 10
  },
  content: { fontSize: 18, lineHeight: 25 }
});
