import client from './clients';
import {Comment} from './types';

export async function getComments(articleId: number) {
  const response = await client.get<Comment[]>(
    `/articles/${articleId}/comments`,
  );

  return response.data;
}
