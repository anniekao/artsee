import React from 'react';

import ArtCard from './ArtCard';
import { FlatList } from 'react-native-gesture-handler';

export default Deck = ({arts, user, postNewComment, comments, postTag, filter, users}) => {

  let data = filter.map(artId => {
    const artComments = comments.filter(comment => comment.art_id === arts[artId].id );
    return {
      id: artId,
      comp: arts[artId],
      ogUser: users[arts[artId].user_id],
      comments: artComments
    }

  })

  data.sort(function(a, b) {
    a = new Date(a.created_at);
    b = new Date(b.created_at);
    return a>b ? -1 : a<b ? 1 : 0;
});

  if (data) {
    return (
      <FlatList
        data={data}
        renderItem={({item}) => <ArtCard comp={item.comp} postTag={postTag} postNewComment={postNewComment} user={user} ogUser={item.ogUser} comments={item.comp.comments} users={users} />}
        keyExtractor={item => item.id.toString()}
      />
    )
  }
  return null
};
