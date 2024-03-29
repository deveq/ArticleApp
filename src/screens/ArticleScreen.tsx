import React from 'react';
import {StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from './types';
import {useQuery} from 'react-query';
import {getArticle} from '../api/articles';
import {getComments} from '../api/comments';
import ArticleView from '../components/ArticleView';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CommentItem from '../components/CommentItem';

type ArticleScreenRouteProp = RouteProp<RootStackParamList, 'Article'>;

function ArticleScreen() {
  const {params} = useRoute<ArticleScreenRouteProp>();
  const {id} = params;

  const articleQuery = useQuery(['article', id], () => getArticle(id));
  const commentQuery = useQuery(['comments', id], () => getComments(id));

  const {bottom} = useSafeAreaInsets();

  // 둘 중 하나라도 준비되지 않은 데이터가 있다면 스피너 보여주기
  if (!articleQuery.data || !commentQuery.data) {
    return (
      <ActivityIndicator size="large" style={styles.spinner} color="black" />
    );
  } else {
    // 상단의 if문에서 articleQuery.data와 commentQuery.data가
    // undefined이 아닐 경우라는 조건문을 통과한 후이므로 구조분해할당이 가능해짐
    const {title, body, published_at, user} = articleQuery.data;

    return (
      <FlatList
        style={styles.flatList}
        contentContainerStyle={[
          styles.flatListContent,
          {paddingBottom: bottom},
        ]}
        data={commentQuery.data}
        renderItem={({item}) => (
          <CommentItem
            id={item.id}
            publishedAt={item.published_at}
            message={item.message}
            username={item.user.username}
          />
        )}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={
          <ArticleView
            title={title}
            body={body}
            publishedAt={published_at}
            username={user.username}
          />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
  },
  flatList: {
    backgroundColor: 'white',
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: 12,
  },
});
export default ArticleScreen;
