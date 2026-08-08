import type { InputHTMLAttributes } from 'react'

type TextInputProps = InputHTMLAttributes<HTMLInputElement>

export function TextInput({ className = '', ...props }: TextInputProps) {
  return (
    <input
      className={`min-h-10 w-full rounded-[3px] border border-transparent bg-[#a6a6a6] px-4 text-sm text-[#152025] outline-none placeholder:text-[#4c5558] focus:border-[#72fb81] focus:ring-2 focus:ring-[#72fb81]/35 ${className}`}
      {...props}
    />
  )
}
