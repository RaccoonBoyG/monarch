export const commands = {
  pip_tl:
    "SetOperatingMode,PICTUREINPICTURE,INPUT_A_HDMI,INPUT_ANALOG,INPUT_A,COMPOSITION,PIP_TL,FALSE",
  pip_bl:
    "SetOperatingMode,PICTUREINPICTURE,INPUT_A_HDMI,INPUT_ANALOG,INPUT_A,COMPOSITION,PIP_BL,FALSE",
  pip_tr:
    "SetOperatingMode,PICTUREINPICTURE,INPUT_A_HDMI,INPUT_ANALOG,INPUT_A,COMPOSITION,PIP_TR,FALSE",
  pip_br:
    "SetOperatingMode,PICTUREINPICTURE,INPUT_A_HDMI,INPUT_ANALOG,INPUT_A,COMPOSITION,PIP_BR,FALSE",
  SBS_AB:
    "SetOperatingMode,SIDEBYSIDE,INPUT_A_HDMI,INPUT_ANALOG,INPUT_A,COMPOSITION,SBS_AB,FALSE",
  SBS_BA:
    "SetOperatingMode,SIDEBYSIDE,INPUT_A_HDMI,INPUT_ANALOG,INPUT_A,COMPOSITION,SBS_BA,FALSE",
  SBS_ACB:
    "SetOperatingMode,SIDEBYSIDE,INPUT_A_HDMI,INPUT_ANALOG,INPUT_A,COMPOSITION,SBS_ACB,FALSE",
  SBS_BAC:
    "SetOperatingMode,SIDEBYSIDE,INPUT_A_HDMI,INPUT_ANALOG,INPUT_A,COMPOSITION,SBS_BAC,FALSE",
  input_A:
    "SetOperatingMode,SINGLEISOLATED,INPUT_A_HDMI,INPUT_ANALOG,INPUT_A,INPUT_A",
  input_B:
    "SetOperatingMode,SINGLEISOLATED,INPUT_B_HDMI,INPUT_ANALOG,INPUT_A,INPUT_B",
  startRec: "StartBothEncoders",
  stopRec: "StopBothEncoders",
  getStatus: "GetStatus",
  getInputStatus: "GetInputStatus"
};
