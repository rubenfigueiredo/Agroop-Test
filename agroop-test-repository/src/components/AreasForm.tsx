import React, { useState, useEffect } from "react";
import { Area } from "../services/AreaService";
import styles from "../styles/components/form.module.scss";

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
    }
  }, [props.area]);

  console.log('render', props.area);
  

  const handleChange = (event: any) => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));
  };
  const handleSubmit = (event: any) => {
    if (event) event.preventDefault();
    props.submitAction(values);
  };

  return (
    <div className={styles.form__container}>
        <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.form__label_container}>
            <label className={styles.form__label}>
              <input
                name="area"
                onChange={handleChange}
                value={values.area}
                required
                type="text"
                className={styles.form__input}
                placeholder="Area"
              />
            </label>
            <label className={styles.form__label}>
              <input
                name="crop"
                onChange={handleChange}
                value={values.crop}
                required
                type="text"
                className={styles.form__input}
                placeholder="Crop"
              />
            </label>
            <div>
              <label>
                <span>Device:  </span> 
                <select className={styles.form__select} name="device" onChange={handleChange} required>
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
            </div>
            <label className={styles.form__label}>
              <input
                name="name"
                onChange={handleChange}
                value={values.name}
                required
                type="text"
                className={styles.form__input}
                placeholder="Name"
              />
            </label>
          </div>
          <div className={styles.form__align_right}>
            <button>Cancel</button>
            <button className={styles.form__button_save} type="submit">Save</button>
          </div>
        </form>
    </div>
  );
};

export default AreasForm;
