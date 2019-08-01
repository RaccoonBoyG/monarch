import ApiMonarch from "../services/api";
import { ButtonSettings } from "../containers/Button";
import { commands } from "../services/vars";
import { Button } from "../containers/Button";

import React, { Component } from "react";

export default class SettingsArea extends Component {
  constructor(props) {
    super(props);
    this.SettingsExecute = this.SettingsExecute.bind(this);
  }
  async SettingsExecute(command) {
    this.props.updateData({ loading: true });
    try {
      let res = await ApiMonarch.SettingsExecuteCommand(command);
      if (res === "SUCCESS") {
        this.props.getStatus();
      } else if (res === "FAILED" || res === "RETRY") {
        return (
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ marginTop: "15rem" }}
          >
            <h1 className="text-neutral-regular d-flex m-3">
              Произошла ошибка, попробуйте перезагрузить страницу, если не
              помогло обратитесь к администратору
            </h1>
            <Button
              name={"Перезагрузить страницу"}
              classStyle={`btn btn-lg-custom btn-success`}
              styles={{ width: "16rem", height: "8rem" }}
              click={() => window.reload()}
            />
          </div>
        );
      }
    } catch (error) {
      console.log(error);
      return (
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ marginTop: "15rem" }}
        >
          <h1 className="text-neutral-regular d-flex m-3">
            Произошла ошибка, попробуйте перезагрузить страницу, если не помогло
            обратитесь к администратору
          </h1>
          <Button
            name={"Перезагрузить страницу"}
            classStyle={`btn btn-lg-custom btn-success`}
            styles={{ width: "16rem", height: "8rem" }}
            click={() => window.reload()}
          />
        </div>
      );
    }
  }
  render() {
    return (
      <div className="d-flex flex-row container pl-0 ml-0">
        <div className="d-flex flex-column col">
          <div className="d-flex flex-row">
            <h2>Настройки камеры</h2>
          </div>
          <div className="d-flex flex-row">
            <ButtonSettings
              name={"Только камера"}
              classStyle={`btn btn-light ${this.props.start} ${
                this.props.statusMode === "LEGACY" &&
                this.props.videoInput === "HDMI"
                  ? "btn-selected"
                  : ""
              }`}
              ariaDisabled={`${this.props.start}`}
              type={"button"}
              dataToggle={"button"}
              styles={{ width: "100%", height: "8rem" }}
              click={
                this.props.start === "disabled"
                  ? null
                  : () => this.SettingsExecute(commands.input_A)
              }
            />
            <ButtonSettings
              name={"Только источник"}
              classStyle={`btn btn-primary ${this.props.start} ${
                this.props.statusMode === "LEGACY" &&
                this.props.videoInput === "HDMI2"
                  ? "btn-selected"
                  : ""
              }`}
              ariaDisabled={`${this.props.start}`}
              styles={{ width: "100%", height: "8rem" }}
              click={
                this.props.start === "disabled"
                  ? null
                  : () => this.SettingsExecute(commands.input_B)
              }
            />
          </div>
          <div className="d-flex flex-row">
            <ButtonSettings
              name={"Слева камера, справа источник"}
              classStyle={`btn btn-primary btn-color-hover ${
                this.props.start
              } ${
                this.props.statusMode === "SIDEBYSIDE" &&
                this.props.compDetails === "SBSAB"
                  ? "btn-selected"
                  : ""
              }`}
              classStyle2={`btn-color`}
              ariaDisabled={`${this.props.start}`}
              type={"button"}
              dataToggle={"button"}
              styles2={{
                width: "50%",
                top: "0",
                left: "0",
                height: "8rem",
                position: "absolute"
              }}
              styles={{ width: "100%", height: "8rem" }}
              click={
                this.props.start === "disabled"
                  ? null
                  : () => this.SettingsExecute(commands.SBS_AB)
              }
            />
            <ButtonSettings
              name={"Слева источник, справа камера"}
              classStyle={`btn btn-primary btn-color-hover ${
                this.props.start
              } ${
                this.props.statusMode === "SIDEBYSIDE" &&
                this.props.compDetails === "SBSBA"
                  ? "btn-selected"
                  : ""
              }`}
              classStyle2={`btn-color`}
              ariaDisabled={`${this.props.start}`}
              type={"button"}
              dataToggle={"button"}
              styles2={{
                width: "50%",
                top: "0",
                right: "0",
                height: "8rem",
                position: "absolute"
              }}
              styles={{ width: "100%", height: "8rem" }}
              click={
                this.props.start === "disabled"
                  ? null
                  : () => this.SettingsExecute(commands.SBS_BA)
              }
            />
          </div>
          <div className="d-flex flex-row">
            <ButtonSettings
              name={"Слева камера(обрезанная), справа источник"}
              classStyle={`btn btn-primary btn-color-hover ${
                this.props.start
              } ${
                this.props.statusMode === "SIDEBYSIDE" &&
                this.props.compDetails === "SBSACB"
                  ? "btn-selected"
                  : ""
              }`}
              classStyle2={`btn-color`}
              ariaDisabled={`${this.props.start}`}
              type={"button"}
              dataToggle={"button"}
              styles2={{
                width: "30%",
                top: "0",
                left: "0",
                height: "8rem",
                position: "absolute"
              }}
              styles={{ width: "100%", height: "8rem" }}
              click={
                this.props.start === "disabled"
                  ? null
                  : () => this.SettingsExecute(commands.SBS_ACB)
              }
            />
            <ButtonSettings
              name={"Слева источник, справа камера(обрезанная)"}
              classStyle={`btn btn-primary btn-color-hover ${
                this.props.start
              } ${
                this.props.statusMode === "SIDEBYSIDE" &&
                this.props.compDetails === "SBSBAC"
                  ? "btn-selected"
                  : ""
              }`}
              classStyle2={`btn-color`}
              ariaDisabled={`${this.props.start}`}
              type={"button"}
              dataToggle={"button"}
              styles2={{
                width: "30%",
                top: "0",
                right: "0",
                height: "8rem",
                position: "absolute"
              }}
              styles={{ width: "100%", height: "8rem" }}
              click={
                this.props.start === "disabled"
                  ? null
                  : () => this.SettingsExecute(commands.SBS_BAC)
              }
            />
          </div>
        </div>
        <div
          className="d-felx flex-column col"
          style={{ marginTop: "14.5rem" }}
        >
          <div className="d-flex flex-row">
            <ButtonSettings
              name={"Камера слева сверху"}
              classStyle={`btn btn-primary btn-color-hover ${
                this.props.start
              } ${
                this.props.statusMode === "PICTUREINPICTURE" &&
                this.props.compDetails === "PIPTL"
                  ? "btn-selected"
                  : ""
              }`}
              classStyle2={`btn-color`}
              ariaDisabled={`${this.props.start}`}
              type={"button"}
              dataToggle={"button"}
              styles2={{
                width: "4rem",
                height: "2rem",
                left: "1rem",
                top: "1rem",
                position: "absolute"
              }}
              styles={{ width: "100%", height: "8rem" }}
              click={
                this.props.start === "disabled"
                  ? null
                  : () => this.SettingsExecute(commands.pip_tl)
              }
            />
            <ButtonSettings
              name={"Камера справа сверху"}
              classStyle={`btn btn-primary btn-color-hover ${
                this.props.start
              } ${
                this.props.statusMode === "PICTUREINPICTURE" &&
                this.props.compDetails === "PIPTR"
                  ? "btn-selected"
                  : ""
              }`}
              classStyle2={`btn-color`}
              ariaDisabled={`${this.props.start}`}
              type={"button"}
              dataToggle={"button"}
              styles2={{
                width: "4rem",
                height: "2rem",
                right: "1rem",
                top: "1rem",
                position: "absolute"
              }}
              styles={{ width: "100%", height: "8rem" }}
              click={
                this.props.start === "disabled"
                  ? null
                  : () => this.SettingsExecute(commands.pip_tr)
              }
            />
          </div>
          <div className="d-flex flex-row mt-4">
            <ButtonSettings
              name={"Камера слева снизу"}
              classStyle={`btn btn-primary btn-color-hover ${
                this.props.start
              } ${
                this.props.statusMode === "PICTUREINPICTURE" &&
                this.props.compDetails === "PIPBL"
                  ? "btn-selected"
                  : ""
              }`}
              classStyle2={`btn-color`}
              ariaDisabled={`${this.props.start}`}
              type={"button"}
              dataToggle={"button"}
              styles2={{
                width: "4rem",
                height: "2rem",
                left: "1rem",
                bottom: "3.5rem",
                position: "absolute"
              }}
              styles={{ width: "100%", height: "8rem" }}
              click={
                this.props.start === "disabled"
                  ? null
                  : () => this.SettingsExecute(commands.pip_bl)
              }
            />
            <ButtonSettings
              name={"Камера справа снизу"}
              classStyle={`btn btn-primary btn-color-hover ${
                this.props.start
              } ${
                this.props.statusMode === "PICTUREINPICTURE" &&
                this.props.compDetails === "PIPBR"
                  ? "btn-selected"
                  : ""
              }`}
              classStyle2={`btn-color`}
              ariaDisabled={`${this.props.start}`}
              type={"button"}
              dataToggle={"button"}
              styles2={{
                width: "4rem",
                height: "2rem",
                right: "1rem",
                bottom: "3.5rem",
                position: "absolute"
              }}
              styles={{ width: "100%", height: "8rem" }}
              click={
                this.props.start === "disabled"
                  ? null
                  : () => this.SettingsExecute(commands.pip_br)
              }
            />
          </div>
        </div>
      </div>
    );
  }
}
