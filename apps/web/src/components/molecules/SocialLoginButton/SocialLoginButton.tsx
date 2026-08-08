import { Button } from '../../atoms/Button/Button'

type SocialLoginButtonProps = {
  iconSrc: string
  provider: string
}

export function SocialLoginButton({ iconSrc, provider }: SocialLoginButtonProps) {
  return (
    <Button aria-label={`Entrar com ${provider}`} variant="social">
      <img alt="" className="h-[3.45rem] w-10 object-contain" src={iconSrc} />
    </Button>
  )
}
