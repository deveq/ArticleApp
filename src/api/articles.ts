import client from './clients';
import {Article} from './types';

// limit : 페이지네이션 개수, cursor : cursor 미만 10개만 받아오기
export async function getArticles({
  limit = 10,
  cursor,
  prevCursor,
}: {
  limit?: number;
  cursor?: number;
  prevCursor?: number;
}): Promise<Article[]> {
  const response = await client.get<Article[]>('/articles', {
    params: {
      _sort: 'id:DESC',
      _limit: limit,
      id_lt: cursor,
      id_gt: prevCursor,
    },
  });
  return response.data;
}

export async function getArticle(id: number) {
  const response = await client.get<Article>(`/articles/${id}`);
  return response.data;
}

export async function writeArticle(params: {title: string; body: string}) {
  const response = await client.post<Article>('/articles', params);
  return response.data;
}
