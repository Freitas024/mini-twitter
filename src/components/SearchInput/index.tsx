import { type InputHTMLAttributes, forwardRef } from 'react'
import { Search } from 'lucide-react'

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> { }

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
    ({ className = '', ...props }, ref) => {
        return (
            <div className="relative flex items-center flex-1 max-w-[480px] mx-8">
                <Search size={18} className="absolute left-3.5 text-[var(--color-text-muted)] pointer-events-none" />
                <input
                    ref={ref}
                    type="text"
                    className={`w-full py-2.5 pr-4 pl-10 text-[0.8125rem] text-[var(--color-text-primary)] bg-[var(--color-bg-input)] border border-[var(--color-border)] rounded-[10px] outline-none transition-all duration-250 placeholder:text-[var(--color-text-placeholder)] focus:border-[var(--color-border-focus)] focus:bg-[var(--color-bg-input)] focus:shadow-[0_0_0_3px_rgba(29,155,240,0.08)] ${className}`}
                    {...props}
                />
            </div>
        )
    }
)

SearchInput.displayName = 'SearchInput'

export default SearchInput
