import { type InputHTMLAttributes, type ReactNode, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    icon?: ReactNode
    actionIcon?: ReactNode
    onActionClick?: () => void
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, icon, actionIcon, onActionClick, id, className = '', ...props }, ref) => {
        return (
            <div className="flex flex-col gap-2">
                {label && (
                    <label htmlFor={id} className="text-[0.8125rem] font-medium text-[var(--color-text-secondary)]">
                        {label}
                    </label>
                )}
                <div className="relative flex items-center">
                    <input
                        id={id}
                        ref={ref}
                        className={`w-full py-3.5 pr-12 pl-4 text-sm text-[var(--color-text-primary)] bg-[var(--color-bg-input)] border border-[var(--color-border)] rounded-xl outline-none transition-all duration-250 placeholder:text-[var(--color-text-placeholder)] focus:border-[var(--color-border-focus)] focus:bg-[var(--color-bg-input)] focus:shadow-[0_0_0_3px_rgba(29,155,240,0.1)] ${className}`}
                        {...props}
                    />
                    {actionIcon ? (
                        <button
                            type="button"
                            className="absolute right-4 text-[var(--color-text-muted)] flex items-center justify-center pointer-events-auto cursor-pointer bg-transparent border-none p-0 transition-colors duration-200 hover:text-[var(--color-text-secondary)]"
                            onClick={onActionClick}
                            tabIndex={-1}
                        >
                            {actionIcon}
                        </button>
                    ) : icon ? (
                        <span className="absolute right-4 text-[var(--color-text-muted)] flex items-center justify-center pointer-events-none">
                            {icon}
                        </span>
                    ) : null}
                </div>
            </div>
        )
    }
)

Input.displayName = 'Input'

export default Input
