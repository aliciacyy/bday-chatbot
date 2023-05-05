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
import { useRouter } from "next/router";

const ChatComponent = (props) => {
  const [showTyping, setShowTyping] = useState(false);
  const [disableInput, setDisableInput] = useState(true);
  const [voucherMsg, setVoucherMsg] = useState(false);
  const [msgList, setMsgList] = useState([]);

  const [statusState, dispatchStatus] = useReducer(
    (state, action) => {
      if (action.type == "WRONG") {
        return { status: "unavailable", msg: "offline" };
      } else {
        return { status: "away", msg: "away" };
      }
    },
    {
      status: "available",
      msg: "online",
    }
  );

  const [qnIdx, setQnIdx] = useState(0);

  const [questionAndAnswer, setQuestionAndAnswer] = useState([]);

  const { firstMsgs, questions } = props;
  const router = useRouter();

  useEffect(() => {
    // fetch('https://bdaybotinput.pigso.repl.co/listUsers')
    //   .then(response => response.json())
    //   .then(json => console.log(json))
    //   .catch(error => console.error(error));

    const durationUntilFirstMsgs = 3000 * (firstMsgs.length + 1);
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
        setQuestionAndAnswer([{
          msg: questions[qnIdx].question,
          direction: 'incoming'
        }]);
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

    // setFirstReply(event);
    setDisableInput(true);
    setQuestionAndAnswer((prev) => [...prev, {
      msg: event,
      direction: 'outgoing'
    }]);

    // validate msg
    let ans = questions[qnIdx].answer;
    setTimeout(() => {
      setShowTyping(true);
    }, 1000);
    if (ans !== event.trim().toLowerCase()) {
      setTimeout(() => {
        setQuestionAndAnswer((prev) => [...prev, {
          msg: "WRONG! But I'll give you another chance.",
          direction: 'incoming'
        }]);
        setShowTyping(false);
        setDisableInput(false);
      }, 3000);
    } else {
      setQnIdx((prev) => prev + 1);
      if (qnIdx+1 >= questions.length) {
        setTimeout(() => {
          dispatchStatus({
            type: "CORRECT"
          });
          setVoucherMsg(true);
          setShowTyping(false);
        }, 3000);
      } else {
        setTimeout(() => {
          setShowTyping(true);
        }, 1000);
        setTimeout(() => {
          setQuestionAndAnswer((prev) => [...prev, {
            msg: questions[qnIdx+1].question,
            direction: 'incoming'
          }]);
          setShowTyping(false);
          setDisableInput(false);
        }, 3000);
      }
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
          <ConversationHeader.Content
            userName="PigBot2023"
            info={statusState.msg}
          />
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

          {questionAndAnswer.map((txt, idx) => (
            <Message
              key={'qanda' + idx}
              model={{
                message: txt.msg,
                direction: txt.direction
              }}
            />
          ))}

          {voucherMsg && (
            <Message
              key="voucher"
              model={{
                direction: "incoming",
              }}
            >
              <Message.CustomContent>
                Congrats, you have gotten all questions correct! You're indeed WS!<br/><br/>
                <Link href="/voucher">Click me for your reward!</Link>
              </Message.CustomContent>
            </Message>
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
