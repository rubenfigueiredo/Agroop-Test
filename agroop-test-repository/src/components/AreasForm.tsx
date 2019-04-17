import React, { useState, useEffect } from "react";
import { Area } from "../services/AreaService";
interface IUpdateAreaProps {
  area?: Area;
  devices: any;
  submitAction: (value: any) => any;
}
const AreasForm: React.SFC<IUpdateAreaProps> = (props: IUpdateAreaProps) => {
  let area: Area = props.area || {
    name: "",
    area: "",
    crop: "",
    device: ""
  };

  const [values, setValues] = useState(area);

  useEffect(() => {
    if(props.area){
      setValues(props.area);
      console.log("useState updated", values);
    }
  }, [props.area]);

  console.log('render', props.area);
  

  const handleChange = (event: any) => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));
    console.log("values", values);
  };
  const handleSubmit = (event: any) => {
    if (event) event.preventDefault();
    props.submitAction(values);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Area:{" "}
          <input
            name="area"
            onChange={handleChange}
            value={values.area}
            required
            type="text"
          />
        </label>
        <label>
          Crop:{" "}
          <input
            name="crop"
            onChange={handleChange}
            value={values.crop}
            required
            type="text"
          />
        </label>
        <label>
          Device:{" "}
          <select name="device" onChange={handleChange}>
            {props.devices ? (
              props.devices.map((device: any, index: any) => (
                <option key={index} value={device}>
                  {device}
                </option>
              ))
            ) : (
              <option value="">No devices to show</option>
            )}
          </select>
        </label>
        <label>
          Name:{" "}
          <input
            name="name"
            onChange={handleChange}
            value={values.name}
            required
            type="text"
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AreasForm;
