import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

let styles;

export default (ArticleListItem = props => {
  return (
    <TouchableOpacity
      style={styles.listItemContainer}
      onPress={() => props.onItemPress(props.item)}
    >
      <View
        style={{
          flexWrap: 'wrap',
          flex: 1,
          justifyContent: 'center'
        }}
      >
        <Text style={styles.title}>{props.item.title}</Text>
        <Text styles={styles.author}>{props.item.author}</Text>
      </View>
      <Image
        source={{ uri: props.item.urlToImage }}
        style={styles.articleImage}
      />
    </TouchableOpacity>
  );
});

styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10
  },
  title: {
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
