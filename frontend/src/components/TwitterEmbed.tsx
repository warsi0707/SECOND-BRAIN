import { memo } from "react";
import { Tweet } from "react-tweet";

interface Tweet {
  link: string;
}

function TwitterEmbed({ link }: Tweet) {
  const getTweetId = (url: string) => {
    const match = url.match(/status\/(\d+)/);
    return match ? match[1] : null;
  };

  const tweetId = getTweetId(link);

  if (!tweetId) {
    return <div>Invalid tweet URL</div>;
  }
  return (
    <div className="">
      <Tweet id={tweetId} />
    </div>
  );
}

export default memo(TwitterEmbed);
