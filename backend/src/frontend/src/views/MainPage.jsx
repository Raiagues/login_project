import { Link } from 'react-router-dom';
import { useEffect } from 'react';

import Header from './components/Header'; 
import Footer from './components/Footer'; 

import emailjs from '@emailjs/browser';

import background from '../assets/images/init/spaceshuttle.png';
import aboutUsImage from '../assets/images/about/about_us.png';
import aboutUsImage2 from '../assets/images/about/about_us2.png';
import s3 from '../assets/images/projects/icons/s-3.png';
import s2 from '../assets/images/projects/icons/s-2.png';
import s4 from '../assets/images/projects/icons/s-4.png';
import s6 from '../assets/images/projects/icons/s-6.png';

import { sendEmail, closePopup } from '../utils/mainPage';   

import './../styles/pages/MainPage.css'; 

const projetos = [
  {
    img: s3,
    title: 'Minifoguetes',
    description: 'Realizamos workshops sobre minifoguetes em escolas públicas da região, onde apresentamos princípios básicos de propulsão, aerodinâmica e construção de foguetes, além de auxiliar os alunos construírem e lançarem seus próprios minifoguetes.',
    link: 'pages/projetos/minifoguetes.html',
  },
  {
    img: s2,
    title: 'Revista Acadêmica',
    description: 'Publicamos revistas acadêmicas periódicas contendo notícias do setor aeroespacial, trabalhos realizados pelos alunos, apresentações em congressos, bem como os projetos de pesquisa, ensino e extensão da UFSM.',
    link: 'pages/projetos/revista.html',
  },
  {
    img: s4,
    title: 'Minicursos',
    description: 'Organizamos semanas de minicursos gratuitos sobre os principais softwares e ferramentas utilizados na engenharia aeroespacial.',
    link: 'pages/projetos/minicursos.html',
  },
  {
    img: s6,
    title: 'Inglês Acadêmico',
    description: 'Desenvolvemos minicursos, workshops, aulas de conversação e atividades em inglês com foco no contexto acadêmico e profissional, preparando alunos para processos seletivos e entrevistas em inglês.',
    link: 'pages/projetos/ingles.html',
  },
];

const MainPage = () => {
  useEffect(() => {
    emailjs.init('9Jstsw2jbP2REvspB');  
  }, []);  

  return (
    <div>
      <Header />

      <section className="inicio" id="inicio">
        <div className="content">
          <h3>Escola Piloto de <span className="special-text">Engenharia Aeroespacial</span></h3>
          <p>Ajudando alcançar voos mais altos.</p>
          <Link to="/selection" className="btn-black">Embarque conosco</Link>

        </div>

        <div className="image">
          <img src={background} alt="Space Shuttle" /> 
        </div>

        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>
        <div className="cloud cloud-4"></div>
      </section>
 
      <section className="sobre" id="sobre">
        <h1 className="heading">Quem somos?</h1>

        <div className="row">
          <div className="image">
            <img src={aboutUsImage} alt="About Us" className="normal-image" />
            <img src={aboutUsImage2} alt="About Us 2" className="rotate-image" />
          </div>

          <div className="content">
            <h3 className="title">Nossa missão é te ajudar a alcançar voos mais altos</h3>

            <h4>Movimento escola piloto</h4>
            <p>
              Escolas pilotos são projetos de extensão que complementam e enriquecem os currículos
              de cursos das instituições de ensino superior do país, por meio de atividades de
              ensino, pesquisa e extensão.
            </p>

            <h4>Formação</h4>
            <p>
              Buscamos auxiliar no desenvolvimento de competências sociais como criatividade,
              proatividade e cooperação, além de competências técnicas por meio de cursos, palestras
              e projetos práticos.
            </p>

            <h4>Engajamento</h4>
            <p>
              Buscamos aumentar o engajamento dos estudantes com o setor aeroespacial e com a
              graduação, contribuindo para a diminuição da evasão escolar no curso e um aumento na
              interação com a comunidade fora do meio acadêmico.
            </p>

            <h4>Propósito</h4>
            <p>
              Nossa missão é conectar estudantes e profissionais do setor aeroespacial,
              inspirando-os a buscar excelência e a se destacarem em suas carreiras. Estamos aqui
              para apoiar seu desenvolvimento e ajudar a alcançar seus objetivos.
            </p>

            <a href="pages/about/more.html" className="btn-white">
              leia mais
            </a>
            <a href="pages/about/team.html" className="btn-white">
              equipe
            </a>
          </div>
        </div>
      </section>

      <section className="projetos" id="projetos">
        <h1 className="heading">Nossos projetos</h1>
        <div className="box-container">
          {projetos.map((projeto, index) => (
            <div className="box" key={index}>
              <img src={projeto.img} alt={projeto.title} className="project-image" />
              <h3 className="project-title">{projeto.title}</h3>
              <p className="project-description">{projeto.description}</p>
              <a href={projeto.link} className="btn-white">Leia Mais</a>
            </div>
          ))}
        </div>
      </section>

      <section className="contato" id="contato">
         <h1 className="heading">Contato</h1>
          <div className="icons-container">
            <div className="icons">
                <i className="fas fa-envelope"></i>
                <h3>Nosso E-mail</h3>
                <h4>ep.aeroespacial@gmail.com</h4>
            </div>
            <div className="icons">
                <i className="fas fa-map-marker-alt"></i>
                <h3>Nossa Localização</h3>
                <h4>Centro de Tecnologia da UFSM</h4>
                <p>Av. Roraima, 1000 - Camobi, Santa Maria - RS, 97105-900</p>
            </div>
          </div>

        <div className="row">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3465.2214505997354!2d-53.72130567518356!3d-29.713343924443507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9503b5e0d2e6091f%3A0xe79dcc249b674e73!2sCentro%20de%20Tecnologia%20da%20UFSM!5e0!3m2!1spt-BR!2sbr!4v1678039088751!5m2!1spt-BR!2sbr"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        <form id="signup-form" onSubmit={sendEmail}>
          <label htmlFor="name">Nome:</label>
          <input type="text" id="name" name="name" className="box" required />

          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" name="email" className="box" required />

          <label htmlFor="message">Mensagem:</label>
          <textarea id="message" name="message" className="box" cols="30" rows="10"></textarea>

          <button type="submit">Enviar</button>
        </form>
      </div>

        <div id="popup" className="popup">
            <div className="popup-content">
                <span className="popup-close" onClick={closePopup}>&times;</span>
                <p id="popup-message">Sua mensagem foi enviada com sucesso!</p>
            </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MainPage;
