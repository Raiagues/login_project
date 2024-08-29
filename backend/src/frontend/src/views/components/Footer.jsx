import './../../styles/components/Footer.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    <section className="footer">                
        <div className="box-container">
            <div className="box">
                <h3>REDES SOCIAIS:</h3>
                <a href="https://www.instagram.com/ep.aero/"><i className="fab fa-instagram"></i> Instagram </a>
                <a href="https://www.linkedin.com/company/escola-piloto-de-engenharia-aeroespacial-ufsm/"> <i className="fab fa-linkedin"></i> Linkedin </a>
            </div>
        </div>
    </section>
  );
};

export default Footer;
