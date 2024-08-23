import { Button, Form, InputGroup, Card } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useEffect, useState } from "react";

export default function Weathercard() {
  const [data, setData] = useState("");
  const [city, setCity] = useState("Mumbai");

  useEffect(() => {
    fetchData(city);
  }, []);

  async function fetchData(city) {
    let result = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ed8bf002e3ac3f200062a4905403004e&units=metric`,
      {
        method: "GET",
      }
    );
    result = await result.json();
    console.log("message", result);

    if (result) {
      setData(result);
    }

    if (result.cod === "404") {
      alert("City Not Found");
      setData(null);
      setCity("");
    }
  }

  return (
    <div
      fluid
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
      }}
    >
      <Card
        className="text-center p-4"
        style={{
          maxWidth: "30rem",
          width: "100%",
          backgroundColor: "#FFFFFF",
          borderColor: "#E0E0E0",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="my-3">
          <h3 style={{ color: "#007BFF" }}>Weather App</h3>
          <InputGroup
            className="mb-3 mx-auto"
            style={{ maxWidth: "24rem", width: "100%" }}
          >
            <Form.Control
              placeholder="Enter City Name"
              style={{ borderColor: "#E0E0E0" }}
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
            <Button
              variant="outline-primary"
              id="button-addon2"
              onClick={() => {
                fetchData(city);
              }}
            >
              <SearchIcon />
            </Button>
          </InputGroup>
        </div>
        {data && (
          <Card
            style={{
              maxWidth: "24rem",
              width: "100%",
              height: "auto",
              backgroundColor: "#007BFF",
              borderColor: "#E0E0E0",
            }}
            className="mx-auto"
          >
            <div className="p-3">
              <h2 className="mt-2 text-white">
                {" "}
                <LocationOnIcon className="fs-2 mb-2" />
                {data.name}{" "}
              </h2>
              <h6 className="mt-2 text-center text-white">
                {new Date().toLocaleString("en-US", { weekday: "long" })}{" "}
                <span>{new Date().toLocaleDateString()}</span>{" "}
                <span>{new Date().toLocaleTimeString("en-US")}</span>{" "}
                <span></span>
              </h6>
              <img
                src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                className="mx-auto "
                alt="Weather icon"
                style={{ width: "100px", height: "100px" }}
              ></img>
              <h6 className="my-1 text-center text-white">
                {data.weather[0].description}
              </h6>
              <h1 className="text-center text-white">{data.main.temp}°C</h1>
              <h6 className="my-1 text-center text-white">
                Feels Like {data.main.feels_like}°C
              </h6>
              <Card
                style={{
                  maxWidth: "20rem",
                  width: "100%",
                  backgroundColor: "#FFFFFF",
                  borderColor: "#E0E0E0",
                }}
                className="mx-auto"
              >
                <div className="p-1">
                  <h6 className="my-3" style={{ color: "#343A40" }}>
                    Wind is {data.wind.speed} Knots in {data.wind.deg}°C
                  </h6>
                </div>
              </Card>
            </div>
          </Card>
        )}
      </Card>
    </div>
  );
}
