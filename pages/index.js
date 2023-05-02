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

  const endingMsgs = [
    "Hello, I am PigBot.",
    "It seems that today is a special day for WS.",
    "I am here to deliver some instructions to you, assuming that you are WS.",
    "Please pack and bring the following items tonight:",
    "- PJs\n- Toothbrush & toothpaste\n- Towel",
    "I would also like to find out which place would you like to go for dinner tonight?",
    "1) Hot Tomato\n2) Jianghu Hotpot\n3) Swenson's\n4) Seoul Garden\n5) Collin's\n6) Others (please specify)"
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
