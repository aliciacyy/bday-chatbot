import chatStyles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  Avatar,
  MainContainer,
  ChatContainer,
  ConversationHeader,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const ChatComponent = (props) => {
  const [showTyping, setShowTyping] = useState(false);
  const [disableInput, setDisableInput] = useState(true);
  const [voucherMsg, setVoucherMsg] = useState(false);
  const [msgList, setMsgList] = useState([]);
  const [firstReply, setFirstReply] = useState();
  const { firstMsgs } = props;

  useEffect(() => {
    // fetch('https://bdaybotinput.pigso.repl.co/listUsers')
    //   .then(response => response.json())
    //   .then(json => console.log(json))
    //   .catch(error => console.error(error));

    for (let i = 0; i < firstMsgs.length; i++) {
      const msgTimeout = setTimeout(() => {
        setTimeout(() => {
          setShowTyping(true);
        }, 1000);
        setTimeout(() => {
          setMsgList((prev) => [...prev, firstMsgs[i]]);
          setShowTyping(false);
        }, 3000);
      }, 3000 * (i + 1));
    }
    setTimeout(() => {
      setDisableInput(false);
    }, 3000 * (firstMsgs.length + 1));
  }, []);

  const onSendMsg = (event) => {
    let date = new Date();
    const data = {
      answer: event + ' - ' + date.toLocaleString()
    };

    const lol = fetch("https://bdaybotinput.pigso.repl.co/addUser", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    setFirstReply(event);
    setDisableInput(true);
    setTimeout(() => {
      setShowTyping(true);
    }, 1000);
    setTimeout(() => {
      setVoucherMsg(true);
      setShowTyping(false);
    }, 3000);
  };

  return (
    <MainContainer>
      <ChatContainer>
        <ConversationHeader>
          <Avatar
            src="./imgs/pig-icon.png"
            name="PigBot2023"
            status="available"
          />
          <ConversationHeader.Content userName="PigBot2023" info="online" />
        </ConversationHeader>
        <MessageList
          typingIndicator={
            showTyping && <TypingIndicator content="PigBot2023 is typing" />
          }
        >
          {msgList.map((msg) => (
            <Message
              key={msg}
              model={{
                message: msg,
              }}
            />
          ))}
          {firstReply && (
            <Message
              key="firstReply"
              model={{
                message: firstReply,
                direction: "outgoing",
                position: "last",
              }}
            />
          )}
          {voucherMsg && (
            <Message
            key="voucher"
            model={{
              direction: "incoming",
              message: "Noted with thanks. Coming soon."
            }}
          />
            // <Message
            //   key="voucher"
            //   model={{
            //     direction: "incoming",
            //   }}
            // >
            //   <Message.CustomContent>
            //     <Link href="/voucher">Click me for your reward!</Link>
            //   </Message.CustomContent>
            // </Message>
          )}
        </MessageList>
        <MessageInput
          disabled={disableInput}
          placeholder="Type message here"
          attachButton={false}
          onSend={onSendMsg}
        />
      </ChatContainer>
    </MainContainer>
  );
};

export default ChatComponent;
