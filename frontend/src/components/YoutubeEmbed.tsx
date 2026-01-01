export default function YoutubeEmbed(){
    return (
        <iframe
            height="180"
            className="w-full rounded-md"
            src={`https://www.youtube.com/embed/`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen>
      </iframe>
    )
}