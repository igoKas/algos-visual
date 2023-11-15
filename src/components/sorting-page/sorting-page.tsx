import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import styles from "./sorting-page.module.css";
import { Button } from "../ui/button/button";
import { useForm } from "../../hooks/use-from";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { swap, wait } from "../../utils/utils";

export enum SortWays {
  Selection = "selection",
  Bubble = "bubble",
}

export type Num = {
  num: number;
  state: ElementStates
}

export const SortingPage: React.FC = () => {
  const { values, onChange } = useForm({
    way: SortWays.Selection,
  });


  const [res, setRes] = useState<Num[]>([]);
  const [loader, setLoader] = useState(false);

  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  const generateArr = () => {
    const arr: Num[] = [];
    for (let i = 0; i < getRandomInt(3, 18); i++) {
      arr.push({
        num: getRandomInt(0, 101),
        state: ElementStates.Default
      });
    };
    setRes([...arr]);
  }

  const sort = async (direction: string) => {
    setLoader(true);
    if (values.way === SortWays.Selection) {
      const arr = [...res];
      for (let i = 0; i < arr.length; i++) {
        let min = i;
        arr[min].state = ElementStates.Changing;
        setRes([...arr]);
        for (let j = i + 1; j < arr.length; j++) {
          arr[j].state = ElementStates.Changing;
          setRes([...arr]);
          await wait(500);
          if (direction === Direction.Ascending ? arr[min].num > arr[j].num : arr[min].num < arr[j].num) {
            min = j;
          }
          arr[j].state = ElementStates.Default;
          setRes([...arr]);
        }
        swap(arr, i, min);
        arr[min].state = ElementStates.Default;
        arr[i].state = ElementStates.Modified;
        setRes([...arr]);
        await wait(500);
      }
    }

    if (values.way === SortWays.Bubble) {
      const arr = [...res];
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
          arr[j].state = ElementStates.Changing;
          arr[j + 1].state = ElementStates.Changing;
          if (direction === Direction.Ascending ? arr[j].num > arr[j + 1].num : arr[j].num < arr[j + 1].num) {
            swap(arr, j, j + 1);
            setRes([...arr]);
            await wait(500);
          }
          arr[j].state = ElementStates.Default;
          arr[j + 1].state = ElementStates.Default;
        }
        arr[arr.length - i - 1].state = ElementStates.Modified;
      }
    }

    setLoader(false);
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.input_container}>
        <RadioInput label="Выбор" name="way" value={SortWays.Selection} onInput={onChange} defaultChecked />
        <RadioInput label="Пузырек" name="way" value={SortWays.Bubble} onInput={onChange} />
        <Button onClick={() => sort(Direction.Ascending)} text="По возрастанию" sorting={Direction.Ascending} disabled={!res.length} isLoader={loader}></Button>
        <Button onClick={() => sort(Direction.Descending)} text="По убыванию" sorting={Direction.Descending} disabled={!res.length} isLoader={loader}></Button>
        <Button onClick={generateArr} text="Новый массив" isLoader={loader}></Button>
      </form>
      <ul className={styles.res_container}>
        {res.map((num, index) => <li key={index}><Column index={num.num} state={num.state} /></li>)}
      </ul>
    </SolutionLayout>
  );
};
