import React, {useState, useCallback, useEffect, useRef} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Pressable,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from './types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useMutation, useQueryClient, InfiniteData} from 'react-query';
import {writeArticle} from '../api/articles';
import {Article} from '../api/types';

function WriteScreen() {
  const {top} = useSafeAreaInsets();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const queryClient = useQueryClient();
  const {mutate: write} = useMutation(writeArticle, {
    onSuccess: article => {
      // 데이터 갱신하는 법

      // 1. 'articles' 캐시 키를 만료시켜 articles를 다시 받아오게하기
      // queryClient.invalidateQueries('articles');

      // 2. queryClient에 직접 데이터 추가하기
      // 캐시 데이터 조회
      // const articles = queryClient.getQueryData<Article[]>('articles') ?? [];
      // 캐시 데이터 업데이트
      // queryClient.setQueryData('articles', articles.concat(article));

      // 3. 캐시 키로 데이터를 조회한 후 데이터를 업데이터 함수를 사용하여 업데이트
      // 첫번째 매개변수로 캐시키값을 입력, getQueryData를 사용하지 않고
      // 바로 업데이트를 할 수 있다.
      // queryClient.setQueryData<Article[]>('articles', articles => {
      //   return (articles ?? []).concat(article);
      // });

      // 4. 페이지네이션을 사용한 경우
      queryClient.setQueryData<InfiniteData<Article[]>>('articles', data => {
        if (!data) {
          return {
            pageParams: [undefined],
            pages: [[article]],
          };
        }

        const [firstPage, ...rest] = data.pages;
        return {
          ...data,
          pages: [[article, ...firstPage], ...rest],
        };
      });

      navigation.goBack();
    },
  });

  const bodyInputRef = useRef<TextInput | null>(null);

  const navigation = useNavigation<RootStackNavigationProp>();
  const onTitleSubmit = useCallback(() => {
    bodyInputRef.current?.focus();
  }, []);
  const onBodySubmit = useCallback(() => {
    write({title, body});
  }, [title, body, write]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          hitSlop={8}
          onPress={onBodySubmit}
          style={({pressed}) => [pressed && styles.headerRightPressed]}>
          <MaterialIcons name="send" color="#2196f3" size={24} />
        </Pressable>
      ),
    });
  }, [onBodySubmit, navigation]);
  return (
    <SafeAreaView style={styles.block} edges={['bottom']}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.select({ios: 'padding'})}
        keyboardVerticalOffset={Platform.select({ios: top + 60})}>
        {/*  > */}
        <TextInput
          placeholder="제목"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          onSubmitEditing={onTitleSubmit}
        />
        <TextInput
          placeholder="내용"
          style={[styles.input, styles.body]}
          multiline
          textAlignVertical="top"
          value={body}
          onChangeText={setBody}
          ref={bodyInputRef}
          autoCapitalize="none"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default WriteScreen;

const styles = StyleSheet.create({
  block: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
    flexDirection: 'column',
  },
  keyboardAvoiding: {
    flex: 1,
  },
  input: {
    backgroundColor: 'white',
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
  },
  body: {
    paddingTop: 12,
    paddingBottom: 12,
    marginTop: 16,
    flex: 1,
  },
  headerRightContainer: {
    marginRight: 16,
  },
  headerRightPressed: {
    opacity: 0.75,
  },
});
