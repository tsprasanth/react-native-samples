import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AesGcmCrypto from 'react-native-aes-gcm-crypto';
import {
  useTheme,
  isDayOrMoment,
  useTranslationContext,
  MessageSimple,
} from 'stream-chat-react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    height: 16,
    justifyContent: 'center',
    marginVertical: 4,
    paddingHorizontal: 8,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

type InlineDateSeparatorProps = {
  date?: Date;
};

const key = 'Yzg1MDhmNDYzZjRlMWExOGJkNTk5MmVmNzFkOGQyNzk=';


export const CustomMessage = (props) => {

      AesGcmCrypto.decrypt(
      't44W',
      key,
      'aebf9f6c257976e7e1b0146b',
      '5e3563ebfebe18aa9a9f2ba6f4fdcaf1',
      false
    ).then((decryptedData) => {
      console.log(decryptedData);
    });

  return (
    <MessageSimple
    MessageText={CustomMessageTextComponent}
    {...props}
/>
  );
};

const CustomMessageTextComponent = ({ message }) => {
  return <Text>{message.text}</Text>
}
