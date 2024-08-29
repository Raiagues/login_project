import Header from './components/Header'; 
import Footer from './components/Footer'; 
import selection from './pages/Selection';

import background from '../assets/images/init/spaceshuttle.png';
import aboutUsImage from '../assets/images/about/about_us.png';
import aboutUsImage2 from '../assets/images/about/about_us2.png';
import s3 from '../assets/images/projects/icons/s-3.png';
import s2 from '../assets/images/projects/icons/s-2.png';
import s4 from '../assets/images/projects/icons/s-4.png';
import s6 from '../assets/images/projects/icons/s-6.png';


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
  return (
    <div>
      <Header />

      <section className="inicio" id="inicio">
        <div className="content">
          <h3>Escola Piloto de <span className="special-text">Engenharia Aeroespacial</span></h3>
          <p>Ajudando alcançar voos mais altos.</p>
          <a href={selection} className="btn-black">Embarque conosco</a>
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

      <Footer />
    </div>
  );
};

export default MainPage;
