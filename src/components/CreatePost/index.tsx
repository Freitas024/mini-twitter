import { useState } from 'react'
import { ImagePlus } from 'lucide-react'

interface CreatePostProps {
    onSubmit: (title: string, content: string, image?: string) => void
    isLoading?: boolean
}

export default function CreatePost({ onSubmit, isLoading = false }: CreatePostProps) {
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [showImageInput, setShowImageInput] = useState(false)

    const handleSubmit = () => {
        if (!content.trim()) return
        onSubmit(title.trim(), content.trim(), image.trim() || undefined)
        setContent('')
        setTitle('')
        setImage('')
        setShowImageInput(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
        }
    }

    return (
        <div className="create-post">
            <input
                type="text"
                className="create-post__title"
                placeholder="Título do post"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                className="create-post__input"
                placeholder="E aí, o que está rolando?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={2}
            />
            {showImageInput && (
                <input
                    type="text"
                    className="create-post__image-url"
                    placeholder="Cole a URL da imagem aqui"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
            )}
            <div className="create-post__actions">
                <button type="button" className="create-post__image-btn" title="Adicionar imagem">
                    <ImagePlus size={22} onClick={() => setShowImageInput(!showImageInput)} />
                </button>
                <button
                    type="button"
                    className="create-post__submit"
                    onClick={handleSubmit}
                    disabled={!content.trim() || isLoading}
                >
                    {isLoading ? 'Postando...' : 'Postar'}
                </button>
            </div>
        </div>
    )
}
