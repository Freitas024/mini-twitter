import { render, screen } from '@testing-library/react'
import CreatePost from './index'
import userEvent from '@testing-library/user-event'

describe('CreatePost', () => {
    describe('CreatePost', () => {
        it('deve desabilitar o botão quando os campos estão vazios', () => {
            render(<CreatePost onSubmit={() => { }} />)
            expect(screen.getByText('Postar')).toBeDisabled()
        })

        it('deve habilitar o botao quando o conteudo for preenchido', async () => {
            render(<CreatePost onSubmit={() => { }} />)
            await userEvent.type(screen.getByPlaceholderText('Título do post'), 'Título')
            await userEvent.type(screen.getByPlaceholderText('E aí, o que está rolando?'), 'Conteúdo')
            expect(screen.getByText('Postar')).toBeEnabled()
        })
    })


})