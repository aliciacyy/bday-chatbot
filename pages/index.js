import styles from "../styles/Home.module.css";

import Head from "next/head";
import ChatComponent from "./ChatComponent";

export default function Home() {
  const firstMsgs = [
    "Hello, I am PigBot.",
    "It seems that today is a special day for WS.",
    "However, to ascertain that you are WS, I will need to give you a quiz first.",
    "If you get any questions wrong, you need to refresh and read this entire conversation again.",
    "Are you ready?",
  ];

  const questions = [
    { question: '1) Excuse me, ______? OK.', answer: 'not into me' },
    { question: '2) Wife\'s favourite Mandopop girl group?', answer: 's.h.e' },
    { question: '3) First overseas trip together to?', answer: 'legoland' },
    { question: '4) Movie watched in GV Gold Class?', answer: 'a star is born' },
    { question: '5) Food court food', answer: 'hokkien mee' },
  ];

  return (
    <div>
      <Head>
        <title>PigBot2023</title>
      </Head>
      <div style={{ position: "relative", height: "500px" }}>
        <ChatComponent firstMsgs={firstMsgs} questions={questions}/>
      </div>
    </div>
  );
}
