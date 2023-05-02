import { ReactNode, useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { BaseButton } from './BaseButon'
import { BaseIcon } from './BaseIcon'

interface Props {
  title: string
  visible: boolean
  children: ReactNode
  onClose: () => void
  onConfirm: () => void
}

export function BaseModal({
  visible,
  title,
  children,
  onClose,
  onConfirm
}: Props) {
  const modalRef = useRef<HTMLDivElement>(null)

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    },
    [onClose]
  )

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    },
    [modalRef, onClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleEscape)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleEscape, handleClickOutside])

  if (!visible) return null

  return createPortal(
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen justify-center bg-black/50">
      <div
        className="mt-28 h-fit max-w-xs rounded bg-white p-6 shadow-md md:max-w-sm"
        ref={modalRef}
      >
        <div className="flex justify-between">
          <span className="text-xl font-bold">{title}</span>
          <button onClick={onClose}>
            <BaseIcon icon="ic:outline-close" />
          </button>
        </div>
        <div className="mt-6">{children}</div>

        <div className="mt-4 flex justify-end gap-2">
          <BaseButton variant="secondary" onClick={onClose}>
            Cancelar
          </BaseButton>
          <BaseButton variant="primary" onClick={onConfirm}>
            Confirmar
          </BaseButton>
        </div>
      </div>
    </div>,
    document.body
  )
}
