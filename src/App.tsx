import logo from "./logo.svg";
import "./App.css";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import { useEffect, useState } from "react";

const NUM_ICONS = 20;
const BASE_ICON_SIZE = 200;
const HEADER_HEIGHT = 1500;

function App() {
  const [logos, setLogos] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const newLogos = [];
    for (let i = 0; i < NUM_ICONS; i++) {
      const top = Math.floor(Math.random() * (HEADER_HEIGHT - BASE_ICON_SIZE));
      const left = Math.floor(
        Math.random() * (window.innerWidth - BASE_ICON_SIZE)
      );
      const size = Math.floor(Math.random() * (BASE_ICON_SIZE - 10)) + 10;
      newLogos.push(
        <div style={{ position: "absolute", top, left }}>
          <MiniLogo size={size} />
        </div>
      );
    }
    setLogos(newLogos);
  }, []);

  return (
    <div className="App">
      <header
        className="App-header"
        style={{
          height: HEADER_HEIGHT,
          position: "relative",
          marginBottom: 1000,
          overflow: "hidden",
        }}
      >
        {logos}
        <h1 style={{ zIndex: 100 }}>React App</h1>
        <p style={{ zIndex: 100 }}>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

function MiniLogo(props: { size: number }) {
  const proportion = props.size / BASE_ICON_SIZE;
  const { scrollY } = useViewportScroll();
  const translateY = useTransform(scrollY, (s) => s - s * proportion);
  return (
    <motion.div style={{ translateY }}>
      <img src={logo} height={props.size} width={props.size} />
    </motion.div>
  );
}

export default App;
