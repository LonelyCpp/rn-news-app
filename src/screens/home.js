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
  Keyboard,
  Button
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
    searchQuery: '',
    refreshing: false
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

  renderContent = () => {
    console.log('NetWorkState', this.props.articleNetworkState);
    if (this.props.articleNetworkState === NetWorkState.ERROR) {
      return (
        <View>
          <Text
            style={{
              opacity: 0.5,
              color: 'black',
              textAlign: 'center',
              fontSize: 15
            }}
          >
            We have trouble fetching data right now :(
          </Text>
          <Button title={'Retry'} onPress={() => this.onRefresh(false)} />
        </View>
      );
    }

    if (
      this.props.articleNetworkState === NetWorkState.LOADING &&
      this.state.refreshing === false
    ) {
      return <ActivityIndicator size='large' />;
    }

    return (
      <FlatList
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh}
        showsVerticalScrollIndicator={false}
        extraData={this.state.searchQuery}
        data={this.getNewsListData()}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item }) => (
          <ArticleListItem item={item} onItemPress={this.navigateToArticle} />
        )}
        ListHeaderComponent={
          this.state.searchActive ? null : (
            <View
              style={{
                borderBottomColor: '#00000050',
                borderBottomWidth: 1,
                marginBottom: 10
              }}
            >
              <Text style={styles.listHeader}>Your Daily Read</Text>
            </View>
          )
        }
        ListEmptyComponent={
          <Text style={{ fontSize: 18, opacity: 0.5 }}>Nothing to show</Text>
        }
      />
    );
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.articleNetworkState === NetWorkState.LOADING &&
      prevState.refreshing === true &&
      this.props.articleNetworkState !== NetWorkState.LOADING
    ) {
      this.setState({ refreshing: false });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={'black'} />
        {this.state.searchActive ? (
          <View style={{ justifyContent: 'center' }}>
            <TextInput
              autoFocus
              placeholder='Search Article'
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
        {this.renderContent()}
      </View>
    );
  }

  navigateToArticle = article => {
    this.props.navigation.navigate('article', { article });
  };

  onRefresh = (showIndicator = true) => {
    if (showIndicator) {
      this.setState({ refreshing: true });
    }
    if (this.state.searchActive) {
      this.props.fetchFilteredArticles(this.state.searchQuery);
    } else {
      this.props.fetchArticles();
    }
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

    marginBottom: 5,
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
