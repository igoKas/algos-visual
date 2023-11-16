import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { useForm } from "../../hooks/use-from";
import { wait } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import styles from "./stack-page.module.css";
import { ElementStates } from "../../types/element-states";
import { Stack } from "./Stack";

type StackElem = {
  str: string;
  state: ElementStates;
}

export const StackPage: React.FC = () => {
  const { values, setValues, onChange } = useForm({
    input: '',
  });


  const [stack] = useState(new Stack<StackElem>());
  const [loader, setLoader] = useState(false);
  

  const handleAdd = async () => {
    setLoader(true);
    stack.push({
      str: values.input,
      state: ElementStates.Changing,
    });
    setValues({input: ''});
    await wait(500);
    stack.elements[stack.size - 1].state = ElementStates.Default;
    setLoader(false);
  }

  const handleRemove = async () => {
    setLoader(true);
    stack.elements[stack.size - 1].state = ElementStates.Changing;
    await wait(500);
    stack.pop();
    setLoader(false);
  }

  const handleReset = () => {
    stack.clear();
    setValues({input: ''});
  }


  return (
    <SolutionLayout title="Стек">
      <form className={styles.input_container}>
        <div className={styles.input_modify}>
          <Input isLimitText={true} maxLength={4} name="input" value={values.input} onChange={onChange}>
          </Input>
          <Button onClick={handleAdd} text="Добавить" isLoader={loader} disabled={!values.input.length}></Button>
          <Button onClick={handleRemove} text="Удалить" isLoader={loader} disabled={!stack.size}></Button>
        </div>
        <Button onClick={handleReset} text="Очистить" isLoader={loader} disabled={!stack.size && !values.input.length}></Button>
      </form>
      <ul className={styles.res_container}>
        {stack.elements.map((elem, index) =>
        <li key={index}>
          <Circle
          index={index}
          letter={String(elem.str)}
          head={index === stack.size - 1 ? 'top' : ''}
          state={elem.state}
          />
        </li>)}
      </ul>
    </SolutionLayout>
  );
};
