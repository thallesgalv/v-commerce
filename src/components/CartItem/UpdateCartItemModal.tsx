import { BaseModal } from '../Base/BaseModal'

interface Props {
  visible: boolean
  onClose: () => void
  onConfirm: () => void
  productTitle: string
  currentQuantity: string
}

export function UpdateCartItemModal({
  visible,
  onClose,
  onConfirm,
  productTitle,
  currentQuantity
}: Props) {
  return (
    <BaseModal
      title="Atualizar carrinho"
      visible={visible}
      onClose={onClose}
      onConfirm={onConfirm}
    >
      <p>
        Tem certeza que deseja atualizar a quantidade de {productTitle} no
        carrinho para {currentQuantity} unidades?
      </p>
    </BaseModal>
  )
}
