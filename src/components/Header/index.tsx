import * as Dialog from '@radix-ui/react-dialog'

import logoImg from '../../assets/logo.svg'
import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'

export const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>

          {/* portal para renderizar o componente em outro lugar */}
          <Dialog.Portal>
            <Dialog.Overlay /> {/* fundo preto do modal */}
            <Dialog.Content>
              <Dialog.Title>Nova transação</Dialog.Title>

              <Dialog.Close />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
