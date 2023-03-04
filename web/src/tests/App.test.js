import { screen, render, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Testando o componente Header', () => {  
  it('1 - Testando se o nome da empresa é renderizado', () => {
    render(<App />);
    const logoText = screen.getByRole('heading', {
      name: /cognyshoes/i
    })

    expect(logoText).toBeInTheDocument();
  });

  it('2 - Testando se ao iniciar, a section dos itens aparece', () => {
    render(<App />);
    const itemsText = screen.getByText(/itens/i)

    expect(itemsText).toBeInTheDocument();
  });
});

describe('Testando a página de carrinho', () => {
  it('1 - Testando se ao clicar para ir para página de carrinhos, ela renderiza corretamente', async () => {
    render(<App />);
    
    const button = screen.getByText(/meu carrinho/i)
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    const total = screen.getByText(/total/i)
    expect(total).toBeInTheDocument();
    const finalizarPedido = screen.getByText(/finalizar pedido/i)
    expect(finalizarPedido).toBeInTheDocument();
  });

  it('2 - Testando se ao clicar para finalizar o pedido, aparece a mensagem de sucesso', async () => {
    render(<App />);
    
    const button = screen.getByText(/meu carrinho/i)
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    const finalizarPedido = screen.getByText(/finalizar pedido/i)
    expect(finalizarPedido).toBeInTheDocument();
    fireEvent.click(finalizarPedido);

    const emptyCart = screen.getByText(/carrinho vazio/i)
    expect(emptyCart).toBeInTheDocument();
  });
});