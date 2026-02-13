import React from 'react'

export const Button = ({label, variant="outlined"}) => {
    const styles = {
        "outlined": "px-10 py-3.5 rounded-2xl text-sm text-[var(--dark-grey)]",
        "filled": "px-10 py-3.5 rounded-2xl text-sm text-white bg-[var(--dark-grey)]",
        "secondary-outlined": "pl-3 pr-3.5 py-2 rounded-full text-md text-[var(--dark-grey)] leading-none flex items-center gap-2"
    }
  return (
    <button className={`border-2 border-[var(--dark-grey)] font-semibold transition-all duration-300 ${styles[variant]}`}>
        {variant.includes("secondary") && (
            <span className='block bg-[var(--dark-grey)] w-2 aspect-square rounded-full'></span>
        )}
        {label}
    </button>
  )
}