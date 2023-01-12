import {StreamChat} from 'stream-chat';
import {
  STREAM_API_KEY,
  STREAM_USER_TOKEN,
  STREAM_USER_ID,
} from 'react-native-dotenv';

export const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlcjEifQ.U2pNTC6DDE7hbCB_q4mc1XetplNg7pg9EAKYBbA8MZY";
export const user = {id: "user1"};

type LocalAttachmentType = Record<string, unknown>;
type LocalChannelType = Record<string, unknown>;
type LocalCommandType = string;
type LocalEventType = Record<string, unknown>;
type LocalMessageType = Record<string, unknown>;
type LocalReactionType = Record<string, unknown>;
type LocalUserType = Record<string, unknown>;

export type StreamChatGenerics = {
  attachmentType: LocalAttachmentType;
  channelType: LocalChannelType;
  commandType: LocalCommandType;
  eventType: LocalEventType;
  messageType: LocalMessageType;
  reactionType: LocalReactionType;
  userType: LocalUserType;
};

export const chatClient =
StreamChat.getInstance<StreamChatGenerics>("bfpcytvr8xfz");
