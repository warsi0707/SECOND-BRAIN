import  React, { memo } from "react"

interface InputProps {
    name: string,
    label: string,
    type: string,
    placeholder?: string,
    value?: string,
    handleChange:  (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void,
    error?: string
}

function Input({name, label, type, placeholder, value, handleChange, error}: InputProps){
    return (
        <div className="flex flex-col gap-1">
            <label className="flex gap-2 items-end justify-between" htmlFor="">{label}  {error && <p className="text-red-500 text-sm">{error}</p>}</label>
            {type === 'select' &&
            <>
            <select name={name} value={value}  onChange={handleChange} id="" className="border p-2 rounded-md border-purple-primary">
                <option value="">Select content type</option>
                <option value="Notes">Notes</option>
                <option value="Videos">Videos</option>
                <option value="Twitter">Twiiter</option>
                <option value="Links">Links</option>
                 <option value="Documents">Documents</option>
            </select>
           
            </>
            }

            {type === 'text' &&
                <input value={value} onChange={handleChange} name={name} type={type} placeholder={placeholder} className="border p-2 rounded-md outline-none border-purple-primary"/>
            }
            {type === 'links' &&
                <input value={value} onChange={handleChange} name={name} type={type} placeholder={placeholder} className="border p-2 rounded-md outline-none border-purple-primary"/>
            }
            {type === 'textarea' &&
            <textarea value={value} onChange={handleChange} name={name} id="" className="border rounded-md outline-none p-2" placeholder={placeholder} rows={3}></textarea>}
        </div>
    )
}
export default memo(Input)