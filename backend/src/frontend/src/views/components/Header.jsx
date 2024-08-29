import './../../styles/components/Header.css'; 
import icon from '../../assets/images/header/logo.png'; 

const Header = () => {
  return (
    <header className="header">
      <a href="#" className="logo">
        <span>
          <img src={icon} alt="Logo" />
        </span>
      </a>

      <nav className="navbar">
        <a href="#inicio">Início</a>
        <a href="#sobre">Sobre</a>
        <a href="#projetos">Projetos</a>
        <a href="pages/selecao/selecao.html#processo-seletivo">Processo Seletivo</a>
        <a href="#contato">Contato</a>
      </nav>

      <div id="menu-btn" className="fas fa-bars"></div>
    </header>
  );
};

export default Header;
