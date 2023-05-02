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
import { useEffect, useState, useReducer } from "react";
import { useRouter } from 'next/router'

const ChatComponent = (props) => {
  const [showTyping, setShowTyping] = useState(false);
  const [disableInput, setDisableInput] = useState(true);
  const [voucherMsg, setVoucherMsg] = useState(false);
  const [msgList, setMsgList] = useState([]);

  const [statusState, dispatchStatus] = useReducer((state, action) => {
    return { status: "unavailable", msg: "offline" };
  }, { 
    status: "available", 
    msg: "online" 
  });

  const [firstQn, setFirstQn] = useState();
  const [firstReply, setFirstReply] = useState();
  const [wrongAnswer, setWrongAnswer] = useState();

  const { firstMsgs, questions } = props;
  const router = useRouter();

  const durationUntilFirstMsgs = 3000 * (firstMsgs.length + 1);
  let qnIdx = 0;

  useEffect(() => {
    // fetch('https://bdaybotinput.pigso.repl.co/listUsers')
    //   .then(response => response.json())
    //   .then(json => console.log(json))
    //   .catch(error => console.error(error));

    // print the first msgs
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

    // ask first question
    setTimeout(() => {
      setTimeout(() => {
        setShowTyping(true);
      }, 1000);
      setTimeout(() => {
        setFirstQn(questions[qnIdx]);
        setShowTyping(false);
      }, 3000);
    }, durationUntilFirstMsgs);

    setTimeout(() => {
      setDisableInput(false);
    }, durationUntilFirstMsgs + 3000);
  }, []);

  const onSendMsg = (event) => {
    // let date = new Date();
    // const data = {
    //   answer: event + ' - ' + date.toLocaleString()
    // };

    // const lol = fetch("https://bdaybotinput.pigso.repl.co/addUser", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });

    setFirstReply(event);
    setDisableInput(true);

    // validate msg
    let ans = questions[qnIdx].answer;
    setTimeout(() => {
      setShowTyping(true);
    }, 1000);
    if (ans !== event.trim().toLowerCase()) {
      setTimeout(() => {
        dispatchStatus(true);
        setWrongAnswer(true);
        setShowTyping(false);
      }, 3000);
    } else {
      setTimeout(() => {
        setVoucherMsg(true);
        setShowTyping(false);
      }, 3000);
    }
  };

  return (
    <MainContainer>
      <ChatContainer>
        <ConversationHeader>
          <Avatar
            src="./imgs/pig-icon.png"
            name="PigBot2023"
            status={statusState.status}
          />
          <ConversationHeader.Content userName="PigBot2023" info={statusState.msg} />
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

          {firstQn && (
            <Message
              key="firstQn"
              model={{
                message: firstQn.question,
              }}
            />
          )}

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

          {wrongAnswer && (
            <Message
            key="wrongAns"
            model={{
              direction: "incoming",
              message: "WRONG! Please refresh and try again. Bye."
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
