import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from '@mui/material/Button';


import { useState,useEffect } from "react";
import axios from "axios";

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});


function App() {

  const [temp, setTemp] = useState(null);
  useEffect(()=>{
    
    axios.get("https://api.openweathermap.org/data/2.5/weather?lat=24.7&lon=46.6&appid=b5fe871dfe12d53f4a9ced570be2eb3b")
  
  .then(function (response) {
    // handle success
    const responsTemp=Math.round(response.data.main.temp -272.15)
    setTemp(responsTemp)
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  },[])
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
              flexDirection:"column"
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
                  <Typography variant="h1">الرياض</Typography>
                </div>

                <div style={{ padding: "10px" }}>
                  <Typography variant="h5">الأحد 2024/08/5 </Typography>
                </div>
                <hr />
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <div
                    
                  >
                    {" "}
                    <Typography variant="h2" style={{ textAlign: "right" }}>
                      {temp}
                      <Typography variant="h6">broken clouds</Typography>
                      
                    </Typography>
                    {/* {TODO img tempretcher} */}
                    <div style={{ direction: "ltr", textAlign: "right" ,display:"flex" ,justifyContent:"space-between"}}>
                      <h5> 34 :الصغرى</h5>
                      <h5 style={{padding:"0 9px "}}>|</h5>
                      <h5> 34 :الكبرى</h5>
                    </div>
                  </div>

                  <CloudIcon style={{ fontSize: "200px", color: "#80ced7" }} />
                </div>
              </div>
            </div>
              <div >
              <Button variant="text" style={{color:"white"} }>انجليزي</Button>
              </div>
          </div>
        </Container>

        {/*=== {container}===== */}
      </ThemeProvider>
    </div>
  );
}

export default App;
