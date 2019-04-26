function sumValues(array: any, selectedValues? : any){
    if(!array){
        return null;
    }
    function isSelected(values: any, key: any){
      let isSelected: boolean = false;
      values.forEach((value: any) => {
        if(value.key === key){
          isSelected = true;
        }
      });
      
      return isSelected;
    }
    const result = array.map((element:any) => {
      let sum = 0;
      for (const key in element) {
        if (key !== "timestamp" && isSelected(selectedValues, key)) {
            sum = sum + element[key];
        }
      }   
      return {timestamp: element["timestamp"], sum: sum};
    });
    return result;
}

export  {sumValues};