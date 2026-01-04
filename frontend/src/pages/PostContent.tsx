import { memo, useCallback, useState } from "react";
import Input from "../components/Input";
import PostButton from "../components/buttons/PostButton";
import TagsButton from "../components/buttons/TagsButton";
import { useAppDispatch } from "../hooks/reduxHooks";
import { postThunk } from "../redux/features/userThunks";
import { postItemLinkSchema, postItemNotesSchema } from "../schema/schema";
import { z } from "zod";

interface PostProps {
  onclose: () => void;
}

interface PostFormData {
  contentType: string;
  link: string;
  title: string;
  files: string;
  description: string;
  tags: string[];
}
type FormError = {
  contentType?: string;
  link?: string;
  title?: string;
  description?: string;
  tags?: string;
} | null;

function PostContent(props: PostProps) {
  const dispatch = useAppDispatch();
    const [formError, setFormError] = useState<FormError>(null);
  const [formsData, setFormsData] = useState<PostFormData>({
    contentType: "",
    link: "",
    title: "",
    files: "",
    description: "",
    tags: [],
  });
  const [tagsInput, setTagsInput] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormsData((prev) => ({ ...prev, [name]: value }));
    setFormError({
      contentType: "",
      link: "",
      title: "",
      description: "",
      tags: "",
    });
  };
  const addTags = () => {
    if (!tagsInput) return;
    setFormsData((prev) => ({ ...prev, tags: [...prev.tags, tagsInput] }));
    setTagsInput("");
  };
  const deleteTag = useCallback((id: string) => {
    if (!id) return;
    let newTags = formsData.tags.filter((item) => item !== id);
    setFormsData((prev) => ({ ...prev, tags: newTags }));
  }, []);

  const handleUpload = async() => {
    if (!formsData.contentType) {
      setFormError({
        contentType: "Content type required",
      });
      return;
    }
    if (formsData.contentType === "Notes") {
      const result = postItemNotesSchema.safeParse(formsData);
      if (!result.success) {
        const flattenError = z.flattenError(result.error).fieldErrors;
        setFormError({
          title: flattenError?.title?.[0] || "",
          contentType: flattenError?.contentType?.[0] || "",
          description: flattenError?.description?.[0] || "",
        });
        return;
      }
      if(result.success){
        const data =await dispatch(postThunk(formsData))
        if(data.type === "fetch/postItem/fulfilled"){
          props.onclose()
        }
      }
    } else {
      const result = postItemLinkSchema.safeParse(formsData);
      if (!result.success) {
        const flattenError = z.flattenError(result.error).fieldErrors;
        setFormError({
          title: flattenError?.title?.[0] || "",
          link: flattenError?.link?.[0] || "",
        });
        return;
      }
      if(result.success){
        const data = await dispatch(postThunk(formsData))
        if(data.type === "fetch/postItem/fulfilled"){
          props.onclose()
        }
      }
    }
  };
  return (
    <div
      onClick={props.onclose}
      className="min-h-screen w-full fixed top-0 left-0 bg-black/70 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=" w-130 bg-white rounded-md space-y-5 p-3"
      >
        <div className="flex justify-between">
          <p className="text-xl">Post your content</p>
          <button onClick={props.onclose} className="cursor-pointer">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <Input
            value={formsData.contentType}
            handleChange={handleChange}
            name="contentType"
            label="Select Type"
            placeholder="Enter title"
            type="select"
            error={formError?.contentType}
          />
          <Input
            value={formsData.title}
            handleChange={handleChange}
            name="title"
            label="Title"
            placeholder="Enter title"
            type="text"
            error={formError?.title}
          />
          {formsData.contentType === "Documents" && (
            <div className="flex flex-col gap-1">
              <label htmlFor="">Your PDF</label>
              <input
                type="file"
                className="border p-2 rounded-md outline-none border-purple-primary"
              />
            </div>
          )}
          {formsData.contentType === "Notes" ? (
            <Input
              value={formsData.description}
              handleChange={handleChange}
              name="description"
              label="Description"
              placeholder="Enter something "
              type="textarea"
              error={formError?.description}
            />
          ) : (
            <Input
              value={formsData.link}
              handleChange={handleChange}
              name="link"
              label="Link"
              placeholder="paste your link"
              type="links"
              error={formError?.link}
            />
          )}
          <div className="space-y-2">
            <label htmlFor="">#Tags</label>
            <div className="flex border rounded-md ">
              <input
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                type="text"
                className="w-full outline-none p-2 rounded-md"
              />
              <button onClick={addTags} className="border-l p-2 cursor-pointer">
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {formsData.tags &&
                formsData.tags.map((item, indx) => (
                  <TagsButton
                    onDelete={() => deleteTag(item)}
                    key={indx}
                    title={item}
                  />
                ))}
            </div>
          </div>
          <PostButton title="Post" onclick={handleUpload} />
        </div>
      </div>
    </div>
  );
}

export default memo(PostContent);
