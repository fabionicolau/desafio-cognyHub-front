import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo.svg';
import getLocalStorage from "../../utils/getLocalStorage";
import './style.css';

function Header() {
  const [cartLength, setCartLength] = useState(0);
  
  useEffect(() => {
    const cart = getLocalStorage('cart');
    const cartLength = cart ? cart.length : 0;
    setCartLength(cartLength);
  }, [cartLength]);

  return (
    <header className='header-container'>
      <section className='logo-container'>
        <h1>Cognyshoes</h1>
        <img src={Logo} alt="imagem do logo" />
      </section>
      <section className='cartAndItems-container'>
        <Link to='/cart'>
          <p className='myCart'>Meu carrinho</p>
          <p className='items'>{`${cartLength} itens`}</p>
        </Link>
      </section>
    </header>
  );
}

export default Header;