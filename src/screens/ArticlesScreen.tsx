import React, {useMemo} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {useInfiniteQuery} from 'react-query';
import {getArticles} from '../api/articles';
import Articles from '../components/Articles';
import {useUserState} from '../contexts/UserContext';
import {Article} from '../api/types';

function ArticlesScreen() {
  // const {data} = useQuery('articles', getArticles);
  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    // refetch,
    // isFetching,
    fetchPreviousPage,
    isFetchingPreviousPage,
  } = useInfiniteQuery(
    'articles',
    ({pageParam}) => getArticles({...pageParam}),
    {
      // useInfiniteQuery를 사용하기 위해서 getNextPageParam을 구현해주어야함.
      // getNextPageParam: lastPage =>
      //   lastPage.length === 10 ? lastPage[lastPage.length - 1].id : undefined,
      getNextPageParam: lastPage =>
        lastPage.length === 10
          ? {cursor: lastPage[lastPage.length - 1].id}
          : undefined,
      getPreviousPageParam: (_, allPages) => {
        const validPage = allPages.find(page => page.length > 0);
        if (!validPage) {
          return undefined;
        }

        return {
          prevCursor: validPage[0].id,
        };
      },
    },
  );

  const items = useMemo(() => {
    if (!data) {
      return null;
    }

    return ([] as Article[]).concat(...data.pages);
  }, [data]);

  const [user] = useUserState();

  if (!items) {
    return <ActivityIndicator size="large" style={styles.spinner} />;
  } else {
    return (
      <Articles
        articles={items}
        showWriteButton={!!user}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        // refresh={refetch}
        refresh={fetchPreviousPage}
        // isRefreshing={isFetching && !isFetchingNextPage}
        isRefreshing={isFetchingPreviousPage}
      />
    );
  }
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
  },
});
export default ArticlesScreen;
