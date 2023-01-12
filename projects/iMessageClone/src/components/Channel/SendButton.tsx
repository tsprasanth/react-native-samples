import React from 'react';
import {TouchableOpacity} from 'react-native';
import {
  SendButtonProps,
  useMessageInputContext,
  useTheme,
  useChatContext,
  useChannelContext,
  useMessagesContext,
  SendUp,
} from 'stream-chat-react-native';
import {MessageResponse} from 'stream-chat'
import moment from 'moment'
/**
 * UI Component for send button in MessageInput component.
 */
export const SendButton = (props: SendButtonProps) => {
  const {sendMessage,text} = useMessageInputContext();
  const {client} = useChatContext()
  const {disabled = false} = props;
  const {updateMessage} = useMessagesContext()
  const {channel} = useChannelContext()
  const sendCustomMessage = async () => {
  //console.log(text);
  sendMessage();
    const message: MessageResponse = {
      created_at: moment().toString(),
      mentioned_users: [],
      id: `random-id-${new Date().toTimeString()}`,
      status: 'sending',
      type: 'regular',
      user: client.user,
    }
    updateMessage(message);
    const {
      created_at,
      html,
      type,
      status,
      user,
      ...messageWithoutReservedFields
    } = message
   
  }


  const {
    theme: {
      colors: {ios_green},
      messageInput: {sendButton},
    },
  } = useTheme();

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={sendCustomMessage}
      style={[sendButton]}
      testID="send-button">
      <SendUp pathFill={ios_green} />
    </TouchableOpacity>
  );
};
