import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant?: 'primary' | 'ghost'
    isLoading?: boolean
}

export default function Button({
    children,
    variant = 'primary',
    isLoading = false,
    className = '',
    disabled,
    ...props
}: ButtonProps) {
    const baseClass = variant === 'primary' ? 'btn-primary' : 'btn-ghost'

    return (
        <button
            className={`${baseClass} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? 'Carregando...' : children}
        </button>
    )
}
