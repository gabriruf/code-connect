import { LoginForm } from '../../organisms/LoginForm/LoginForm'
import { AuthLayout } from '../../templates/AuthLayout/AuthLayout'

export function LoginPage() {
  return (
    <AuthLayout bannerAlt="Pessoa trabalhando em uma interface de tecnologia" bannerSrc="/banner-login.png">
      <header className="mb-11">
        <h1 className="text-3xl font-bold tracking-tight text-[#e7e8e8]">Login</h1>
        <p className="mt-8 text-xl text-[#e7e8e8]">Boas-vindas! Faça seu login.</p>
      </header>
      <LoginForm />
    </AuthLayout>
  )
}
