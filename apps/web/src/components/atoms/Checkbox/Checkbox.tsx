import type { InputHTMLAttributes } from 'react'

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export function Checkbox({ className = '', ...props }: CheckboxProps) {
  return (
    <input
      className={`size-5 cursor-pointer appearance-none rounded-[3px] border-2 border-[#9da1a1] bg-transparent bg-center bg-no-repeat checked:border-[#a6a6a6] checked:bg-[linear-gradient(45deg,transparent_45%,#72fb81_45%,#72fb81_55%,transparent_55%),linear-gradient(135deg,transparent_45%,#72fb81_45%,#72fb81_55%,transparent_55%)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#72fb81] ${className}`}
      type="checkbox"
      {...props}
    />
  )
}
