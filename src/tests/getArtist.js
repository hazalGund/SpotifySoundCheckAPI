import http from "k6/http";
import { check } from "k6";
import options from "../config/data.js";
import getAccessToken from "../config/pre-request.js";

let accessToken;

export default function getArtist() {
  accessToken = getAccessToken();

  console.log("accessToken is:", accessToken);

  const getArtistResponse = http.get(
    options.getArtistUrl,
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  );

  check(getArtistResponse, {
    "Get Artist Response Status 200": (res) => res.status === 200,
    "Response Artist Name Success": (res) =>
      JSON.parse(res.body).name == "Andrea Bocelli",
  });
}
