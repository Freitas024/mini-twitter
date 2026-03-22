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
        <div className="post-card">
            {/* Header do post */}
            <div className="post-card__header">
                <span className="post-card__author">{post.authorName}</span>
                <span className="post-card__username">@{username}</span>
                <span className="post-card__separator">·</span>
                <span className="post-card__date">{formattedDate}</span>
            </div>

            {/* Conteúdo */}
            <h3 className="post-card__title">{post.title}</h3>
            <p className="post-card__content">{post.content}</p>

            {/* Imagem (opcional) */}
            {post.image && (
                <div className="post-card__image-wrapper">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="post-card__image"
                    />
                </div>
            )}

            {/* Ações */}
            <div className="post-card__actions">
                <button
                    type="button"
                    className={`post-card__like ${post.likedByMe ? 'post-card__like--active' : ''}`}
                    onClick={() => onLike?.(post.id)}
                >
                    <Heart
                        size={18}
                        fill={post.likedByMe ? '#f91880' : 'none'}
                    />
                    {post.likesCount > 0 && (
                        <span className="post-card__like-count">{post.likesCount}</span>
                    )}
                </button>

                {isOwner && (
                    <div className="post-card__owner-actions">
                        <button
                            type="button"
                            className="post-card__action-btn post-card__action-btn--edit"
                            onClick={() => onEdit?.(post)}
                            title="Editar"
                        >
                            <Pencil size={16} />
                        </button>
                        <button
                            type="button"
                            className="post-card__action-btn post-card__action-btn--delete"
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
