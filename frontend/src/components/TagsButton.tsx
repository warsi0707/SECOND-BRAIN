import React, { memo } from "react";

interface TagsProps {
    title: string,
    onDelete?: React.MouseEventHandler<HTMLButtonElement>
}

function TagsButton({title, onDelete}: TagsProps) {
  return (
    <div className="flex text-sm bg-purple-secondary p-1 rounded-full px-2 gap-1">
      <p>#{title}</p>
      <button onClick={onDelete} className="text-red-500 cursor-pointer"><i className="fa-solid fa-xmark"></i></button>
    </div>
  );
}


export default memo(TagsButton)