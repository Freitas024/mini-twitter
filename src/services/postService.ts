import api from '../lib/api';
import type { PaginaResponse, Post } from '../types'

export function getPosts(page?: number, search?: string): Promise<PaginaResponse<Post>> {
    return api.get('/posts', {
        params: {
            page,
            search
        }
    }).then(response => response.data);

}

export function likePost(id: number) {
    return api.post(`/posts/${id}/like`).then(response => response.data);
}

export function createPost(content: string, title: string, image?: string) {
    return api.post('/posts', {
        content,
        title,
        image
    }).then(response => response.data);
}

export function deletePost(id: number) {
    return api.delete(`/posts/${id}`).then(response => response.data);
}

export function updatePost(id: number, content: string, title: string, image?: string) {
    return api.put(`/posts/${id}`, {
        content,
        title,
        image: image ?? ''
    }).then(response => response.data);
}
