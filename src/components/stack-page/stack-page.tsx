import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { useForm } from "../../hooks/use-from";
import { wait } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import styles from "./stack-page.module.css";
import { ElementStates } from "../../types/element-states";

type StackElem = {
  str: string;
  state: ElementStates
  head: string
}

export const StackPage: React.FC = () => {
  const { values, setValues, onChange } = useForm({
    input: '',
  });


  const [res, setRes] = useState<StackElem[]>([]);
  const [loader, setLoader] = useState(false);

  const handleAdd = async () => {
    if (res.length > 9) return alert('Максимум 10 элементов в стеке')
    setLoader(true);
    const arr = [...res];
    arr.push({
      str: values.input,
      state: ElementStates.Changing,
      head: 'top',
    });
    setValues({input: ''})
    const { length } = arr;
    if (length > 1) arr[length - 2].head = ''
    setRes([...arr]);
    await wait(500);
    arr[length - 1].state = ElementStates.Default;
    setRes([...arr]);
    setLoader(false);
  }

  const handleRemove = async () => {
    setLoader(true);
    const arr = [...res];
    const { length } = arr;
    arr[length - 1].state = ElementStates.Changing;
    arr.pop();
    await wait(500);
    if (length > 1) arr[length - 2].head = 'top';
    setRes([...arr]);
    setLoader(false);
  }

  const handleReset = () => {
    setRes([]);
    setValues({input: ''})
  }


  return (
    <SolutionLayout title="Стек">
      <form className={styles.input_container}>
        <div className={styles.input_modify}>
          <Input isLimitText={true} maxLength={4} name="input" value={values.input} onChange={onChange}>
          </Input>
          <Button onClick={handleAdd} text="Добавить" isLoader={loader} disabled={!values.input.length}></Button>
          <Button onClick={handleRemove} text="Удалить" isLoader={loader} disabled={!res.length}></Button>
        </div>
        <Button onClick={handleReset} text="Очистить" isLoader={loader} disabled={!res.length && !values.input.length}></Button>
      </form>
      <ul className={styles.res_container}>
        {res.map((elem, index) => <li key={index}><Circle index={index} letter={String(elem.str)} head={elem.head} state={elem.state} /></li>)}
      </ul>
    </SolutionLayout>
  );
};
