import type { ReactNode } from 'react'

type FormFieldProps = {
  children: ReactNode
  error?: string
  id: string
  label: string
}

export function FormField({ children, error, id, label }: FormFieldProps) {
  const errorId = `${id}-error`

  return (
    <div className="space-y-1.5">
      <label className="block text-base font-medium text-[#e7e8e8]" htmlFor={id}>
        {label}
      </label>
      {children}
      {error ? (
        <p className="text-xs text-[#ff9d9d]" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
