import React, {useCallback, useContext, useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';

import {
  Channel as StreamChannel,
  MessageInput,
  MessageList,
  LoveReaction,
  ThumbsUpReaction,
  ThumbsDownReaction,
  ChannelProps,
  useChatContext,
} from 'stream-chat-react-native';

import type {
  Channel as StreamChatChannel,
  Message as StreamMessage,
  SendMessageAPIResponse,
} from 'stream-chat';

import {myMessageTheme} from '../../theme';
import {HahaReaction, QuestionReaction, ExclamationReaction} from '../../icons';
import {AppContext} from '../../contexts/AppContext';

import {InlineDateSeparator} from './InlineDateSeparator';
import {InputButtons} from './InputButtons';
import {SendButton} from './SendButton';
import AesGcmCrypto from 'react-native-aes-gcm-crypto';
import { MessageText } from './MessageText';

interface ChatScreenProps {
  channel: typeof Channel,
  screen: typeof String
}

const key = 'Yzg1MDhmNDYzZjRlMWExOGJkNTk5MmVmNzFkOGQyNzk=';




const SUPPORTED_REACTIONS = [
  {
    Icon: LoveReaction,
    type: 'love',
  },
  {
    Icon: ThumbsUpReaction,
    type: 'like',
  },
  {
    Icon: ThumbsDownReaction,
    type: 'sad',
  },
  {
    Icon: HahaReaction,
    type: 'hahaha',
  },
  {
    Icon: QuestionReaction,
    type: 'question',
  },
  {
    Icon: ExclamationReaction,
    type: 'exclamation',
  },
];

export const Channel: React.FC<ChannelProps> = ({
  children = (
    <View style={StyleSheet.absoluteFill}>
      <MessageList
        StickyHeader={() => null}
        InlineDateSeparator={InlineDateSeparator}
        
      />
      <MessageInput />
    </View>
  ),
  ...props
}) => {
  const {channel, messageId} = useContext(AppContext);
  const headerHeight = useHeaderHeight();

  // useEffect(() => {
  //   let enc;
  //   AesGcmCrypto.encrypt('abc', false, key).then((result) => {
  //     console.log(result);
  //   });

  //   AesGcmCrypto.decrypt(
  //     't44W',
  //     key,
  //     'aebf9f6c257976e7e1b0146b',
  //     '5e3563ebfebe18aa9a9f2ba6f4fdcaf1',
  //     false
  //   ).then((decryptedData) => {
  //     console.log(decryptedData);
  //   });
  // }, []);

  const  customSendMessage =  useCallback(
    async (
      _: string,
      message: StreamMessage,
    ): Promise<SendMessageAPIResponse> => {
      try {

        let response = null;
        console.log("beofre "+message.text);
        AesGcmCrypto.encrypt( message.text, false, key).then((result) => {
          console.log("stringify2 ");
          console.log("stringify "+JSON.stringify(result))
          message.text= JSON.stringify(result);
           return sendMsg(message,channel)
        });

        
      } catch (e) {
        throw e;
      }
    },
    [ ],)

    async function sendMsg(message,channel) {
      let response = await channel.sendMessage(message);
      return response;
    }

  return (
    <StreamChannel
      MessageReplies={() => null}
      messageId={messageId}
      messageActions={({isMyMessage, copyMessage, deleteMessage}) => {
        const acceptedActions = [copyMessage];
        if (isMyMessage) {
          acceptedActions.push(deleteMessage);
        }
        return acceptedActions;
      }}
      doSendMessageRequest={customSendMessage}
      supportedReactions={SUPPORTED_REACTIONS}
      myMessageTheme={myMessageTheme}
      keyboardVerticalOffset={headerHeight}
      MessageAvatar={() => null}
      enforceUniqueReaction
      allowThreadMessagesInChannel={false}
      InputButtons={InputButtons}
      SendButton={SendButton}
      MessageText={MessageText}
      {...props}>
      {children}
    </StreamChannel>
  );
};
