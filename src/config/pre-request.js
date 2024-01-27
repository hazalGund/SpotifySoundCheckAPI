import http from "k6/http";
import { check, sleep } from "k6";
import options from "./data.js";

export default function getAccessToken() {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const params = {
    grant_type: "client_credentials",
    client_id: options.clientId,
    client_secret: options.clientSecret,
  };

  const tokenResponse = http.post(options.tokenUrl, params, headers);

  check(tokenResponse, {
    "Get Token Response Status is 200": (res) => res.status === 200,
    "Response has access_token": (res) =>
      JSON.parse(res.body).access_token !== null,
  });

  const accessToken = JSON.parse(tokenResponse.body).access_token;

  console.log("Token Response is:", tokenResponse.body);
  console.log("Access Token is:", accessToken);

  sleep(0.5);

  return accessToken;
}
