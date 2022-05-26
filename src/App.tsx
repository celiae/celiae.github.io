import "./App.css";
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Grid,
  Container,
  Stack,
  Divider,
  Link,
} from "@mui/material";
import { lightBlue } from "@mui/material/colors";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import HotelIcon from "@mui/icons-material/Hotel";
import RepeatIcon from "@mui/icons-material/Repeat";

export function CustomizedTimeline() {
  return (
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: "auto 0" }}
          align="right"
          variant="body2"
          color="text.secondary"
        >
          9:30 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot>
            <FastfoodIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Eat
          </Typography>
          <Typography>Because you need strength</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: "auto 0" }}
          variant="body2"
          color="text.secondary"
        >
          10:00 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary">
            <LaptopMacIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Code
          </Typography>
          <Typography>Because it&apos;s awesome!</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary" variant="outlined">
            <HotelIcon />
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Sleep
          </Typography>
          <Typography>Because you need rest</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
          <TimelineDot color="secondary">
            <RepeatIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Repeat
          </Typography>
          <Typography>Because this is the life you love!</Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}

const primary = lightBlue[500]; // #f44336

export function App() {
  return (
    <>
      <Container>
        <Stack>
          <Typography variant="h2" component="h2" color={primary}>
            Celiae
          </Typography>
          <Divider />
          <Typography mt={10} variant="h4" component="h2">
            Show my work
          </Typography>
          <Grid container spacing={2}>
            <Stack>
              <Grid item xs={4} md={4}>
                <Card variant="outlined" sx={{ width: 200, my: 4 }}>
                  <CardActionArea
                    onClick={() => {
                      window.open("http://celiae.dns.army:1024");
                    }}
                  >
                    <CardContent>ceblog</CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={4} md={4}>
                <Card variant="outlined" sx={{ width: 200 }}>
                  <CardActionArea
                    onClick={() => {
                      window.open("http://celiae.dns.army:8443");
                    }}
                  >
                    <CardContent>code-server</CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </Stack>
          </Grid>
          <Typography mt={10} variant="h5" component="h2">
            {/* 绝大多数不是我自己的东西,我只是在利用轮子. */}
            Most of the stuff is not my own, I'm just using the wheel.
          </Typography>
          <Typography mt={3} variant="h6" component="h2">
            {/* 我叫 Celiae ,这个网名来自我中文名的拼音 Cheng Liang. */}
            My name is Celiae , this screen name comes from the pronounce of my
            Chinese name Cheng Liang.
          </Typography>
          <Typography mt={5} variant="h5">
            {/* 我会尽量产出一些代码,同步到 */}I will try to produce some code,
            sync to
            <Link href="https://github.com/celiae">Github</Link>
          </Typography>
          <Typography mt={7} variant="h5">
            {/* 社交帐号 */}
            Social account
          </Typography>
          <Typography>
            <Link href="https://twitter.com/ceeliatt">Twitter</Link>
          </Typography>
          <Typography>
            <Link href="https://t.me/celiaetg">Telegram</Link>
          </Typography>
        </Stack>
        <Divider />
        <CustomizedTimeline />
      </Container>
    </>
  );
}

export default App;
