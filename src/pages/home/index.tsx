import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import { useInfiniteQuery, useMutation } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { authService } from '../../services/authService';
import SearchInput from '../../components/SearchInput'
import { useQueryClient } from '@tanstack/react-query';
import { getPosts, likePost } from '../../services/postService';
import PostCard from '../../components/PostCard';
import CreatePost from '../../components/CreatePost';
import type { Post } from '../../types';
import { createPost as createPostService } from '../../services/postService';
import { deletePost as deletePostService } from '../../services/postService';
import { updatePost as updatePostService } from '../../services/postService';

export default function Home() {
    const [search, setSearch] = useState<string>('');
    const [editingPost, setEditingPost] = useState<Post | null>(null)

    const navigate = useNavigate()
    const queryClient = useQueryClient();
    const sentinelRef = useRef<HTMLDivElement>(null);

    const { mutate: toggleLike } = useMutation({
        mutationFn: (id: number) => likePost(id),
        onMutate: async (postId: number) => {
            await queryClient.cancelQueries({ queryKey: ['posts', search] })
            const previous = queryClient.getQueryData(['posts', search])
            queryClient.setQueryData(['posts', search], (old: any) => {
                if (!old) return old
                return {
                    ...old,
                    pages: old.pages.map((page: any) => ({
                        ...page,
                        posts: page.posts.map((p: Post) =>
                            p.id === postId
                                ? { ...p, likedByMe: !p.likedByMe, likesCount: p.likedByMe ? p.likesCount - 1 : p.likesCount + 1 }
                                : p
                        )
                    }))
                }
            })
            return { previous }
        },
        onError: (_err, _id, context) => {
            queryClient.setQueryData(['posts', search], context?.previous)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        },
    });

    const { mutate: createPost } = useMutation({
        mutationFn: (data: { content: string, title: string, image?: string }) => createPostService(data.content, data.title, data.image),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        }
    });

    const { mutate: deletePost } = useMutation({
        mutationFn: (id: number) => deletePostService(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        },
        onError: (error: any) => {
            if (error.response?.status === 403) {
                alert('Você não tem permissão para deletar este post');
            }
        }
    });

    const { mutate: updatePost } = useMutation({
        mutationFn: (data: { id: number, content: string, title: string, image?: string }) => updatePostService(data.id, data.content, data.title, data.image),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
            setEditingPost(null)
        },
        onError: (error: any) => {
            if (error.response?.status === 403) {
                alert('Você não tem permissão para editar este post');
            }
        }
    });

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const handleLogout = async () => {
        try {
            const result = await authService.logout()
            console.log(result);
            localStorage.removeItem('token')
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

    const { data, isLoading, isError, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['posts', search],
        queryFn: ({ pageParam }) => getPosts(pageParam, search),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const totalPages = Math.ceil(lastPage.total / lastPage.limit)
            return lastPage.page < totalPages ? lastPage.page + 1 : undefined;
        }
    });

    const posts = data?.pages.flatMap((page) => page.posts) ?? [];

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasNextPage) {
                fetchNextPage()
            }
        })
        if (sentinelRef.current) observer.observe(sentinelRef.current)
        return () => observer.disconnect()
    }, [fetchNextPage, hasNextPage]);

    return (
        <div className="home-page">
            {/* Header */}
            <header className="home-header">
                <h1 className="home-header__logo">Mini Twitter</h1>
                <SearchInput placeholder="Buscar por post..." onChange={handleSearch} />
                <button
                    type="button"
                    className="home-header__logout"
                    onClick={handleLogout}
                    title="Sair"
                >
                    <LogOut size={22} />
                </button>
            </header>

            {/* Conteúdo principal */}
            <main className="home-content">
                <CreatePost
                    onSubmit={(title, content, image) => createPost({ title, content, image })}
                />
                {editingPost && (
                    <div className="modal-overlay" onClick={() => setEditingPost(null)}>
                        <div className="modal" onClick={(e) => e.stopPropagation()}>
                            <h2 className="modal__title">Editar Post</h2>
                            <input
                                className="modal__input"
                                defaultValue={editingPost.title}
                                placeholder="Título do post"
                                onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                            />
                            <textarea
                                className="modal__textarea"
                                defaultValue={editingPost.content}
                                placeholder="Conteúdo do post"
                                rows={4}
                                onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                            />
                            <input
                                className="modal__input"
                                defaultValue={editingPost.image || ''}
                                placeholder="URL da imagem (opcional)"
                                onChange={(e) => setEditingPost({ ...editingPost, image: e.target.value })}
                            />
                            <div className="modal__actions">
                                <button
                                    className="modal__btn modal__btn--cancel"
                                    onClick={() => setEditingPost(null)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className="modal__btn modal__btn--save"
                                    onClick={() => updatePost({ id: editingPost.id, title: editingPost.title, content: editingPost.content, image: editingPost.image })}
                                >
                                    Salvar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {isLoading && <p>Carregando posts...</p>}
                {isError && <p>Erro ao carregar posts...</p>}
                {posts && posts.map((post) => (
                    <PostCard key={post.id} post={post} onLike={toggleLike} onDelete={deletePost} onEdit={setEditingPost} />
                ))}
                <div ref={sentinelRef} />
            </main>

            {/* Footer */}
            <footer className="home-footer">
                <span className="home-footer__logo">Mini Twitter</span>
            </footer>
        </div>
    )
}