import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'primary' | 'social'
}

export function Button({
  children,
  className = '',
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center rounded-md font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#72fb81] disabled:cursor-not-allowed disabled:opacity-60'
  const variantClasses =
    variant === 'primary'
      ? 'min-h-13 w-full bg-[#72fb81] px-5 text-base text-[#071316] hover:bg-[#9aff9f]'
      : 'flex-col gap-1 rounded-none bg-transparent px-3 py-1 text-xs font-normal text-[#dce0e0] hover:text-[#72fb81]'

  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} type={type} {...props}>
      {children}
    </button>
  )
}
