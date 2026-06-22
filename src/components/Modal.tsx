import { type ReactNode } from "react"
import { X } from "lucide-react"

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

const Modal = ({ open, onClose, title, children }: ModalProps) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative z-10 w-full max-w-lg rounded-[32px] bg-white/90 backdrop-blur-xl border border-green-100 p-8 shadow-[0_30px_100px_rgba(34,197,94,0.2)]">
        {/* glow accent */}
        <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-green-300 blur-3xl opacity-40 pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-black text-green-950">{title}</h3>
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-full bg-green-50 flex items-center justify-center hover:bg-green-100 transition"
          >
            <X size={16} className="text-green-700" />
          </button>
        </div>

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Modal
