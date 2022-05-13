import client from './clients';
import {Article} from './types';

export async function getArticles(): Promise<Article[]> {
  const response = await client.get<Article[]>('/articles');
  return response.data;
}

export async function getArticle(id: number) {
  const response = await client.get<Article>(`/articles/${id}`);
  return response.data;
}
