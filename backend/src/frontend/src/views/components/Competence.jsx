import { useEffect } from "react";

import './../../styles/components/TimeLine.css';  
import { toggleContent } from '../../utils/main';   

const Competence = () => {
  useEffect(() => {
    // Event listeners for .btn-2 buttons
    const buttons2 = document.querySelectorAll('.btn-2');
    buttons2.forEach(button => {
      button.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = button.getAttribute('data-target');
        toggleContent(targetId);
      });
    });

    // Event listeners for all .btn-details buttons across sections
    const buttonsDetails = document.querySelectorAll('.btn-details');
    buttonsDetails.forEach(button => {
      button.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-target');
        const content = document.getElementById(targetId);
        if (content.style.display === 'none' || content.style.display === '') {
          content.style.display = 'block';
        } else {
          content.style.display = 'none';
        }
      });
    });

    // Cleanup function to remove event listeners when component unmounts
    return () => {
      buttons2.forEach(button => {
        button.removeEventListener('click', () => {});
      });
      buttonsDetails.forEach(button => {
        button.removeEventListener('click', () => {});
      });
    };
  }, []);

  return (

    <div className="parte" id="parte">
        <h1 className="heading">Por que fazer parte da equipe?</h1>

        <div className="competencias">
            <h2>Competências Desenvolvidas</h2>
            <p>A EP Aero oferece diversas oportunidades para o desenvolvimento de competências pessoais e técnicas através de seus projetos e setores. Recomendamos que os candidatos analisem quais competências desejam aprimorar e tragam essas expectativas para o processo seletivo. Nosso objetivo é ajudar cada membro a se desenvolver e se tornar cada vez mais capacitado. Abaixo, apresentamos uma breve descrição das competências que podem ser desenvolvidas em cada setor.</p>
            <p>Para mais detalhes, consulte a descrição de cada setor e suas atividades na página sobre nossa <a href="../../pages/about/team.html" className="btn-projects">equipe</a>.</p>


            <div className="comp-section">
              <div className="sidebar">
                  <div className="buttons">
                      <a href="#" className="btn-2 active" data-target="adm-content">Administrativo</a>
                      <a href="#" className="btn-2" data-target="inov-content">Inovação</a>
                      <a href="#" className="btn-2" data-target="proj-content">Projetos</a>
                  </div>
              </div>
            </div>     

            <div className="main-content">
              {/* Administrativo */}
            <div id="adm-content" className="hidden-content description show">
              <p><a href="javascript:void(0)" className="btn-details" data-target="alocacao-content1">Setor de Liderança Executiva</a></p>
              <div id="alocacao-content1" className="hidden-content description">Detalhes sobre o setor de Liderança Executiva...</div>
            </div>

            {/* Inovação */}
            <div id="inov-content" className="hidden-content description">
              <p><a href="javascript:void(0)" className="btn-details" data-target="alocacao-content5">Setor de Capacitação Interna</a></p>
              <div id="alocacao-content5" className="hidden-content description">Detalhes sobre o setor de Capacitação Interna...</div>
            </div>

            {/* Projetos */}
            <div id="proj-content" className="hidden-content description">
              <p><a href="javascript:void(0)" className="btn-details" data-target="alocacao-content9">Setor de Gestão de Projetos</a></p>
              <div id="alocacao-content9" className="hidden-content description">Detalhes sobre o setor de Gestão de Projetos...</div>
            </div>
         


            </div>    

        </div>         
    </div>
                

  );
};

export default Competence;
