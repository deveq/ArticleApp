import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {Article} from '../api/types';
import ArticleItem from './ArticleItem';
import WriteButton from './WriteButton';

export interface ArticlesProps {
  articles: Article[];
  showWriteButton: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage(): void;
  isRefreshing: boolean;
  refresh(): void;
}

function Articles({
  articles,
  showWriteButton,
  fetchNextPage,
  isFetchingNextPage,
  isRefreshing,
  refresh,
}: ArticlesProps) {
  // TODO : renderItem 구현 예정
  return (
    <FlatList
      data={articles}
      renderItem={({item}) => (
        <ArticleItem
          id={item.id}
          publishedAt={item.published_at}
          title={item.title}
          username={item.user.username}
        />
      )}
      keyExtractor={item => item.id.toString()}
      style={styles.list}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={() => (showWriteButton ? <WriteButton /> : null)}
      ListFooterComponent={() => (
        // articles가 1개 이상 있을 때만 최하단 테두리 보여주기
        // articles.length > 0 ? <View style={styles.separator} /> : null
        <>
          {articles.length > 0 ? <View style={styles.separator} /> : null}
          {isFetchingNextPage && (
            <ActivityIndicator
              size="small"
              color="black"
              style={styles.spinner}
            />
          )}
        </>
      )}
      onEndReachedThreshold={0.5}
      onEndReached={fetchNextPage}
      refreshControl={
        <RefreshControl onRefresh={refresh} refreshing={isRefreshing} />
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#cfd8dc',
  },
  spinner: {
    backgroundColor: 'white',
    paddingTop: 32,
    paddingBottom: 32,
  },
});

export default Articles;
