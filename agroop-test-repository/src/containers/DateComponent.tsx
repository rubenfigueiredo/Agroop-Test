import * as React from "react";
import {
  format,
  addDays,
  addMonths,
  addYears,
  setDate,
  setMonth,
  setYear,
  getDate,
  getMonth,
  getYear
} from "date-fns";
//import { Omit } from "./utils";
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

type TPosByName = { [name: string]: [number, number] };

interface DateInputProps
  extends Omit<React.HTMLProps<HTMLInputElement>, "onChange" | "value"> {
  pattern: string;
  onChange(date: Date): void;
  value: Date;
}

interface DateInputState {
  pattern: string;
  posByName: TPosByName;
  nameByPos: string[];
  currentSection: string;
}

const re = /(y+|M+|d+)/g;

const upFn: { [k: string]: (date: Date | number, amount: number) => Date } = {
  yyyy: addYears,
  MM: addMonths,
  dd: addDays
};

const setFn: { [k: string]: (date: Date | number, amount: number) => Date } = {
  yyyy: setYear,
  MM: setMonth,
  dd: setDate
};

const getFn: { [k: string]: (date: number | Date) => number } = {
  yyyy: getYear,
  MM: getMonth,
  dd: getDate
};

const getNumberLength = (number: number) => number.toString().length;

class DateInput extends React.Component<DateInputProps, DateInputState> {
  static defaultProps = {
    pattern: "MM/dd/yyyy"
  };

  static getDerivedStateFromProps(
    { pattern }: Readonly<DateInputProps>,
    prevState: DateInputState
  ): Partial<DateInputState> | null {
    let state = null;
    if (pattern !== prevState.pattern) {
      let currentSection = "";
      let match;
      const nameByPos = new Array(pattern.length + 1);
      let posByName: { [name: string]: [number, number] } = {};
      while ((match = re.exec(pattern))) {
        const start = match.index;
        const end = re.lastIndex + 1;
        const name = match[0];
        nameByPos.fill(name, start, end);
        posByName[name] = [start, end];
      }

      console.log("posByName, nameByPos", posByName, nameByPos);

      state = { pattern, posByName, nameByPos, currentSection };
    }

    return state;
  }

  state = {} as DateInputState;

  handleSelect: React.ReactEventHandler<HTMLInputElement> = e => {
    const {
      selectionStart,
      selectionEnd,
      selectionDirection
    } = e.currentTarget;
    if (selectionStart != null && selectionStart === selectionEnd) {
      // Select section on click
      const pos = this.state.posByName[this.state.nameByPos[selectionStart]];
      this.setState({ currentSection: this.state.nameByPos[selectionStart] });
      e.currentTarget.setSelectionRange(pos[0], pos[1] - 1);
    }
  };

  //unfinished
  setNextSection = (
    { currentSection, nameByPos, posByName }: any,
    currentTarget: any
  ) => {
    const {
      selectionStart,
      selectionEnd,
      selectionDirection,
      value
    } = currentTarget;

    // move selection to next section
    const last = nameByPos.lastIndexOf(currentSection);
    if (last < value.length) {
      const nextSection = nameByPos[last + 1];
      //console.log("nameByPos", nextSection);
      this.setState({ currentSection: nextSection }, () => {
        console.log("this.state.currentSection", this.state.currentSection);
        const pos = posByName[this.state.currentSection];
        console.log("pos", pos);
        currentTarget.setSelectionRange(pos[0], pos[1] - 1);
      });
    }
  };

  handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = e => {
    const target = e.currentTarget;
    const { selectionStart, selectionEnd, selectionDirection, value } = target;
    if (selectionStart === null || selectionEnd === null) return;
    const { nameByPos, posByName, currentSection } = this.state;
    let moveToNextSection: boolean = false;
    e.preventDefault();

    const section = nameByPos[selectionStart];
    if (e.keyCode === 38 || e.keyCode === 40) {
      if (this.state.currentSection !== section) {
        this.setState({ currentSection: section });
      }
      //increase or decrease section with up and down arrow
      if (section && upFn[section]) {
        this.props.onChange(
          upFn[section](this.props.value, e.keyCode === 38 ? 1 : -1)
        );
        requestAnimationFrame(() =>
          target.setSelectionRange(selectionStart, selectionEnd)
        );
      }
    } else if (e.keyCode === 39) {
      // move selection to next section
      const last = nameByPos.lastIndexOf(section);
      if (last < value.length) {
        const pos = posByName[nameByPos[last + 1]];
        this.setState({ currentSection: this.state.nameByPos[last + 1] });
        target.setSelectionRange(pos[0], pos[1] - 1);
      }
    } else if (e.keyCode === 37) {
      // move selection to prev section
      const first = nameByPos.indexOf(section);
      if (first > 0) {
        const pos = posByName[nameByPos[first - 1]];
        this.setState({ currentSection: this.state.nameByPos[first - 1] });
        target.setSelectionRange(pos[0], pos[1] - 1);
      }
    } else if (!isNaN(+e.key)) {
      if (this.state.currentSection !== section) {
        this.setState({ currentSection: section });
      }
      if (section && upFn[section]) {
        // parse the value to the keyboard
        let newSubValue: number = parseInt(e.key);
        //get the current sub date
        let dateSubValue: number = getFn[section](this.props.value);
        let newStringSubValue: string;
        const toUpperCaseSection = section.toUpperCase();
        let tempNewSubValue: number;
        //if the current sub date value did not meet the maximum permitted and its not editing the month area
        if (
          getNumberLength(dateSubValue) < section.length &&
          toUpperCaseSection !== "MM"
        ) {
          newStringSubValue = dateSubValue.toString() + e.key;
          tempNewSubValue = parseInt(newStringSubValue);
          //value has 2 digits and is less than 31
          if (toUpperCaseSection === "DD" && tempNewSubValue <= 31) {
            newSubValue = tempNewSubValue;
            // move selection to next section
            //this.setNextSection(nameByPos, this.state.currentSection, value);
            moveToNextSection = true;
            this.setNextSection(this.state, target);
          } else if (toUpperCaseSection === "YYYY") {
            newSubValue = tempNewSubValue;
          }
        } else if (toUpperCaseSection === "MM") {
          //because the js value from month starts with 0
          dateSubValue++;
          console.log(" month value", dateSubValue);
          //if the current sub date value meet the maximum digits permitted
          if (getNumberLength(dateSubValue) < section.length) {
            console.log("current sub date value meet the maximum digits");

            newStringSubValue = dateSubValue.toString() + e.key;
            tempNewSubValue = parseInt(newStringSubValue);
            console.log("tempNewSubValue", tempNewSubValue);

            if (tempNewSubValue <= 12) {
              console.log("tempNewSubValue", tempNewSubValue);
              newSubValue = tempNewSubValue;
              // move selection to next section
              moveToNextSection = true;
              this.setNextSection(this.state, target);
              //this.setNextSection(nameByPos, this.state.currentSection, value);
            }
            // move selection to next section
            moveToNextSection = true;
            this.setNextSection(this.state, target);
            //this.setNextSection(nameByPos, this.state.currentSection, value);
          }

          newSubValue--;
          //no zeros or minor values
          if (newSubValue < 0) {
            return;
          }
        }
        //console.log("newSubValue", newSubValue);
        this.props.onChange(setFn[section](this.props.value, newSubValue));
        !moveToNextSection &&
          requestAnimationFrame(() =>
            target.setSelectionRange(selectionStart, selectionEnd)
          );
      }
    }
  };
  handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    console.log(e.currentTarget.value);
  };

  render() {
    const { pattern, value } = this.props;
    console.log("this.state", this.state);

    return (
      <input
        onSelect={this.handleSelect}
        onKeyDown={this.handleKeyDown}
        onChange={this.handleChange}
        value={format(value, pattern)}
      />
    );
  }
}

export default function App() {
  const [date, setDate] = React.useState(new Date());

  return (
    <div className="App">
      <DateInput value={date} onChange={setDate} />
    </div>
  );
}
