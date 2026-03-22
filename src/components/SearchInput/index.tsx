import { type InputHTMLAttributes, forwardRef } from 'react'
import { Search } from 'lucide-react'

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> { }

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
    ({ className = '', ...props }, ref) => {
        return (
            <div className="search-input-wrapper">
                <Search size={18} className="search-input-icon" />
                <input
                    ref={ref}
                    type="text"
                    className={`search-input ${className}`}
                    {...props}
                />
            </div>
        )
    }
)

SearchInput.displayName = 'SearchInput'

export default SearchInput
