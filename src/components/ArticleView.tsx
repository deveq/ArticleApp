import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

export interface ArticleViewProps {
  title: string;
  body: string;
  publishedAt: string;
  username: string;
}

function ArticleView({body, publishedAt, title, username}: ArticleViewProps) {
  const formattedDate = new Date(publishedAt).toLocaleString();

  return (
    <View style={styles.block}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.date}>{formattedDate}</Text>
      <Text>{body}</Text>
    </View>
  );
}

export default ArticleView;

const styles = StyleSheet.create({
  block: {
    paddingTop: 24,
    paddingBottom: 64,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 12,
    marginTop: 16,
    fontWeight: 'bold',
  },
  date: {
    marginTop: 24,
    marginBottom: 24,
    height: 1,
    backgroundColor: '#eeeeee',
  },
});
