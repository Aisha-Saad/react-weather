import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";

import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "moment/min/locales"

import { useTranslation } from 'react-i18next';

moment.locale("ar");         // ar

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});
function App() {
  const { t, i18n } = useTranslation();
  const [local, setLocal] = useState("");
  const [timeandDate, settimeandDate] = useState("");
  const [temp, setTemp] = useState({
    number: null,
    description: "",
    min: null,
    max: null,
    icon:null,
  });


  function handelChangeLanguage(){
  
    if(local==="en"){
      setLocal("ar")
      i18n.changeLanguage("ar")
    }else{
      setLocal("en")
      i18n.changeLanguage("en")
    }

  }
  
  useEffect(() => {
    i18n.changeLanguage("ar")

    settimeandDate(moment().format('MMMM Do YYYY,   h:mm '))
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=24.6&lon=46.7&appid=b5fe871dfe12d53f4a9ced570be2eb3b"
      )

      .then(function (response) {
        // handle success
        const responsTemp = Math.round(response.data.main.temp - 272.15);
        const description = response.data.weather[0].description;
        const min = Math.round(response.data.main.temp_min - 272.15);
        const max = Math.round(response.data.main.temp_max - 272.15);
        const tempIcon = response.data.weather[0].icon;
        console.log(response.data.weather);
        setTemp({ number: responsTemp, description:description, max:max, min:min ,icon:`https://openweathermap.org/img/wn/${tempIcon}@2x.png`});
      })
    
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {/*=== {container}===== */}
        <Container
          maxWidth="sm"
          dir="rtl"
          style={
            {
              // display: "flex",
              // justifyContent: "center",
              // alignItems: "center",
            }
          }
        >
          <div
            style={{
              height: "100vh",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {/* {CARD} */}
            <div
              style={{
                background: "#f1faee",
                padding: "10px",
                boxShadow: " 0px 10px 1px rgba(0,0,0,0.05) ",
                borderRadius: "9px",
                width: "100%",
              }}
            >
              <div>
                <div style={{ padding: "10px" }}>
                  <Typography variant="h1">{t("Riyad")}</Typography>
                  
                </div>

                <div style={{ padding: "10px" }}>
                  <Typography variant="h5"> {timeandDate}</Typography>
                </div>
                <hr />
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <div>
                    {" "}
                    <Typography variant="h2" style={{ textAlign: "right" }}>
                      {temp.number}
                      <Typography variant="h6">{t(temp.description)}</Typography>
                    </Typography>
                      <img src={temp.icon}/>
                    <div
                      style={{
                        direction: "ltr",
                        textAlign: "right",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h5> {temp.min}: {t("min")} </h5>
                      <h5 style={{ padding: "0 9px " }}>|</h5>
                      <h5> {temp.max} : {t("max")}</h5>
                    </div>
                  </div>

                  <CloudIcon style={{ fontSize: "200px", color: "#80ced7" }} />
                </div>
              </div>
            </div>
            <div>
              <Button variant="text" style={{ color: "white" }} onClick={handelChangeLanguage}>
              {local==="en" ?"Arabic"  : "انجليزي"}
              </Button>
            </div>
          </div>
        </Container>

        {/*=== {container}===== */}
      </ThemeProvider>
    </div>
  );
}

export default App;
