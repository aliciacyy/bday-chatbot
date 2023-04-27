import styles from "../styles/Home.module.css";

import Head from "next/head";
import ChatComponent from "./ChatComponent";

export default function Home() {
  const firstMsgs = [
    "Hello, stranger.",
    "How you doin?"
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
