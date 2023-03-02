import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <section>
        <h1>Cognyshoes</h1>
        <img src="" alt="logo" />
      </section>
      <section>
        <Link to='/cart'>
          <p>Meu carrinho</p>
          <p>items</p>
        </Link>
      </section>
    </header>
  );
}

export default Header;