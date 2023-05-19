import { useEffect, useState } from "react";
import "./App.css";
import AgoraRTC from "agora-rtc-sdk-ng";

AgoraRTC.setLogLevel(2);

const APP_ID = "YOUR_APP_ID";
const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
const track = await AgoraRTC.createMicrophoneAudioTrack();

function App() {
  const [isJoined, setJoined] = useState(false);

  useEffect(() => {
    console.log("Try join");
    client
      .join(APP_ID, "test", null, null)
      .then((e) => {
        console.log("Join complete", e);
        setJoined(true);
      })
      .catch((e) => {
        setJoined(false);
        console.log("Join error", e);
      });
    return () => {
      client.leave();
      setJoined(false);
    };
  }, []);
  return <div>{isJoined ? <AfterJoinComponent /> : <div>not joined</div>}</div>;
}

const AfterJoinComponent = () => {
  useEffect(() => {
    console.log("Try publish");
    client
      .publish([track])
      .then((e) => {
        console.log("publish success", e);
      })
      .catch((e) => {
        console.log("publish error", e);
      });
  }, []);
  return <div>isjoined {client.channelName}</div>;
};

export default App;
