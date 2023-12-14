import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { useForm } from "../../hooks/use-from";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { swap, wait } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export type Char = {
  char: string;
  state: ElementStates
}

export const StringComponent: React.FC = () => {
  const { values, onChange } = useForm({
    input: '',
  });

  const [res, setRes] = useState<Char[]>([]);
  const [loader, setLoader] = useState(false);

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    setLoader(true);
    reverse();
  }

  const reverse = async () => {
    const convertedInput = values.input.split('').map(char => {
      return {
        char: char,
        state: ElementStates.Default
      }
    })

    setRes(convertedInput);

    let arrLength = convertedInput.length;
    let left = 0;
    let right = arrLength - 1;
    while (left < right) {
      convertedInput[left].state = ElementStates.Changing;
      convertedInput[right].state = ElementStates.Changing;
      setRes([...convertedInput]);
      await wait(SHORT_DELAY_IN_MS);
      swap(convertedInput, left, right);
      left++;
      right--;
      convertedInput[left - 1].state = ElementStates.Modified;
      convertedInput[right + 1].state = ElementStates.Modified;
      setRes([...convertedInput]);
      await wait(SHORT_DELAY_IN_MS);
    }
    if (arrLength % 2) {
      convertedInput[Math.floor(arrLength / 2)].state = ElementStates.Modified;
    }
    setLoader(false);
  }



  return (
    <SolutionLayout title="Строка">
      <form onSubmit={handleSubmit} className={styles.input_container}>
        <Input isLimitText={true} maxLength={11} name="input" onChange={onChange}>
        </Input>
        <Button type="submit" text="Развернуть" isLoader={loader} disabled={!values.input.length}></Button>
      </form>
      <ul className={styles.res_container}>
        {res.map((char, index) => <li key={index}><Circle letter={char.char} state={char.state} /></li>)}
      </ul>
    </SolutionLayout>
  );
};
