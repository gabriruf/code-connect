import type { AnchorHTMLAttributes, ReactNode } from 'react'

type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
  tone?: 'default' | 'accent'
}

export function TextLink({ children, className = '', tone = 'default', ...props }: TextLinkProps) {
  const toneClasses = tone === 'accent' ? 'text-[#72fb81] hover:text-[#a5ffac]' : 'text-[#e7e8e8] hover:text-[#72fb81]'

  return (
    <a
      className={`rounded-sm underline underline-offset-2 transition focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#72fb81] ${toneClasses} ${className}`}
      {...props}
    >
      {children}
    </a>
  )
}
