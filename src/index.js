import { group } from "k6";
import getAccessToken from "./config/pre-request.js";
import getArtist from "./tests/getArtist.js";

export const options = {
  //vus: 5,
  //duration: '15s'
};

export default function () {
  const testScenario = __ENV.TEST_SCENARIO || "all";

  if (testScenario === "all" || testScenario === "login") {
    group("Login", function () {
      getAccessToken();
    });
  }

  if (testScenario === "all" || testScenario === "getArtist") {
    group("Get Artist", function () {
      getArtist();
    });
  }
}
