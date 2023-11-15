import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { useForm } from "../../hooks/use-from";
import { wait } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import styles from "./queue-page.module.css";
import { ElementStates } from "../../types/element-states";

type QueueElem = {
  str: string;
  state: ElementStates;
  head: string;
  tail: string;
}

type ResElem = {
  arr: QueueElem[];
  head: number;
  tail: number;
}

export const QueuePage: React.FC = () => {
  const queueLength = 7;
  const setInitialArray = () => {
    const array: QueueElem[] = [];
    for (let i = 0; i < queueLength; i++) {
      array.push({
        str: '',
        state: ElementStates.Default,
        head: '',
        tail: ''
      });
    };
    return array
  }
  const resInitialState = { arr: setInitialArray(), head: 0, tail: 0 };
  const { values, setValues, onChange } = useForm({
    input: '',
  });
  const [res, setRes] = useState<ResElem>(resInitialState);
  const [loader, setLoader] = useState(false);

  const handleAdd = async () => {
    console.log(res);
    const newRes = {...res};
    newRes.arr[res.tail] = {
      str: values.input,
      state: ElementStates.Changing,
      head: newRes.tail ? '' : 'head',
      tail: 'tail'
    }
    if (newRes.tail) newRes.arr[newRes.tail - 1].tail = '';
    newRes.tail++;
    setRes({...newRes});
  }

  const handleRemove = async () => {

  }

  const handleReset = () => {
    setRes(resInitialState);
    setValues({ input: '' })
  }


  return (
    <SolutionLayout title="Очередь">
      <form className={styles.input_container}>
        <div className={styles.input_modify}>
          <Input isLimitText={true} maxLength={4} name="input" value={values.input} onChange={onChange}>
          </Input>
          <Button onClick={handleAdd} text="Добавить" isLoader={loader} disabled={res.tail > queueLength - 1 || !values.input.length}></Button>
          <Button onClick={handleRemove} text="Удалить" isLoader={loader} disabled={!res.arr.length}></Button>
        </div>
        <Button onClick={handleReset} text="Очистить" isLoader={loader} disabled={!res.arr.length && !values.input.length}></Button>
      </form>
      <ul className={styles.res_container}>
        {res.arr.map((elem, index) => <li key={index}><Circle index={index} letter={String(elem.str)} head={elem.head} tail={elem.tail} state={elem.state} /></li>)}
      </ul>
    </SolutionLayout>
  );
};
