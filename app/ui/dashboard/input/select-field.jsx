import React from 'react'

function SelectField({label,value,onChange,options,...rest}) {
  return (
    <div className="px-2 py-2 w-[50%]">
    <label className="my-2" htmlFor={label}>
      {label}
    </label>
    <select
      className="focus:shadow-primary-outline darkbg-slate-850 darktext-white leading-5.6 ease block w-full rounded border border-solid border-slate-600 px-1 py-2 mt-3 font-normal text-slate-200 outline-none transition-all focus:border-blue-300 text-xs focus:outline-none bg-[#2e374a]"
      required={true}
      value={value}
      onChange={onChange}
      {...rest}
    >
      <option value="">Select option</option>
      {options &&
        options?.map((option, index) => (
          <option
            className="bg-slate-900 text-xs text-[white]"
            value={option}
            key={index + option}
          >
            {option}
          </option>
        ))}
    </select>
  </div>
  )
}

export default SelectField