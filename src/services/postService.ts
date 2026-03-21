import  api  from '../lib/api';
import type { PaginaResponse, Post} from '../types'

export function getPosts( page?:  number, search?: string): Promise<PaginaResponse<Post>> {
    return api.get('/posts', {
        params: {
            page,
            search
        }
    }).then(response => response.data);
}

