import React, {useContext, useEffect} from 'react'
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack'
import {Chat} from 'stream-chat-react-native'
import {AppContext, noHeaderOptions} from '../App'
import {chatClient} from '../client'
import {RouteProp} from '@react-navigation/native'
import {StackNavigatorParamList} from '../types'
import Channel from '../screens/Channel'
import CustomWallpaper from '../screens/CustomWallpaper'
import WallpaperTypesOverview from '../screens/WallpaperTypesOverview'
import WhatsAppChannelWrapper from '../utils/WhatsAppChannelWrapper'
import ImagePreview from '../screens/ImagePreview'
import {ActivityIndicator, View} from 'react-native'
import {colors} from '../theme'
import {flex} from '../global'
import WallpaperTypeDetails from '../screens/WallpaperTypeDetails'

export type ChannelScreenNavigationProp = StackNavigationProp<
  StackNavigatorParamList,
  'ChannelScreen'
>
export type ChannelScreenRouteProp = RouteProp<
  StackNavigatorParamList,
  'ChannelScreen'
>
export type ChannelScreenProps = {
  navigation: ChannelScreenNavigationProp
  route: ChannelScreenRouteProp
}

const Stack = createStackNavigator()

export default ({
  route: {
    params: {channelId},
  },
}: ChannelScreenProps) => {
  const {channel, setChannel} = useContext(AppContext)

  useEffect(() => {
    const initChannel = async () => {
      if (!chatClient || !channelId) return

      const newChannel = chatClient?.channel('messaging', channelId)

      if (!newChannel?.initialized) {
        await newChannel?.watch()
      }
      setChannel(newChannel)
    }

    initChannel()
  }, [channelId, setChannel])

  if (!channel)
    return (
      <View
        style={{
          ...flex.itemsContentCenter1,
          backgroundColor: colors.dark.background,
        }}>
        <ActivityIndicator size={'large'} />
      </View>
    )

  return (
    <Chat client={chatClient}>
      <WhatsAppChannelWrapper channel={channel}>
        <Stack.Navigator
          initialRouteName="Channel"
          screenOptions={{
            headerTitleStyle: {alignSelf: 'center', fontWeight: 'bold'},
          }}>
          <Stack.Screen
            component={Channel}
            name="Channel"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            component={ImagePreview}
            name="ImagePreview"
            options={noHeaderOptions}
          />
          <Stack.Screen
            component={CustomWallpaper}
            name="CustomWallpaper"
            options={noHeaderOptions}
          />
          <Stack.Screen
            component={WallpaperTypesOverview}
            name="WallpaperTypesOverview"
            options={noHeaderOptions}
          />
          <Stack.Screen
            component={WallpaperTypeDetails}
            name="WallpaperTypeDetails"
            options={noHeaderOptions}
          />
        </Stack.Navigator>
      </WhatsAppChannelWrapper>
    </Chat>
  )
}