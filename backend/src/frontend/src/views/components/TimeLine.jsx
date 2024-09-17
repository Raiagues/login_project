import { useEffect } from "react";

import './../../styles/components/TimeLine.css';  

const Timeline = () => {
  useEffect(() => {
    const cards = document.querySelectorAll(".btn-details-trainee");
    const contentDisplay = document.getElementById("content-display");
    const defaultDescription = contentDisplay.innerHTML;
    let lastClickedId = null;
    let lastClickedContent = null;

    // Add event listeners for the trainee buttons
    cards.forEach(card => {
      card.addEventListener("click", function () {
        const targetId = this.getAttribute("data-target");
        const targetContent = document.getElementById(targetId);

        if (window.innerWidth >= 500) {
          if (lastClickedId === targetId) {
            contentDisplay.innerHTML = defaultDescription; // Reset to default description
            lastClickedId = null;
          } else {
            if (targetContent) {
              contentDisplay.innerHTML = targetContent.innerHTML; // Show new content
              lastClickedId = targetId;
            }
          }
        } else {
          if (lastClickedId === targetId) {
            if (lastClickedContent) {
              lastClickedContent.style.display = "none"; // Hide if the same card is clicked again
            }
            lastClickedId = null;
            lastClickedContent = null;
          } else {
            if (lastClickedContent) {
              lastClickedContent.style.display = "none"; // Hide previous content
            }

            if (targetContent) {
              const cardRect = this.getBoundingClientRect();
              const containerRect = document.querySelector('.timeline-container').getBoundingClientRect();

              targetContent.style.display = "block";
              targetContent.style.position = "absolute";
              targetContent.style.top = `${cardRect.bottom - containerRect.top + 20}px`; // Position below the button
              targetContent.style.left = `${0}px`; // Align with the timeline container
              lastClickedContent = targetContent;
              lastClickedId = targetId;
            }
          }
        }
      });
    });

    // Cleanup event listeners on component unmount
    return () => {
      cards.forEach(card => {
        card.removeEventListener("click", () => {});
      });
    };
  }, []);

  useEffect(() => {
    // Event listeners for ".btn-details" buttons
    const buttons = document.querySelectorAll('.btn-details');

    buttons.forEach(button => {
      button.addEventListener('click', function (event) {
        event.stopPropagation();

        const targetId = this.getAttribute('data-target');
        const content = document.getElementById(targetId);
        const card = this.closest('.card-workshops');
        const cardDescription = card.querySelector('.card-description-workshop');

        if (content.style.display === 'none' || content.style.display === '') {
          cardDescription.style.display = 'none';
        } else {
          cardDescription.style.display = 'block';
        }
      });
    });

    // Cleanup event listeners on component unmount
    return () => {
      buttons.forEach(button => {
        button.removeEventListener('click', () => {});
      });
    };
  }, []);

  return (
    <section className="processo-seletivo" id="processo-seletivo">
      <div className="selecao" id="selecao">
            <h1 className="heading">Processo de Seleção</h1>
        
            <div className="container">
                <div className="timeline-container">
                    <div className="timeline-line"></div>
                    <div className="items-container">
                        <div className="circle-item">
                            <div className="circle-btn">
                                <img src="../../images/selection/1.png" alt="Inscrições" />
                            </div>
                            <div className="circle-text">
                                <a href="javascript:void(0)" className="btn-details-trainee" data-target="treinamento-content1">Inscrições</a>
                            </div>
                            <div id="treinamento-content1" className="hidden-content-timeline">
                                <h2>Inscrições</h2>
                                <p>As inscrições são realizadas por meio de um formulário online, divulgado por e-mail e pelas redes sociais. Nele, o candidato apresenta informações básicas como nome, semestre do curso, questões sobre o currículo e motivações sobre por que deseja fazer parte da equipe, setores de interesse e habilidades que busca desenvolver durante sua permanência na equipe.</p>
                            </div>
                        </div>
        
                        <div className="circle-item">
                            <div className="circle-btn">
                                <img src="../../images/selection/2.png" alt="Entrevistas" />
                            </div>
                            <div className="circle-text">
                                <a href="javascript:void(0)" className="btn-details-trainee" data-target="treinamento-content2">Entrevistas</a>
                            </div>
                            <div id="treinamento-content2" className="hidden-content-timeline">
                                <h2>Entrevistas</h2>
                                <p>Todos os candidatos que se inscrevem pelo formulário são convidados para uma entrevista, que dura em torno de 30 minutos e é conduzida principalmente pelo presidente e pelo vice-presidente, podendo também contar com gerentes ou membros dos setores e áreas que o candidato indicou interesse durante a inscrição.</p>
                                <p>Durante a entrevista, buscamos entender mais a fundo por que o candidato deseja fazer parte da equipe, como conheceu o projeto, o que despertou seu interesse, quais benefícios acredita que obterá participando e o que pode oferecer para a equipe como membro.</p>
                                <p>Não temos um número fixo de vagas; isso depende de como o processo seletivo se desenrola. Normalmente, aprovamos entre 10 alunos e mantemos uma lista de espera, chamando os candidatos pela ordem de classificação para preencher vagas que surgem caso algum membro deixe o projeto ou caso a demanda das atividades aumente e precise de mais membros.</p>
                            </div>
                        </div>
        
                        <div className="circle-item">
                            <div className="circle-btn">
                                <img src="../../images/selection/3.png" alt="Treinamento" />
                            </div>
                            <div className="circle-text">
                                <a href="javascript:void(0)" className="btn-details-trainee" data-target="treinamento-content3">Treinamento</a>
                            </div>
                            <div id="treinamento-content3" className="hidden-content-timeline">
                                <h2>Treinamento</h2>
                                <p>Após serem aprovados, os membros iniciam um processo de treinamento antes de começar as atividades nos projetos. O treinamento dura cerca de um mês.</p>
                                <p>Desenvolvemos um processo de treinamento que inclui workshops sobre tópicos de carreira, como desenvolvimento de currículo, cartas de motivação, preparação para entrevistas, entre outros. Além disso, através de palestras com convidados especiais, os membros têm a oportunidade de aprender com profissionais experientes do setor aeroespacial.</p>
                            </div>
                        </div>
        
                        <div className="circle-item">
                            <div className="circle-btn">
                                <img src="../../images/selection/4.png" alt="Alocação de Atividades" />
                            </div>
                            <div className="circle-text">
                                <a href="javascript:void(0)" className="btn-details-trainee" data-target="treinamento-content4">Alocação de Atividades</a>
                            </div>
                            <div id="treinamento-content4" className="hidden-content-timeline">
                                <h2>Alocação de Atividades</h2>
                                <p>Após o treinamento, com base nas aspirações pessoais, os membros são alocados em projetos que auxiliam no desenvolvimento de habilidades importantes para a carreira que desejam seguir. Se preferirem, incentivamos a criação e coordenação de novos projetos, oferecendo suporte técnico e financeiro.</p>
                                <p>A alocação leva em conta principalmente quais projetos o membro indicou durante a inscrição e a entrevista como preferidos. Para quem está se inscrevendo agora e gostaria de saber mais sobre os projetos, a descrição detalhada de cada um está disponível na seção de <a href="../../index.html#projetos" className="btn-projects">Projetos</a>.</p>
                                <p>O objetivo é que, por meio dos feedbacks dos próprios membros, que indicam quais habilidades desejam desenvolver, como oratória, comunicação, liderança, proatividade, trabalho em equipe, etc., alocamos os membros de acordo com suas próprias demandas.</p>
                                <p>Além disso, todos os membros devem participar de pelo menos um projeto e estar vinculados a um setor como membro ou diretor.</p>
                            </div>
                        </div>
        
                    </div>
                </div>
        
                <div id="content-display" className="content-display">
                    <h2>Processo Seletivo</h2>
                    <p id="description-text">O processo seletivo é dividido em duas fases: inscrição e entrevistas.</p>
                    <p id="description-text">Os únicos pré-requisitos para entrar na EP Aero são ser estudante de engenharia aeroespacial e ter vontade de aprender.</p>
                    <p id="description-text">Temos um perfil de membros diverso, com alunos que buscam desenvolver habilidades mais técnicas, outros que buscam habilidades mais pessoais, e ainda outros que buscam desenvolver ambos. Temos estudantes com muita experiência e outros que estão começando agora a carreira acadêmica. Buscamos criar um ambiente onde os membros possam desenvolver aquilo que sentem faltar em seu desenvolvimento profissional.</p>
                </div>
            </div>
        </div>
      
    </section> 
  );
};

export default Timeline;
