import React from "react";
import { Button } from "../containers/Button";

const ErrorPage = ({ history }) => {
  return (
    <div
      className="container d-flex flex-column justify-content-center align-items-center text-neutral-regular"
      style={{ marginTop: "5rem" }}
    >
      <h1 className="d-flex m-3 mb-5">Произошла ошибка</h1>
      <h3 className="d-flex m-3 mb-5">
        Попробуйте перезагрузить страницу, если не помогло обратитесь к
        администратору
      </h3>
      <div className="container d-flex-column p-3 justify-content-center align-items-center">
        <h3>Возможные ошибки :</h3>
        <ul>
          <li>Не подключен кабель к камере</li>
          <li>Нет USB-флеш-карты</li>
          <li>Не хватает места на USB-флеш-карте</li>
        </ul>
      </div>
      <Button
        name={"Перезагрузить страницу"}
        classStyle={`btn btn-lg-custom btn-success`}
        styles={{ width: "16rem", height: "8rem" }}
        click={() => {
          history.push("/");
        }}
      />
    </div>
  );
};

export default ErrorPage;
