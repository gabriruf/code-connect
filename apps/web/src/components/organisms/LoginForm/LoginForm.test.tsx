import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { LoginForm } from './LoginForm'

describe('LoginForm', () => {
  it('renders the login controls and future navigation links', () => {
    render(<LoginForm />)

    expect(screen.getByLabelText('Email ou usuário')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Esqueci a senha' })).toHaveAttribute('href', '/recuperar-senha')
    expect(screen.getByRole('link', { name: /Crie seu cadastro/ })).toHaveAttribute('href', '/cadastro')
    expect(screen.getByRole('button', { name: 'Entrar com GitHub' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Entrar com Gmail' })).toBeInTheDocument()
  })

  it('shows required field errors after an empty submission', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    await user.click(screen.getByRole('button', { name: /Login/ }))

    expect(await screen.findByText('Informe seu email ou usuário.')).toBeInTheDocument()
    expect(screen.getByText('Informe sua senha.')).toBeInTheDocument()
  })

  it('updates remember-me and submits valid credentials', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<LoginForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText('Email ou usuário'), 'usuario123')
    await user.type(screen.getByLabelText('Senha'), 'senha-segura')
    await user.click(screen.getByLabelText('Lembrar-me'))
    await user.click(screen.getByRole('button', { name: /Login/ }))

    expect(screen.getByLabelText('Lembrar-me')).toBeChecked()
    expect(onSubmit).toHaveBeenCalledWith({
      identifier: 'usuario123',
      password: 'senha-segura',
      rememberMe: true,
    })
  })
})
