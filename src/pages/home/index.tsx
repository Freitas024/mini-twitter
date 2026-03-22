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

interface HomeProps {
    toggleTheme: () => void;
    isDark: boolean;
}
export default function Home({ toggleTheme, isDark }: HomeProps) {
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
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-[var(--color-bg-primary)] via-[var(--color-bg-secondary)] to-[var(--color-bg-primary)] font-[Inter,system-ui,sans-serif] text-[var(--color-text-primary)]">
            {/* Header */}
            <header className="flex items-center justify-between py-3.5 px-8 bg-[var(--color-bg-header)] backdrop-blur-md border-b border-[var(--color-border)] sticky top-0 z-50">
                <h1 className="text-lg font-bold text-[var(--color-text-primary)] whitespace-nowrap">Mini Twitter</h1>
                <SearchInput placeholder="Buscar por post..." onChange={handleSearch} />
                <button
                    type="button"
                    onClick={toggleTheme}
                    title="Alternar tema"
                >
                    {isDark ? '☀️' : '🌙'}
                </button>
                <button
                    type="button"
                    className="flex items-center justify-center p-2 text-[var(--color-text-muted)] bg-transparent border-none rounded-lg cursor-pointer transition-all duration-200 hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-input)]"
                    onClick={handleLogout}
                    title="Sair"
                >
                    <LogOut size={22} />
                </button>
            </header>

            {/* Conteúdo principal */}
            <main className="flex-1 w-full max-w-[720px] mx-auto py-8 px-6">
                <CreatePost
                    onSubmit={(title, content, image) => createPost({ title, content, image })}
                />
                {editingPost && (
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-6" onClick={() => setEditingPost(null)}>
                        <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl p-7 w-full max-w-[480px] flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
                            <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Editar Post</h2>
                            <input
                                className="w-full py-3 px-4 text-[0.9375rem] font-semibold text-[var(--color-text-primary)] bg-[var(--color-bg-input)] border border-[var(--color-border)] rounded-xl outline-none font-[inherit] transition-all duration-200 placeholder:text-[var(--color-text-placeholder)] placeholder:font-normal focus:border-[var(--color-border-focus)] focus:bg-[var(--color-bg-input)] focus:shadow-[0_0_0_3px_rgba(29,155,240,0.1)]"
                                defaultValue={editingPost.title}
                                placeholder="Título do post"
                                onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                            />
                            <textarea
                                className="w-full py-3 px-4 text-sm text-[var(--color-text-secondary)] bg-[var(--color-bg-input)] border border-[var(--color-border)] rounded-xl outline-none resize-y min-h-20 font-[inherit] leading-relaxed transition-all duration-200 placeholder:text-[var(--color-text-placeholder)] focus:border-[var(--color-border-focus)] focus:bg-[var(--color-bg-input)] focus:shadow-[0_0_0_3px_rgba(29,155,240,0.1)]"
                                defaultValue={editingPost.content}
                                placeholder="Conteúdo do post"
                                rows={4}
                                onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                            />
                            <input
                                className="w-full py-3 px-4 text-[0.9375rem] font-semibold text-[var(--color-text-primary)] bg-[var(--color-bg-input)] border border-[var(--color-border)] rounded-xl outline-none font-[inherit] transition-all duration-200 placeholder:text-[var(--color-text-placeholder)] placeholder:font-normal focus:border-[var(--color-border-focus)] focus:bg-[var(--color-bg-input)] focus:shadow-[0_0_0_3px_rgba(29,155,240,0.1)]"
                                defaultValue={editingPost.image || ''}
                                placeholder="URL da imagem (opcional)"
                                onChange={(e) => setEditingPost({ ...editingPost, image: e.target.value })}
                            />
                            <div className="flex items-center justify-end gap-2.5 mt-1">
                                <button
                                    className="py-2 px-5 text-[0.8125rem] font-semibold rounded-full cursor-pointer transition-all duration-200 font-[inherit] text-[var(--color-text-secondary)] bg-transparent border border-[var(--color-border)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-placeholder)]"
                                    onClick={() => setEditingPost(null)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className="py-2 px-5 text-[0.8125rem] font-semibold rounded-full cursor-pointer transition-all duration-200 font-[inherit] text-[var(--color-text-primary)] bg-[var(--color-accent)] border-none hover:bg-[var(--color-accent-hover)]"
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
            <footer className="py-4 px-8 bg-[var(--color-bg-header)] backdrop-blur-md border-t border-[var(--color-border)]">
                <span className="text-sm font-semibold text-[var(--color-text-secondary)]">Mini Twitter</span>
            </footer>
        </div>
    )
}