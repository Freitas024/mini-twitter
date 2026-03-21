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
            <div className="input-field">
                {label && (
                    <label htmlFor={id} className="input-label">
                        {label}
                    </label>
                )}
                <div className="input-wrapper">
                    <input
                        id={id}
                        ref={ref}
                        className={`input ${className}`}
                        {...props}
                    />
                    {actionIcon ? (
                        <button
                            type="button"
                            className="input-icon input-icon--clickable"
                            onClick={onActionClick}
                            tabIndex={-1}
                        >
                            {actionIcon}
                        </button>
                    ) : icon ? (
                        <span className="input-icon">{icon}</span>
                    ) : null}
                </div>
            </div>
        )
    }
)

Input.displayName = 'Input'

export default Input
