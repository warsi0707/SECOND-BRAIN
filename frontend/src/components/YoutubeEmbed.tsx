import { memo } from "react"
interface YoutubeProp {
    link:string,
    className?: string
}

 function YoutubeEmbed({link}: YoutubeProp){
    const finalLink = link.replace('youtu.be','youtube.com/embed')
    return (
        <iframe
            height="190"
            className="w-full rounded-md"
            src={`${finalLink}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen>
      </iframe>
    )
}
export default memo(YoutubeEmbed)