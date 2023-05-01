import styles from "../styles/Home.module.css";

import Head from "next/head";
import ChatComponent from "./ChatComponent";

export default function Home() {
  const firstMsgs = [
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
        <ChatComponent firstMsgs={firstMsgs} />
      </div>
    </div>
  );
}
