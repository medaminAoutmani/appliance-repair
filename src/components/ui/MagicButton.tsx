import React from 'react'
import { cn } from '@/lib/utils'

function MagicButton({ button, border, content, title, onClick }: { button?: string, border?: string, content?: string, title: string, onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(`relative  inline-flex h-8 overflow-hidden rounded-full p-[1px] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 `, button)}
    >
      <span className={cn(`absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] `, border)} />
      <span className={cn(`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full  px-3 py-1 text-sm font-medium bg-slate-950 text-white backdrop-blur-3xl transition-all duration-300 `, content)}>
        {title}
      </span>
    </button>
  )
}

export default MagicButton