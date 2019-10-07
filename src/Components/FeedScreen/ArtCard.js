import React from 'react';
import { Text,Toast } from "native-base";
import { View, Dimensions } from 'react-native';

import CachedImage from '../../helpers/CachedImage';
import artCardStyle from '../../../styles/artCard'
import { colors } from '../../../styles/variables';
import Icon from "react-native-vector-icons/Ionicons";
import IconMat from 'react-native-vector-icons/MaterialIcons';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const showInfographic = function(text) {
  Toast.show({
    text: text,
    position: 'bottom',
    duration: 500
  })
}

export default ArtCard = ({comp, postTag, user}) => {
  const imgUrl = 'https://arzmkdmkzm.cloudimg.io/width/' + screenWidth + '/x/' + comp.img_url;

  const bookmark = (comp, postTag) => <IconMat name={comp.seelist ? 'bookmark' : 'bookmark-border'} color={comp.seelist ? colors.seen : colors.color1} size={26} artID={comp.id} userID={comp.user_id} onPress={() => postTag(comp.id, 'seelist', !comp.seelist, user)} style={artCardStyle.icons} />;
  const heart = (comp, postTag) => <Icon name={comp.liked ? 'ios-heart' : 'ios-heart-empty'} color={comp.liked ? colors.like : colors.color1} size={26} artID={comp.id} userID={comp.user_id} onPress={() => postTag(comp.id, 'liked', !comp.liked, user)} style={artCardStyle.icons} />;
  const map = (comp, postTag) => <Icon name={comp.visited ? 'ios-map' : 'ios-pin'} color={comp.visited ? colors.bookmark : colors.color1} size={26} artID={comp.id} userID={comp.user_id} onPress={() => postTag(comp.id, 'visited', !comp.visited, user)} style={artCardStyle.icons} />;

  return (
    <View style={artCardStyle.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={artCardStyle.head}>{comp.title || 'Art peace!'}</Text>
        <Text style={{...artCardStyle.head, fontSize: 22}}>{comp.user_id}</Text>
      </View>
      {/* <Image source={{ uri: imgUrl }} style={{ width: screenWidth, height: screenWidth }} /> */}
      <CachedImage
        source={imgUrl}
        title={comp.id}
        style={{ width: screenWidth, height: screenWidth }}
        height={screenWidth}
      />
      {/* <Image style={{ width: screenWidth, height: screenWidth }} {...{preview, imgUrl}} /> */}
      <View style={artCardStyle.iconContainer}>
          {heart(comp, postTag)}
          {map(comp, postTag)}
          {bookmark(comp, postTag)}
      </View>
      <Text style={artCardStyle.comment}>comments...</Text>
    </View>
  )
}