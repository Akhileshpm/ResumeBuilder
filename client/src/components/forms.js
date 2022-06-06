import React from "react";

export default function forms({fieldName,name}){
    // props.onChange;
    return(
        <label>
          {fieldName}
        <input type="text" name={fieldName} value={name} />
      </label>
    );
}

