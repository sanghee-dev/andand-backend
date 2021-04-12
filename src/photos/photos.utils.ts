export const processHashtags = (caption) => {
  let hashtagObj = [];
  if (caption) {
    const hashtags = caption.match(/#[\w]+/g);
    hashtagObj = hashtags?.map((hashtag) => ({
      where: { hashtag },
      create: { hashtag },
    }));
  }
  return hashtagObj;
};
