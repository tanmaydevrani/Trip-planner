'use client'

import { Download } from 'lucide-react'

export default function ExportButton() {
  function handlePrint() {
    window.print()
  }

  return (
    <button
      onClick={handlePrint}
      className="
        flex items-center gap-2 text-sm px-4 py-2 rounded-xl
        border border-stone-200 text-stone-500 bg-white
        hover:border-stone-300 hover:text-stone-700
        transition-all duration-150 print:hidden
      "
    >
      <Download size={14} />
      Save trip
    </button>
  )
}
