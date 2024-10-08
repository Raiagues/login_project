import { Link } from 'react-router-dom';  
import './../../styles/components/Header.css'; 
import icon from '../../assets/images/header/logo.png'; 

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <span>
          <img src={icon} alt="Logo" />
        </span>
      </Link>

      <nav className="navbar">
        <a href="/#inicio">Início</a>
        <a href="/#sobre">Sobre</a>
        <a href="/#projetos">Projetos</a>
        <Link to="/selection#processo-seletivo">Processo Seletivo</Link>
        <a href="/#contato">Contato</a>
      </nav>

      <div id="menu-btn" className="fas fa-bars"></div>
    </header>
  );
};

export default Header;
