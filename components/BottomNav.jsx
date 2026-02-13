import React from 'react'
import { Button } from './custom/Button'

function BottomNav() {
  return (
      <div className="fixed z-[99] bottom-12 right-16 flex gap-2">
        <Button label="SHOP" variant='secondary-outlined'/>
        <Button label="CART" variant='secondary-outlined'/>
      </div>
  )
}

export default BottomNav