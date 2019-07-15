import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StatusBar,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import {
  fetchArticles,
  fetchFilteredArticles,
  clearFilteredArticles
} from '../actions';
import NetWorkState from '../constants/NetWorkState';
import ArticleListItem from '../components/ArticleListItem';

import searchIcon from '../../assets/ic_search.png';
import closeIcon from '../../assets/ic_close.png';

let styles;
class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    headerStyle: { backgroundColor: 'black' },
    headerTitleStyle: { color: 'white' },
    headerRight: (
      <TouchableOpacity onPress={navigation.getParam('toggleSearch')}>
        <Image
          style={{ height: 20, width: 20, marginEnd: 20 }}
          source={navigation.getParam('searchActive') ? closeIcon : searchIcon}
        />
      </TouchableOpacity>
    )
  });

  state = {
    searchActive: false,
    searchQuery: ''
  };

  componentWillMount() {
    this.props.fetchArticles();
    this.props.navigation.setParams({ toggleSearch: this.toggleSearch });
    this.props.navigation.setParams({ searchActive: this.state.searchActive });
  }

  toggleSearch = () => {
    if (this.state.searchActive && this.state.searchQuery.length === 0) {
      this.props.clearFilteredArticles();
    }
    this.setState({ searchActive: !this.state.searchActive });
    this.props.navigation.setParams({ searchActive: !this.state.searchActive });
  };

  getFilteredArticles = () => {
    Keyboard.dismiss();
    this.props.fetchFilteredArticles(this.state.searchQuery);
  };

  getNewsListData = () => {
    if (this.state.searchActive) {
      return this.props.filteredArticles;
    }
    return this.props.articles;
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={'black'} />
        {this.state.searchActive ? (
          <View style={{ justifyContent: 'center' }}>
            <TextInput
              autoFocus
              placeholder="Search Article"
              borderBottomWidth={1}
              borderBottomColor={'#00000050'}
              style={{ marginBottom: 10 }}
              value={this.state.searchQuery}
              onChangeText={searchQuery => this.setState({ searchQuery })}
              onSubmitEditing={this.getFilteredArticles}
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={this.getFilteredArticles}
            >
              <Text>Search</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {this.props.articleNetworkState === NetWorkState.LOADING ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            extraData={this.state.searchQuery}
            data={this.getNewsListData()}
            keyExtractor={(item, index) => String(index)}
            renderItem={({ item }) => (
              <ArticleListItem
                item={item}
                onItemPress={this.navigateToArticle}
              />
            )}
            ListHeaderComponent={
              this.state.searchActive ? null : (
                <Text style={styles.listHeader}>Your Daily Read</Text>
              )
            }
            ListEmptyComponent={
              <Text style={{ fontSize: 18, opacity: 0.5 }}>
                No search results to show
              </Text>
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
    articles: state.home.articles,
    filteredArticles: state.home.filteredAtricles
  };
};

mapDispatchToProps = dispatch => {
  return {
    fetchArticles: () => dispatch(fetchArticles()),
    fetchFilteredArticles: query => dispatch(fetchFilteredArticles(query)),
    clearFilteredArticles: () => dispatch(clearFilteredArticles())
  };
};

styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 10
  },
  listHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 10,
    borderBottomColor: '#00000050',
    borderBottomWidth: 1,
    marginBottom: 10,
    marginTop: 10
  },
  searchButton: {
    position: 'absolute',
    right: 10,
    paddingBottom: 15
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
