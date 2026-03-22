import { createContext, useState, useEffect } from 'react';

interface AuthContextType {
    userId: string | null
    isDark: boolean
    toggleTheme: () => void
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {

    const userId = localStorage.getItem('userId');
    const [isDark, setIsDark] = useState<boolean>(() => {
        const savedTheme = localStorage.getItem('Theme')
        if (savedTheme) {
            return savedTheme === 'dark'
        }
        return false;
    });

    const toggleTheme = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle('dark');
    }

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.remove('light');
        } else {
            document.documentElement.classList.add('light');
        }

        localStorage.setItem('Theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    return (
        <AuthContext.Provider value={{ userId, isDark, toggleTheme }}>
            {children}
        </AuthContext.Provider>
    )
}
