import { Heart, Pencil, Trash2 } from 'lucide-react'
import type { Post } from '../../types'

interface PostCardProps {
    post: Post
    onLike?: (postId: number) => void
    onEdit?: (post: Post) => void
    onDelete?: (postId: number) => void
}

export default function PostCard({ post, onLike, onEdit, onDelete }: PostCardProps) {
    const formattedDate = new Date(post.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })

    const username = post.authorName.toLowerCase().replace(/\s+/g, '')
    const currentUserId = Number(localStorage.getItem('userId'));
    const isOwner = post.authorId === currentUserId;

    return (
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-5 mb-4 transition-colors duration-200 hover:border-[var(--color-border-focus)]">
            {/* Header do post */}
            <div className="flex items-center gap-1.5 mb-2.5 flex-wrap">
                <span className="text-[0.9375rem] font-semibold text-[var(--color-text-primary)]">{post.authorName}</span>
                <span className="text-[0.8125rem] text-[var(--color-text-muted)]">@{username}</span>
                <span className="text-[0.8125rem] text-[var(--color-text-placeholder)]">·</span>
                <span className="text-[0.8125rem] text-[var(--color-text-muted)]">{formattedDate}</span>
            </div>

            {/* Conteúdo */}
            <h3 className="text-base font-bold text-[var(--color-text-primary)] mb-1.5 leading-[1.4]">{post.title}</h3>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-3">{post.content}</p>

            {/* Imagem (opcional) */}
            {post.image && (
                <div className="mb-3 rounded-xl overflow-hidden">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full block object-cover max-h-80"
                    />
                </div>
            )}

            {/* Ações */}
            <div className="flex items-center justify-between">
                <button
                    type="button"
                    className={`flex items-center gap-1.5 bg-transparent border-none cursor-pointer p-1 rounded-md transition-colors duration-200 hover:text-[var(--color-like)] ${post.likedByMe ? 'text-[var(--color-like)]' : 'text-[var(--color-text-muted)]'}`}
                    onClick={() => onLike?.(post.id)}
                >
                    <Heart
                        size={18}
                        fill={post.likedByMe ? 'var(--color-like)' : 'none'}
                    />
                    {post.likesCount > 0 && (
                        <span className="text-[0.8125rem] font-medium text-[var(--color-text-primary)]">{post.likesCount}</span>
                    )}
                </button>

                {isOwner && (
                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            className="flex items-center justify-center p-1.5 bg-transparent border-none rounded-lg cursor-pointer text-[var(--color-text-muted)] transition-all duration-200 hover:text-[var(--color-accent)] hover:bg-[var(--color-bg-input)]"
                            onClick={() => onEdit?.(post)}
                            title="Editar"
                        >
                            <Pencil size={16} />
                        </button>
                        <button
                            type="button"
                            className="flex items-center justify-center p-1.5 bg-transparent border-none rounded-lg cursor-pointer text-[var(--color-text-muted)] transition-all duration-200 hover:text-[#f4212e] hover:bg-[var(--color-bg-input)]"
                            onClick={() => onDelete?.(post.id)}
                            title="Deletar"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
