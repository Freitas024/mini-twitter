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
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl overflow-hidden mb-6 transition-colors duration-200 focus-within:border-[var(--color-border-focus)]">
            <input
                type="text"
                className="w-full pt-4 px-5 pb-2.5 text-[0.9375rem] font-semibold text-[var(--color-text-primary)] bg-transparent border-none outline-none font-[inherit] placeholder:text-[var(--color-text-placeholder)] placeholder:font-normal"
                placeholder="Título do post"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                className="w-full px-5 pb-4 pt-1.5 text-sm text-[var(--color-text-secondary)] bg-transparent border-none outline-none resize-none min-h-12 font-[inherit] leading-relaxed placeholder:text-[var(--color-text-placeholder)]"
                placeholder="E aí, o que está rolando?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={2}
            />
            {showImageInput && (
                <input
                    type="text"
                    className="w-[calc(100%-2.5rem)] mx-5 mb-3 py-2.5 px-3.5 text-[0.8125rem] text-[var(--color-text-primary)] bg-[var(--color-bg-input)] border border-[var(--color-border)] rounded-[10px] outline-none font-[inherit] transition-all duration-200 placeholder:text-[var(--color-text-placeholder)] focus:border-[var(--color-border-focus)] focus:shadow-[0_0_0_3px_rgba(29,155,240,0.08)]"
                    placeholder="Cole a URL da imagem aqui"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
            )}
            <div className="flex items-center justify-between py-2.5 px-4 border-t border-[var(--color-border)]">
                <button
                    type="button"
                    className="flex items-center justify-center p-1.5 text-[var(--color-accent)] bg-transparent border-none rounded-lg cursor-pointer transition-colors duration-200 hover:bg-[var(--color-bg-input)]"
                    title="Adicionar imagem"
                >
                    <ImagePlus size={22} onClick={() => setShowImageInput(!showImageInput)} />
                </button>
                <button
                    type="button"
                    className="py-2 px-5 text-[0.8125rem] font-semibold text-[var(--color-text-primary)] bg-[var(--color-accent)] border-none rounded-full cursor-pointer transition-all duration-200 hover:bg-[var(--color-accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleSubmit}
                    disabled={!content.trim() || isLoading}
                >
                    {isLoading ? 'Postando...' : 'Postar'}
                </button>
            </div>
        </div>
    )
}
