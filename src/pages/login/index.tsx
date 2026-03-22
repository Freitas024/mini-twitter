import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Mail, Eye, EyeOff } from 'lucide-react'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginSchema } from '../../validations';
import { authService } from '../../services/authService';

export default function Login() {
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data: LoginSchema) => {
        try {
            const result = await authService.login(data.email, data.password);
            localStorage.setItem('token', result.token);
            localStorage.setItem('userId', String(result.user.id));
            navigate('/home');
        } catch (error) {
            console.log(error);
        }
    }

    const handleTabChange = (tab: 'login' | 'register') => {
        if (tab === 'register') {
            navigate('/register')
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
                    <h2 className="login-greeting">Olá, de novo!</h2>
                    <p className="login-subtitle">
                        Por favor, insira os seus dados para fazer login.
                    </p>
                </div>

                {/* Formulário */}
                <form onSubmit={handleSubmit(onSubmit)} className="login-form">


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