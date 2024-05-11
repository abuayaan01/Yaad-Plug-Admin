import React from "react";

function TextField({label, value, type, half, ...rest}) {
  return (
    <div className={`px-2 py-2 ${half ? 'w-[100%]' : 'w-[50%]'}`}>
      <div>
        <label htmlFor="productName">{label}</label><br />
        <input
          type={type || "text"}
          value={value}
          required
          className={`w-full px-3 py-2 my-3 border-[1px] border-slate-600 bg-[#2e374a] appearance-none rounded outline-none`}
          {...rest}
        />
      </div>
    </div>
  );
}

export default TextField;
