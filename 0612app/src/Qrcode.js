import React from "react";
import { Player, BigPlayButton } from "video-react";
import "video-react/dist/video-react.css";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";

const Qrcode = () => {
  return (
    <div style={{ textAlign: "center", margin: 32 }}>
      <h2>SVG QRCode</h2>
      <QRCodeSVG value="https://reactjs.org/" size={180} />

      <h2>Canvas QRCode</h2>
      <QRCodeCanvas value="https://reactjs.org/" size={180} />

      <h2>帶有圖片的 SVG QRCode</h2>
      <QRCodeSVG
        value="https://reactjs.org/"
        size={180}
        imageSettings={{
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThMPLr9fQgnS9ggFHLLYDBCs6w04tDmEMLlQ&s",
          x: undefined, // 自動置中
          y: undefined,
          height: 40,
          width: 40,
          excavate: true, // 讓圖片區域不會被QR遮住
        }}
      />
      <Player
      playsInline
      poster="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThMPLr9fQgnS9ggFHLLYDBCs6w04tDmEMLlQ&s"
      src="https://www.w3schools.com/html/mov_bbb.mp4"
      playbackRates={[0.5, 1, 1.5, 2]}
      controls={true}
      seekSeconds={10}
      inactivityTimeout={3000}
      hideControlsOnMouseLeave={true}
    >
      <BigPlayButton position="center" />
    </Player>
    </div>
  );
};

export default Qrcode;