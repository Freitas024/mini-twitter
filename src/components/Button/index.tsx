import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant?: 'primary' | 'ghost'
    isLoading?: boolean
}

const variantClasses = {
    primary: [
        'w-full py-[0.9375rem] mt-2 text-[0.9375rem] font-semibold text-[var(--color-text-primary)]',
        'bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-hover)]',
        'border-none rounded-full cursor-pointer',
        'shadow-[0_4px_15px_rgba(29,155,240,0.3)]',
        'transition-all duration-200',
        'hover:-translate-y-px hover:shadow-[0_6px_25px_rgba(29,155,240,0.4)]',
        'active:translate-y-0 active:shadow-[0_2px_10px_rgba(29,155,240,0.3)]',
        'disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0',
    ].join(' '),
    ghost: [
        'py-3 px-5 text-sm font-medium text-[var(--color-text-secondary)]',
        'bg-transparent border border-[var(--color-border)] rounded-full cursor-pointer',
        'transition-all duration-200',
        'hover:bg-[var(--color-bg-input)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-focus)]',
        'disabled:opacity-50 disabled:cursor-not-allowed',
    ].join(' '),
}

export default function Button({
    children,
    variant = 'primary',
    isLoading = false,
    className = '',
    disabled,
    ...props
}: ButtonProps) {
    return (
        <button
            className={`${variantClasses[variant]} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? 'Carregando...' : children}
        </button>
    )
}
