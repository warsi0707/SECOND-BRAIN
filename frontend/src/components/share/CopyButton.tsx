import { memo } from "react";
import type React from "react";


interface CopyProp {
    isCopied: boolean,
    handleCopyLink: React.MouseEventHandler<HTMLButtonElement> 

}

function CopyButton({isCopied,handleCopyLink}: CopyProp) {
  return (
    <button
      onClick={handleCopyLink}
      className="flex bg-purple-primary text-white p-2 w-full justify-center items-center gap-2 rounded-md cursor-pointer"
    >
      {isCopied ? (
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-check"></i>
          <p>copied</p>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-paste"></i>
          <p>Share Brain</p>
        </div>
      )}
    </button>
  );
}

export default memo(CopyButton)