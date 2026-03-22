import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Eye, EyeOff } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { registerSchema, type RegisterSchema } from '../../validations'
import { authService } from '../../services/authService'

export default function Register() {
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('register')
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema)
    })

    const onSubmit = async (data: RegisterSchema) => {
        try {
            await authService.register(data.name, data.email, data.password)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    const handleTabChange = (tab: 'login' | 'register') => {
        if (tab === 'login') {
            navigate('/')
        }
        setActiveTab(tab)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[var(--color-bg-primary)] via-[var(--color-bg-secondary)] to-[var(--color-bg-primary)] p-6 font-[Inter,system-ui,sans-serif]">
            <div className="w-full max-w-[440px] flex flex-col items-center">
                {/* Título */}
                <h1 className="text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight mb-10 text-center">Mini Twitter</h1>

                {/* Tabs */}
                <div className="flex w-full border-b border-[var(--color-border)] mb-8">
                    <button
                        type="button"
                        className={`flex-1 py-3.5 text-[0.9375rem] font-medium bg-transparent border-none cursor-pointer relative transition-colors duration-250 hover:text-[var(--color-text-secondary)] ${activeTab === 'login' ? 'text-[var(--color-text-primary)] tab-active' : 'text-[var(--color-text-muted)]'}`}
                        onClick={() => handleTabChange('login')}
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        className={`flex-1 py-3.5 text-[0.9375rem] font-medium bg-transparent border-none cursor-pointer relative transition-colors duration-250 hover:text-[var(--color-text-secondary)] ${activeTab === 'register' ? 'text-[var(--color-text-primary)] tab-active' : 'text-[var(--color-text-muted)]'}`}
                        onClick={() => handleTabChange('register')}
                    >
                        Cadastrar
                    </button>
                </div>

                {/* Cabeçalho do formulário */}
                <div className="w-full mb-7">
                    <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Olá, vamos começar!</h2>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                        Por favor, insira os dados solicitados para fazer cadastro.
                    </p>
                </div>

                {/* Formulário */}
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
                    <Input
                        id="name"
                        type="text"
                        label="Nome"
                        placeholder="Insira o seu nome"
                        icon={<User size={20} />}
                        {...register('name')}
                    />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                    <Input
                        id="email"
                        type="email"
                        label="E-mail"
                        placeholder="Insira o seu e-mail"
                        icon={<Mail size={20} />}
                        {...register('email')}
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                    <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        label="Senha"
                        placeholder="Insira a sua senha"
                        actionIcon={showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        onActionClick={() => setShowPassword(!showPassword)}
                        {...register('password')}
                    />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                    <Button type="submit" isLoading={isSubmitting}>
                        Continuar
                    </Button>
                </form>

                {/* Rodapé */}
                <p className="mt-7 text-xs text-[var(--color-text-placeholder)] text-center leading-relaxed">
                    Ao clicar em continuar, você concorda com nossos
                    <br />
                    <a href="#" className="text-[var(--color-text-secondary)] no-underline transition-colors duration-200 hover:text-[var(--color-accent)] hover:underline">
                        Termos de Serviço
                    </a>{' '}
                    e{' '}
                    <a href="#" className="text-[var(--color-text-secondary)] no-underline transition-colors duration-200 hover:text-[var(--color-accent)] hover:underline">
                        Política de Privacidade
                    </a>
                    .
                </p>
            </div>
        </div>
    )
}