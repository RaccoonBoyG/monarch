import React from "react";
import { NavLink } from "react-router-dom";

const Help = () => {
  return (
    <div className="d-flex flex-wrap flex-row">
      <nav className="navbar navbar-expand-lg navbar-light container pl-0 pr-0 pb-3">
        <div
          className="collapse navbar-collapse justify-content-md-left"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav">
            <NavLink to="/help">
              <li className="nav-item">
                <h3>Помощь</h3>
              </li>
            </NavLink>
            <li className="nav-item">
              <NavLink to="/">
                <h3 className="nav-item">Назад</h3>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <div className="d-flex flex-wrap flex-row container p-5">
        <div
          className="d-flex-row container aboutUs text-custom-dark p-5"
          style={{ borderRadius: 0 }}
        >
          <div className="about-back"></div>

          {/* <h1 className="d-flex align-items-center justify-content-center">
            О нас
          </h1> */}
          <div className="text-left">
            <ul className="list-unstyled">
              <li className="media pt-4 pb-4">
                <div className="rounded-circle img-about-size mr-3">
                  <img
                    src="https://images.unsplash.com/photo-1495995424756-6a5a3f9e7543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=95&q=80&h=95"
                    className="img-fluid rounded-circle mr-3 img-about-size"
                    alt="..."
                  />
                </div>
                <div className="media-body">
                  Уральский федеральный университет – крупнейший федеральный
                  университет России, созданный на базе старейших университетов
                  Урала – УГТУ-УПИ и УрГУ. За 90-летнюю историю было
                  подготовлено более 300 тысяч выпускников. Университет занимает
                  ведущие позиции среди вузов России, осуществляющих обучение по
                  инженерным направлениям подготовки.
                </div>
              </li>
              <li className="media mt-4 pt-4 pb-4">
                <div className="rounded-circle img-about-size mr-3">
                  <img
                    src="https://images.unsplash.com/photo-1463171379579-3fdfb86d6285?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=95&q=80&h=95"
                    className="img-fluid rounded-circle mr-3 img-about-size"
                    alt="..."
                  />
                </div>
                <div className="media-body">
                  В университете более 10 лет осуществляется подготовка кадров
                  высшей квалификации с применением дистанционных
                  образовательных технологий. В основу такой подготовки заложен
                  большой опыт создании виртуальных лабораторий, тренажеров и
                  симуляторов, съемки учебных видеофильмов, разработки онлайн
                  курсов.
                </div>
              </li>
              <li className="media mt-4 pt-4 pb-4">
                <div className="rounded-circle img-about-size mr-3">
                  <img
                    src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=95&q=80&h=95"
                    className="img-fluid rounded-circle mr-3"
                    alt="..."
                  />
                </div>
                <div className="media-body">
                  В рамках проекта “Открытое образование” Уральский федеральный
                  университет представит курсы, в первую очередь, обеспечивающие
                  базовую подготовку по инженерным направлениям. К созданию
                  курсов привлечены большие коллективы лучших преподавателей
                  университета, многие из которых имеют многолетний опыт
                  дистанционного обучения. Наша задача - показать, что даже в
                  традиционно сложных для дистанционного обучения технических
                  дисциплинах применение онлайн курсов с современными
                  технологиями будет высокоэффективным.
                </div>
              </li>
            </ul>
          </div>
          <div className="card">
            <div className="card-img"></div>
            <div className="card-body text-center">
              <h3>Официальный сайт</h3>
              <p>
                <a href="http://itoo.urfu.ru">itoo.urfu.ru</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
