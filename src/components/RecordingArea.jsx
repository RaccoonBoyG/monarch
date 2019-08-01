import React, { Component } from "react";
import { Button } from "../containers/Button";
import ApiMonarch from "../services/api";
import { commands } from "../services/vars";
import StatusArea from "./StatusArea";
import $ from "jquery";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//StartBothEncoders

export default class RecordingArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stop_btn: false
    };

    this.interval = null;

    this.Start = this.Start.bind(this);
    this.Stop = this.Stop.bind(this);
    this.startCounter = this.startCounter.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.camStatus !== this.props.camStatus) {
      this.startCounter(prevProps.camStatus);
    }
  }

  startCounter(prevProps) {
    if (
      (prevProps === "READY" && this.props.camStatus === "READY") ||
      (prevProps === "ON" && this.props.camStatus === "ON") ||
      (prevProps === "READY" && this.props.camStatus === "ON")
    ) {
      this.interval = setInterval(() => this.props.getStatus(), 5000);
    } else if (
      prevProps === "ON" &&
      this.props.camStatus === "READY" &&
      this.state.stop_btn === false
    ) {
      clearInterval(this.interval);
      this.props.handleShowModal();
      this.props.updateData({
        error: true,
        messageError: "Произошло непредвиденное прерывание записи"
      });
    }
  }

  async Start() {
    this.setState({ stop_btn: false });
    this.props.updateData({ loading_record: true });

    if (!this.props.error) {
      try {
        let res = await ApiMonarch.ExecuteCommand(commands.startRec);
        if (res === "SUCCESS") {
          this.props.getStatus();
          this.startCounter();
        } else if (res === "FAILED" || res === "RETRY") {
          clearInterval(this.interval);
          this.props.history.push("/error");
        }
      } catch (error) {
        console.log(error);
        return this.props.history.push("/error");
      }
    } else {
      return this.props.history.push("/error");
    }
  }

  async Stop() {
    this.setState({ stop_btn: true });
    this.props.updateData({ loading_record: true });
    try {
      let res = await ApiMonarch.ExecuteCommand(commands.stopRec);
      if (res === "SUCCESS") {
        this.props.getStatus();
        clearInterval(this.interval);
      } else if (res === "FAILED" || res === "RETRY") {
        clearInterval(this.interval);
        return this.props.history.push("/error");
      }
    } catch (error) {
      console.log(error);
      return this.props.history.push("/error");
    }
  }

  render() {
    let {
      start,
      stop,
      status,
      statusOutput,
      loading_record,
      handleHideModalSucces,
      handleHideModalContinue,
      showModal,
      messageError
    } = this.props;

    return (
      <React.Fragment>
        {showModal ? (
          <Modal
            handleHideModalSucces={handleHideModalSucces}
            handleHideModalContinue={handleHideModalContinue}
            nameAlarm={messageError}
          />
        ) : null}

        <div
          className="d-flex flex-column"
          style={{ position: "fixed", right: "1rem", wordWrap: "break-word" }}
        >
          {loading_record ? (
            <Button
              name={
                <FontAwesomeIcon icon={faSpinner} size="3x" spin color="#000" />
              }
              classStyle={`btn btn-lg-custom btn-secondary disabled`}
              disable={true}
              styles={{ width: "16rem", height: "8rem" }}
            />
          ) : (
            <React.Fragment>
              <Button
                name={"Начать запись"}
                classStyle={`btn btn-lg-custom btn-success ${start} ${
                  start === "disabled" ? "hide" : ""
                } `}
                styles={{ width: "14rem", height: "8rem" }}
                click={start === "disabled" ? null : this.Start}
              />
              <Button
                name={"Остановить запись"}
                classStyle={`btn btn-lg-custom btn-danger ${stop} ${
                  stop === "disabled" ? "hide" : ""
                }`}
                styles={{ width: "14rem", height: "8rem" }}
                click={stop === "disabled" ? null : this.Stop}
              />
            </React.Fragment>
          )}
        </div>
        <div
          className="d-flex flex-column"
          style={{
            position: "fixed",
            right: "1rem",
            top: "15rem",
            wordWrap: "break-word",
            textAlign: "right"
          }}
        >
          <StatusArea status={status} statusOutput={statusOutput} />
        </div>
      </React.Fragment>
    );
  }
}

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.handleHideModalSucces = this.handleHideModalSucces.bind(this);
    this.handleHideModalContinue = this.handleHideModalContinue.bind(this);
  }
  componentDidMount() {
    const { handleHideModalContinue } = this.props;
    $(this.modal).modal("show");
    $(this.modal).on("hidden.bs.modal", handleHideModalContinue);
  }
  handleHideModalSucces() {
    const { handleHideModalSucces } = this.props;
    $(this.modal).modal("hide");
    handleHideModalSucces();
  }

  handleHideModalContinue() {
    const { handleHideModalContinue } = this.props;
    $(this.modal).modal("hide");
    handleHideModalContinue();
  }

  render() {
    return (
      <div
        className="modal fade"
        id="modal"
        ref={modal => (this.modal = modal)}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Предупреждение</h4>
            </div>
            <div className="modal-body">
              <p>{this.props.nameAlarm}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={this.handleHideModalContinue}
              >
                Продолжить настройки камеры
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
                onClick={this.handleHideModalSucces}
              >
                Я всё проверил
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
