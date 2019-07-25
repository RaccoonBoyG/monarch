import React, { Component } from "react";
import Button from "../containers/Button";
import { GetStatus } from "../services/api";

export default class Main extends Component {
  render() {
    return (
      <div className="d-flex flex-wrap flex-row container p-5">
        <Button
          name={"Начать запись"}
          classStyle={"btn btn-lg-custom btn-primary"}
          styles={{ padding: "7rem 3rem", width: "16rem" }}
          click={GetStatus}
        />
        <Button
          name={"Остановить запись"}
          classStyle={"btn btn-lg-custom btn-primary-dark"}
        />
        <Button
          name={"Остановить запись"}
          classStyle={"btn btn-lg-custom btn-primary-dark"}
        />
        <Button
          name={"Остановить запись"}
          classStyle={"btn btn-lg-custom btn-primary-dark"}
        />
        <Button
          name={"Остановить запись"}
          classStyle={"btn btn-lg-custom btn-primary-dark"}
        />
      </div>
    );
  }
}
