export function AccountDivider() {
  return (
    <div className="flex items-center gap-4" aria-label="ou entre com outras contas" role="separator">
      <span className="h-px flex-1 bg-[#969b9c]" />
      <span className="whitespace-nowrap text-sm text-[#e7e8e8]">ou entre com outras contas</span>
      <span className="h-px flex-1 bg-[#969b9c]" />
    </div>
  )
}
