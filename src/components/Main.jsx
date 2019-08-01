import React, { Component } from "react";
import ApiMonarch from "../services/api";
import { commands } from "../services/vars";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

import SettingsArea from "./SettingsArea";
import RecordingArea from "./RecordingArea";
import ErrorPage from "./ErrorPage";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      enc1: {},
      enc2: {},
      start: "disabled",
      stop: "disabled",
      statusMode: "",
      videoInput: "",
      statusOutput: "",
      statusOutputBtn: "",
      compDetails: "",
      loading: true,
      loading_record: false,
      statusInterval: true,
      statusVideoInput: {
        hdmiA: "",
        statusA: "",
        hdmiB: "",
        statusB: "",
        hdmi: "",
        status: ""
      },
      error: false,
      showModal: false,
      messageError: ""
    };
    this.getStatus = this.getStatus.bind(this);
    this.updateData = this.updateData.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleHideModalSucces = this.handleHideModalSucces.bind(this);
    this.handleHideModalContinue = this.handleHideModalContinue.bind(this);
    this._isMounted = false;
    this.interval = null;
  }

  async getStatus() {
    if (this._isMounted) {
      let status = await ApiMonarch.ExecuteCommand(commands.getStatus);
      let statusInput = await ApiMonarch.ExecuteCommand(
        commands.getInputStatus
      );
      let statusMode = await ApiMonarch.GetStatusMode();
      this.updateData({ ...this.state, loading: false });
      //Novideoinput
      let hdmiA;
      let hdmiB;
      let hdmi;
      let statusHdmiA;
      let statusHdmiB;
      let statusHdmi;
      if (statusInput.includes(";")) {
        hdmiA = statusInput
          .split(";")[0]
          .split(":")[0]
          .replace(/[^A-Za-zА-Яа-яЁё\d]/g, "");

        hdmiB = statusInput
          .split(";")[1]
          .split(":")[0]
          .replace(/[^A-Za-zА-Яа-яЁё\d]/g, "");
        statusHdmiA = statusInput
          .split(";")[0]
          .split(":")[1]
          .replace(/[^A-Za-zА-Яа-яЁё\d]/g, "");
        statusHdmiB = statusInput
          .split(";")[1]
          .split(":")[1]
          .replace(/[^A-Za-zА-Яа-яЁё\d]/g, "");
        this.updateData({
          ...this.state,
          statusVideoInput: {
            hdmiA: hdmiA,
            statusA: statusHdmiA,
            hdmiB: hdmiB,
            statusB: statusHdmiB
          }
        });
      } else {
        hdmi = statusInput
          .split(";")[0]
          .split(":")[0]
          .replace(/[^A-Za-zА-Яа-яЁё\d]/g, "");
        statusHdmi = statusInput
          .split(";")[0]
          .split(":")[1]
          .replace(/[^A-Za-zА-Яа-яЁё\d]/g, "");
        this.updateData({
          ...this.state,
          statusVideoInput: {
            hdmi: hdmi,
            status: statusHdmi
          }
        });
      }

      let compDetails = statusMode
        .split("compDetails")[1]
        .replace(/[^A-Za-zА-Яа-яЁё]/g, "");

      let videoInput = statusMode
        .split("videoInput")[1]
        .replace(/[^A-Za-zА-Яа-яЁё\d]/g, "");

      statusMode = statusMode
        .split("operatingMode")[1]
        .replace(/[^A-Za-zА-Яа-яЁё]/g, "");

      let enc1 = status.split(",", 4).slice(1, 2);
      let enc2 = status.split(",", 4).slice(3, 4);
      this.updateData({
        ...this.state,
        enc1: enc1,
        enc2: enc2,
        statusMode: statusMode,
        videoInput: videoInput,
        compDetails: compDetails
      });
      this.statusShow();
      if (this.state.enc1[0] === "READY") {
        clearInterval(this.interval);
      }
      this.updateData({ loading_record: false });
      if (
        this.state.statusVideoInput.status === "Novideoinput" &&
        this.state.statusVideoInput.hdmi === "HDMIB"
      ) {
        this.handleShowModal();
        this.updateData({
          error: true,
          messageError: "Нет сигнала с разьема IN_B, проверьте подключение"
        });
      } else if (
        this.state.statusVideoInput.status === "Novideoinput" &&
        this.state.statusVideoInput.hdmi === "HDMIA"
      ) {
        this.handleShowModal();
        this.updateData({
          error: true,
          messageError: "Нет сигнала с разьема IN_A, проверьте подключение"
        });
      } else if (
        this.state.statusVideoInput.statusA === "Novideoinput" &&
        this.state.statusVideoInput.hdmiA === "HDMIA" &&
        this.state.statusVideoInput.statusB === "Novideoinput" &&
        this.state.statusVideoInput.hdmiB === "HDMIB"
      ) {
        this.handleShowModal();
        this.updateData({
          error: true,
          messageError:
            "Нет сигнала с разьема IN_A и IN_B, проверьте подключение"
        });
      } else if (
        this.state.statusVideoInput.statusA === "Novideoinput" &&
        this.state.statusVideoInput.hdmiA === "HDMIA"
      ) {
        this.handleShowModal();
        this.updateData({
          error: true,
          messageError: "Нет сигнала с разьема IN_A, проверьте подключение"
        });
      } else if (
        this.state.statusVideoInput.statusB === "Novideoinput" &&
        this.state.statusVideoInput.hdmiB === "HDMIB"
      ) {
        this.handleShowModal();
        this.updateData({
          error: true,
          messageError: "Нет сигнала с разьема IN_B, проверьте подключение"
        });
      } else {
        this.handleHideModalContinue();
        this.updateData({ error: false, messageError: "" });
      }
    }
  }

  async componentDidMount() {
    this._isMounted = true;
    this.getStatus();
    // interval();
  }

  async componentWillUnmount() {
    // clearInterval(interval);
    this._isMounted = false;
  }

  updateData(config) {
    this.setState(config);
  }

  handleHideModalSucces() {
    this.updateData({ showModal: false });
    window.location.reload();
  }

  handleHideModalContinue() {
    this.updateData({ showModal: false });
  }

  handleShowModal() {
    this.updateData({ showModal: true });
  }

  statusShow() {
    if (this.state.enc1[0] === "READY") {
      this.updateData({
        ...this.state,
        stop: "disabled",
        start: "",
        status: "Запись не идет"
      });
    } else if (this.state.enc1[0] === "ON") {
      this.updateData({
        ...this.state,
        start: "disabled",
        stop: "",
        status: "Запись идет"
      });
    }
    if (
      this.state.videoInput === "HDMI" &&
      this.state.statusMode === "LEGACY"
    ) {
      this.updateData({
        ...this.state,
        statusOutput: "Статус: Только камера"
      });
    } else if (
      this.state.videoInput === "HDMI2" &&
      this.state.statusMode === "LEGACY"
    ) {
      this.updateData({
        ...this.state,
        statusOutput: "Статус: Только источник"
      });
    }
    if (
      this.state.statusMode === "PICTUREINPICTURE" &&
      this.state.compDetails === "PIPTL"
    ) {
      this.updateData({
        ...this.state,
        statusOutput: "Статус: Камера слева сверху"
      });
    } else if (
      this.state.statusMode === "PICTUREINPICTURE" &&
      this.state.compDetails === "PIPTR"
    ) {
      this.updateData({
        ...this.state,
        statusOutput: "Статус: Камера справа сверху"
      });
    } else if (
      this.state.statusMode === "PICTUREINPICTURE" &&
      this.state.compDetails === "PIPBL"
    ) {
      this.updateData({
        ...this.state,
        statusOutput: "Статус: Камера слева снизу"
      });
    } else if (
      this.state.statusMode === "PICTUREINPICTURE" &&
      this.state.compDetails === "PIPBR"
    ) {
      this.updateData({
        ...this.state,
        statusOutput: "Статус: Камера справа снизу"
      });
    }
    if (
      this.state.statusMode === "SIDEBYSIDE" &&
      this.state.compDetails === "SBSAB"
    ) {
      this.updateData({
        ...this.state,
        statusOutput: "Статус: Слева камера, справа источник"
      });
    } else if (
      this.state.statusMode === "SIDEBYSIDE" &&
      this.state.compDetails === "SBSBA"
    ) {
      this.updateData({
        ...this.state,
        statusOutput: "Статус: Слева источник, справа камера"
      });
    }
    let str_1 = (
      <h5 className="flex-wrap" style={{ wordWrap: "break-word" }}>
        Статус: Слева источник,<br></br> справа камера(обрезанная)
      </h5>
    );
    let str_2 = (
      <h5 className="flex-wrap" style={{ wordWrap: "break-word" }}>
        "Статус: Слева камера(обрезанная),<br></br>справа источник
      </h5>
    );
    if (
      this.state.statusMode === "SIDEBYSIDE" &&
      this.state.compDetails === "SBSACB"
    ) {
      this.updateData({
        ...this.state,
        statusOutput: str_2
      });
    } else if (
      this.state.statusMode === "SIDEBYSIDE" &&
      this.state.compDetails === "SBSBAC"
    ) {
      this.updateData({
        ...this.state,
        statusOutput: str_1
      });
    }
  }
  render() {
    // console.log(
    //   this.state.videoInput,
    //   this.state.statusMode,
    //   this.state.compDetails
    // );
    // console.log(
    //   this.state.statusVideoInput.statusA,
    //   this.state.statusVideoInput.statusB
    // );

    if (this.state.loading)
      return (
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ marginTop: "15rem" }}
        >
          <FontAwesomeIcon icon={faSpinner} size="3x" spin color="#000" />
          <h1 className="text-neutral-regular d-flex m-3">Загрузка...</h1>
        </div>
      );
    return (
      <div className="d-flex flex-wrap flex-row">
        <nav className="navbar navbar-expand-lg navbar-light container pl-0 pr-0 pb-3">
          <ul className="navbar-nav">
            <NavLink to="/help">
              <li className="nav-item">
                <h3>Помощь</h3>
              </li>
            </NavLink>
          </ul>
        </nav>

        <div className="d-flex flex-wrap flex-row container p-5 pl-0 ml-0">
          <SettingsArea
            updateData={this.updateData}
            loading={this.state.loading}
            getStatus={this.getStatus}
            start={this.state.start}
            statusMode={this.state.statusMode}
            compDetails={this.state.compDetails}
            videoInput={this.state.videoInput}
          />
          <RecordingArea
            stop={this.state.stop}
            start={this.state.start}
            getStatus={this.getStatus}
            status={this.state.status}
            statusOutput={this.state.statusOutput}
            history={this.props.history}
            camStatus={this.state.enc1[0]}
            interval={this.interval}
            updateData={this.updateData}
            loading_record={this.state.loading_record}
            handleShowModal={this.handleShowModal}
            handleHideModalSucces={this.handleHideModalSucces}
            handleHideModalContinue={this.handleHideModalContinue}
            showModal={this.state.showModal}
            error={this.state.error}
            messageError={this.state.messageError}
          />
          <div style={{ display: "none" }}>
            <ErrorPage history={this.props.history} />
          </div>
        </div>
      </div>
    );
  }
}
