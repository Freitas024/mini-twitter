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
        <div className="login-page">
            <div className="login-container">
                {/* Título */}
                <h1 className="login-title">Mini Twitter</h1>

                {/* Tabs */}
                <div className="login-tabs">
                    <button
                        type="button"
                        className={`login-tab ${activeTab === 'login' ? 'login-tab--active' : ''}`}
                        onClick={() => handleTabChange('login')}
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        className={`login-tab ${activeTab === 'register' ? 'login-tab--active' : ''}`}
                        onClick={() => handleTabChange('register')}
                    >
                        Cadastrar
                    </button>
                </div>

                {/* Cabeçalho do formulário */}
                <div className="login-header">
                    <h2 className="login-greeting">Olá, vamos começar!</h2>
                    <p className="login-subtitle">
                        Por favor, insira os dados solicitados para fazer cadastro.
                    </p>
                </div>

                {/* Formulário */}
                <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                    <Input
                        id="name"
                        type="text"
                        label="Nome"
                        placeholder="Insira o seu nome"
                        icon={<User size={20} />}
                        {...register('name')}
                    />
                    {errors.name && <p className="error-message text-red-500">{errors.name.message}</p>}

                    <Input
                        id="email"
                        type="email"
                        label="E-mail"
                        placeholder="Insira o seu e-mail"
                        icon={<Mail size={20} />}
                        {...register('email')}
                    />
                    {errors.email && <p className="error-message text-red-500">{errors.email.message}</p>}

                    <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        label="Senha"
                        placeholder="Insira a sua senha"
                        actionIcon={showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        onActionClick={() => setShowPassword(!showPassword)}
                        {...register('password')}
                    />
                    {errors.password && <p className="error-message text-red-500">{errors.password.message}</p>}

                    <Button type="submit" isLoading={isSubmitting}>
                        Continuar
                    </Button>
                </form>

                {/* Rodapé */}
                <p className="login-footer">
                    Ao clicar em continuar, você concorda com nossos
                    <br />
                    <a href="#" className="login-footer-link">
                        Termos de Serviço
                    </a>{' '}
                    e{' '}
                    <a href="#" className="login-footer-link">
                        Política de Privacidade
                    </a>
                    .
                </p>
            </div>
        </div>
    )
}