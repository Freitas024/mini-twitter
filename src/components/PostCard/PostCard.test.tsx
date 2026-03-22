import { render, screen } from '@testing-library/react';
import PostCard from './index';

const mockPost = {
    id: 1,
    title: 'Título de teste',
    content: 'Conteúdo de teste',
    image: undefined,
    authorId: 1,
    authorName: 'Usuário Teste',
    likesCount: 0,
    likedByMe: false,
    createdAt: '2026-03-22T00:00:00.000Z',
}

describe('PostCard', () => {
    it('deve renderizar o titulo do post', () => {
        render(<PostCard post={mockPost} />)
        expect(screen.getByText('Título de teste')).toBeInTheDocument()
    })

    it('deve renderizar o conteudo do post', () => {
        render(<PostCard post={mockPost} />)
        expect(screen.getByText('Conteúdo de teste')).toBeInTheDocument()
    })

    it('deve renderizar o botao de like', () => {
        render(<PostCard post={mockPost} />)
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('deve renderizar o icone de editar e deletar quando for o dono', () => {
        localStorage.setItem('userId', '1')
        render(<PostCard post={mockPost} />)
        expect(screen.getByTitle('Editar')).toBeInTheDocument()
        expect(screen.getByTitle('Deletar')).toBeInTheDocument()
    })

    it('nao deve renderizar o icone de editar e deletar quando nao for o dono', () => {
        localStorage.setItem('userId', '2')
        render(<PostCard post={mockPost} />)
        expect(screen.queryByTitle('Editar')).not.toBeInTheDocument()
        expect(screen.queryByTitle('Deletar')).not.toBeInTheDocument()
    })
});