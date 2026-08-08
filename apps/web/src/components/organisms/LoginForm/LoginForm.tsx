import { useState } from 'react'
import { Button } from '../../atoms/Button/Button'
import { Checkbox } from '../../atoms/Checkbox/Checkbox'
import { TextInput } from '../../atoms/TextInput/TextInput'
import { TextLink } from '../../atoms/TextLink/TextLink'
import { AccountDivider } from '../../molecules/AccountDivider/AccountDivider'
import { FormField } from '../../molecules/FormField/FormField'
import { SocialLoginButton } from '../../molecules/SocialLoginButton/SocialLoginButton'

export type LoginCredentials = {
  identifier: string
  password: string
  rememberMe: boolean
}

type LoginFormProps = {
  onSubmit?: (credentials: LoginCredentials) => void
}

type FormErrors = Partial<Record<'identifier' | 'password', string>>

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    identifier: '',
    password: '',
    rememberMe: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})

  function updateCredential<Key extends keyof LoginCredentials>(key: Key, value: LoginCredentials[Key]) {
    setCredentials((current) => ({ ...current, [key]: value }))
    if (key !== 'rememberMe') {
      setErrors((current) => ({ ...current, [key]: undefined }))
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors: FormErrors = {}

    if (!credentials.identifier.trim()) {
      nextErrors.identifier = 'Informe seu email ou usuário.'
    }
    if (!credentials.password) {
      nextErrors.password = 'Informe sua senha.'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      onSubmit?.(credentials)
    }
  }

  return (
    <form className="space-y-5" noValidate onSubmit={handleSubmit}>
      <FormField error={errors.identifier} id="login-identifier" label="Email ou usuário">
        <TextInput
          aria-describedby={errors.identifier ? 'login-identifier-error' : undefined}
          aria-invalid={Boolean(errors.identifier)}
          autoComplete="username"
          id="login-identifier"
          onChange={(event) => updateCredential('identifier', event.target.value)}
          placeholder="usuario123"
          value={credentials.identifier}
        />
      </FormField>

      <FormField error={errors.password} id="login-password" label="Senha">
        <TextInput
          aria-describedby={errors.password ? 'login-password-error' : undefined}
          aria-invalid={Boolean(errors.password)}
          autoComplete="current-password"
          id="login-password"
          onChange={(event) => updateCredential('password', event.target.value)}
          placeholder="••••••"
          type="password"
          value={credentials.password}
        />
      </FormField>

      <div className="flex items-center justify-between gap-3 text-sm">
        <label className="flex cursor-pointer items-center gap-2 text-[#aeb2b2]" htmlFor="remember-me">
          <Checkbox
            checked={credentials.rememberMe}
            id="remember-me"
            onChange={(event) => updateCredential('rememberMe', event.target.checked)}
          />
          Lembrar-me
        </label>
        <TextLink href="/recuperar-senha">Esqueci a senha</TextLink>
      </div>

      <Button type="submit">
        Login <span aria-hidden="true" className="ml-2 text-xl font-normal">→</span>
      </Button>

      <AccountDivider />

      <div className="flex justify-center gap-3">
        <SocialLoginButton iconSrc="/GitHub.png" provider="GitHub" />
        <SocialLoginButton iconSrc="/Gmail.png" provider="Gmail" />
      </div>

      <p className="pt-1 text-center text-sm text-[#e7e8e8]">
        Ainda não tem conta?
        <TextLink className="mt-2 inline-flex font-medium" href="/cadastro" tone="accent">
          Crie seu cadastro! <span aria-hidden="true" className="ml-2">▣</span>
        </TextLink>
      </p>
    </form>
  )
}
