export interface graphLine {
  key: string,
  color: string
}

function sumValues(array: any, selectedValues? : graphLine[]){
    if(!array){
        return null;
    }
    function isSelected(values: graphLine[], key: any){
      let isSelected: boolean = false;
      values.forEach((value: any) => {
        if(value.key === key){
          isSelected = true;
        }
      });
      
      return isSelected;
    }
    const result = selectedValues && array.map((element:any) => {
      let sum: number = 0;
      for (const key in element) {
        if (key !== "timestamp" && isSelected(selectedValues, key)) {
            sum = sum + element[key];
        }
      }   
      return {timestamp: element["timestamp"], sum: sum};
    });
    return result;
}

const filterSelectedValues = (key: any, stateArray: graphLine[], setStateArray: (array: graphLine[]) => void) => {
  let result = stateArray.filter((value:any) => {
    return value.key !== key;
  });
  setStateArray(result);
};

const addSelectedValue = (
  key: any,
  initValues: graphLine[],
  stateArray: graphLine[],
  setStateArray: (array: graphLine[]) => void
) => {
  let currArrayCopy = [...stateArray];
  initValues.forEach((value, index) => {
    if (value.key === key) {
      currArrayCopy.splice(index, 0, value);
    }
  });
  setStateArray(currArrayCopy);
};

export  {sumValues, filterSelectedValues, addSelectedValue};