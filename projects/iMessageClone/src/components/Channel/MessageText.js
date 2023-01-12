import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from 'stream-chat-react-native';
import AesGcmCrypto from 'react-native-aes-gcm-crypto';
import { MessageUserBar } from './MessageHeader';
import { SCText } from './SCText';
import { Text } from 'react-native';

export const MessageText = React.memo((props) => {
  const { isThreadMessage, message, renderText } = props;

  
  const navigation = useNavigation();
  const { colors } = useTheme();
  const key = 'Yzg1MDhmNDYzZjRlMWExOGJkNTk5MmVmNzFkOGQyNzk=';
    
    const [updateMessage,setUseMessage] = useState(null);

    function isJson(str) {
      try {
          JSON.parse(str);
      } catch (e) {
          return false;
      }
      return true;
     }

     useEffect(() => {
      if(message !=null)
      {
        try {
          console.log("here "+message.text);
        if(isJson(message.text))
        {
          let {tag,iv,content} = JSON.parse(message.text);
          AesGcmCrypto.decrypt(
            content,
            key,
            iv,
            tag,
            false
          ).then((decryptedData) => {
            setUseMessage(decryptedData);
            console.log("decrypt done"+message.text)
         
          });
        }
        
      }

      catch (e) {
        throw e;
      }
       
      }
    
     
  }, [message]);

  return (
   <>{( updateMessage != null) && <>
     
      {message.attachments.length === 0 && <MessageUserBar {...props} />}
      {message.show_in_channel && !isThreadMessage && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ThreadScreen', {
              channelId: message.cid.substring(message.cid.indexOf(':') + 1),
              threadId: message.parent_id,
            });
          }}
          style={{
            backgroundColor: 'transparent',
            marginBottom: 10,
          }}>
          <SCText
            style={{
              color: colors.dimmedText,
            }}>
            replied to a thread{' '}
            {/* <SCText
              style={{
                color: colors.linkText,
              }}>
              {message.parentMessageText
                ? truncate(message.parentMessageText, 70, '...')
                : ''}
            </SCText> */}
          </SCText>
        </TouchableOpacity>
      )}
      <Text>{updateMessage}</Text>
      {/* {message != null && renderText({
        colors: Colors,
        markdownStyles: {
          inlineCode: {
            color: 'red',
            fontWeight: '200',
          },

          mentions: {
            fontWeight: '700',
          },
          // unfortunately marginVertical doesn't override the defaults for these within the 3rd party lib
          paragraph: {
            marginBottom: 0,
            marginTop: 0,
          },

          paragraphCenter: {
            marginBottom: 0,
            marginTop: 0,
          },
          paragraphWithImage: {
            marginBottom: 0,
            marginTop: 0,
          },
          text: {
            color: colors.text,
            
            fontSize: 16,
          },
        },
        message,
      })} */}
    </>
}</>  
  );
});
