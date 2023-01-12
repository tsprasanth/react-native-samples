import React, { useEffect, useState } from 'react';
import {StyleSheet, Text} from 'react-native';
import {useTheme} from 'stream-chat-react-native';
import type {ChannelPreviewMessageProps} from 'stream-chat-react-native';
import AesGcmCrypto from 'react-native-aes-gcm-crypto';

const styles = StyleSheet.create({
  bold: {fontWeight: 'bold'},
  message: {
    flexShrink: 1,
    fontSize: 12,
  },
});

export const ChannelPreviewMessage = ({
  latestMessagePreview,
}: ChannelPreviewMessageProps) => {
  const {
    theme: {
      colors: {grey},
    },
  } = useTheme();


  function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
   }

  const lastMessagePreview = latestMessagePreview.previews[1];
  const key = 'Yzg1MDhmNDYzZjRlMWExOGJkNTk5MmVmNzFkOGQyNzk=';
  const [updateMessage,setUseMessage] = useState(null);

  useEffect(() => {
    if(lastMessagePreview !=null)
    {
      try {
        console.log("here "+lastMessagePreview.text);
      if(isJson(lastMessagePreview.text))
      {
        let {tag,iv,content} = JSON.parse(lastMessagePreview.text);
        AesGcmCrypto.decrypt(
          content,
          key,
          iv,
          tag,
          false
        ).then((decryptedData) => {
          setUseMessage(decryptedData);
          console.log("decrypt done"+lastMessagePreview.text)
       
        });
      }
      
    }

    catch (e) {
      throw e;
    }
     
    }
  
   
}, [lastMessagePreview]);

  return lastMessagePreview ? (
    <Text
      numberOfLines={2}
      style={[
        styles.message,
        lastMessagePreview.bold ? styles.bold : {},
        {color: grey},
      ]}>
      {updateMessage || null}
    </Text>
  ) : null;
};
