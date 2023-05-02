import { BaseModal } from '../Base/BaseModal'

interface Props {
  visible: boolean
  onClose: () => void
  onConfirm: () => void
  productTitle: string
}

export function RemoveCartItemModal({
  visible,
  onClose,
  onConfirm,
  productTitle
}: Props) {
  return (
    <BaseModal
      title="Remover item do carrinho"
      visible={visible}
      onClose={onClose}
      onConfirm={onConfirm}
    >
      <p>Tem certeza que deseja remover {productTitle} do carrinho?</p>
    </BaseModal>
  )
}
