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
import { connect } from 'react-redux';
import { fetchArticles } from '../actions';
import NetWorkState from '../constants/NetWorkState';

let styles;
class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
    headerStyle: { backgroundColor: 'black' },
    headerTitleStyle: { color: 'white' }
  };

  componentWillMount() {
    this.props.fetchArticles();
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={'black'} />
        {this.props.articleNetworkState === NetWorkState.LOADING ? (
          <ActivityIndicator size='large' />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.props.articles}
            keyExtractor={(item, index) => String(index)}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => this.navigateToArticle(item)}
                style={styles.listItemContainer}
              >
                <View style={{ flexGrow: 1, justifyContent: 'center' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.title}>{item.title}</Text>
                  </View>
                  <Text style={styles.author}>{item.author}</Text>
                </View>
                <Image
                  source={{ uri: item.urlToImage }}
                  style={styles.articleImage}
                />
              </TouchableOpacity>
            )}
            ListHeaderComponent={
              <Text style={styles.listHeader}>Your Daily Read</Text>
            }
          />
        )}
      </View>
    );
  }
  navigateToArticle = article => {
    this.props.navigation.navigate('article', { article });
  };
}

mapStateToProps = state => {
  return {
    articleNetworkState: state.home.networkState,
    articles: state.home.articles
  };
};

mapDispatchToProps = dispatch => {
  return {
    fetchArticles: () => dispatch(fetchArticles())
  };
};

styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  listItemContainer: {
    paddingBottom: 10,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
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
  },
  listHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 10,
    borderBottomColor: '#00000050',
    borderBottomWidth: 1,
    marginBottom: 10
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
