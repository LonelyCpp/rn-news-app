import React, { Component } from 'react';
import {
  Text,
  Image,
  Dimensions,
  ScrollView,
  StyleSheet,
  Linking
} from 'react-native';

let styles;
export default class ArticleScreen extends Component {
  constructor(props) {
    super(props);
    this.article = props.navigation.getParam('article', { title: 'Article' });
    this.WINDOW_WIDTH = Dimensions.get('window').width;

    this.state = {
      imageLoadError: false
    };
  }

  trimArticleText = text => {
    try {
      re = /\[\+\d+\schars\]/;
      return text.replace(re, '');
    } catch (e) {
      console.log(e);
      return text;
    }
  };

  render() {
    const publishDate = new Date(this.article.publishedAt).toLocaleDateString(
      'en-GB'
    );
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{this.article.title}</Text>
        <Text style={styles.author}>
          {this.article.author} <Text style={styles.date}>{publishDate}</Text>
        </Text>
        {this.state.imageLoadError ? null : (
          <Image
            source={{ uri: this.article.urlToImage }}
            style={styles.image}
            onError={() => this.setState({ imageLoadError: true })}
          />
        )}
        <Text style={styles.content}>
          {this.trimArticleText(this.article.content)}
        </Text>
        <Text
          style={{ color: 'blue', fontWeight: 'bold', marginTop: 10 }}
          onPress={() => Linking.openURL(this.article.url)}
        >
          Read Full Article 📰
        </Text>
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
