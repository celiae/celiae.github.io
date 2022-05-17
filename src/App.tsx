import { Card, CardContent, Typography, CardActionArea } from "@mui/material";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Card variant="outlined" sx={{ width: 300, my: 4 }}>
          <CardActionArea
            onClick={() => {
              window.open("http://celiae.dns.army:1024");
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                ceblog
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card variant="outlined" sx={{ width: 300 }}>
          <CardActionArea
            onClick={() => {
              window.open("http://celiae.dns.army:8443");
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                code-server
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </header>
    </div>
  );
}

export default App;
