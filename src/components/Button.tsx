import type { ComponentProps } from "react"


type Variant = 'primary' | 'secondary' | 'ghost-destructive'

type ButtonProps = {
  variant?: Variant
} & ComponentProps<"button">

export function Button({
  variant = 'primary',
  className,       
  ...props
}: ButtonProps) {
  return <button
    {...props}
    className={[
      'transition-colors px-4 py-2 rounded-lg',
      'disabled:opacity-30 disabled:cursor-not-allowed',
      getVariantClass(variant),    
      className,                    
    ].filter(Boolean).join(' ')}
  />
}

function getVariantClass(variant: Variant) {
  switch (variant) {
    case 'primary':
      return 'bg-pink-500 text-white hover:bg-pink-600'
    case 'secondary':
      return 'bg-gray-500 text-white hover:bg-gray-600'
    case 'ghost-destructive':
      return 'hover:bg-red-700 text-red-700 hover:text-red-200'
    default:
      throw new Error(`Invalid variant: ${variant}`)
  }
}