const IP = `10.16.208.136`;
//http://10.16.208.136/Monarch/getStatusAjax.aspx?getCalEvents=0
class ApiMonarch {
  async ExecuteCommand(command) {
    let response = await fetch(
      `http://${IP}/Monarch/syncconnect/sdk.aspx?command=${command}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "text/plain",
          Authorization: "Basic YWRtaW46YWRtaW4=",
          "cache-control": "no-cache",
          "Access-Control-Allow-Origin": "http://127.0.0.1:3000",
          "Access-Control-Allow-Credentials": true
        }
      }
    );
    return await response.text();
  }

  async SettingsExecuteCommand(command) {
    let response = await fetch(
      `http://${IP}/Monarch/syncconnect/sdk.aspx?command=${command}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "text/plain",
          Authorization: "Basic YWRtaW46YWRtaW4=",
          "cache-control": "no-cache",
          "Access-Control-Allow-Origin": "http://127.0.0.1:3000",
          "Access-Control-Allow-Credentials": true
        }
      }
    );
    return await response.text();
  }

  async GetStatusMode() {
    let response = await fetch(
      `http://10.16.208.136/Monarch/getStatusAjax.aspx?getCalEvents=0`,
      {
        method: "GET",
        headers: {
          "Content-Type": "text/plain",
          Authorization: "Basic YWRtaW46YWRtaW4=",
          "cache-control": "no-cache",
          "Access-Control-Allow-Origin": "http://127.0.0.1:3000",
          "Access-Control-Allow-Credentials": true
        }
      }
    );
    return await response.text();
  }

  // async GetInputStatus() {
  //   let test = await fetch(
  //     `http://10.16.208.136/Monarch/getStatusAjax.aspx?getCalEvents=0`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "text/plain",
  //         Authorization: "Basic YWRtaW46YWRtaW4=",
  //         "cache-control": "no-cache",
  //         "Access-Control-Allow-Origin": "http://127.0.0.1:3000",
  //         "Access-Control-Allow-Credentials": true
  //       }
  //     }
  //   );
  //   console.log(await test.text());
  // }
}

export default new ApiMonarch();
