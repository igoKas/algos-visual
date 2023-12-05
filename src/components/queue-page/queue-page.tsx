import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { useForm } from "../../hooks/use-from";
import { wait } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import styles from "./queue-page.module.css";
import { ElementStates } from "../../types/element-states";
import { Queue } from "./Queue";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

type QueueElem = {
  str: string;
  state: ElementStates;
}

export const QueuePage: React.FC = () => {
  const { values, setValues, onChange } = useForm({
    input: '',
  });


  const [queue] = useState(new Queue<QueueElem>(7));
  const [loader, setLoader] = useState(false);
  

  const handleAdd = async () => {
    setLoader(true);
    queue.enqueue({
      str: values.input,
      state: ElementStates.Changing,
    });
    setValues({input: ''});
    await wait(SHORT_DELAY_IN_MS);
    queue.elements[queue.getTail() - 1].state = ElementStates.Default;
    setLoader(false);
  }

  const handleRemove = async () => {
    setLoader(true);
    queue.elements[queue.getHead()].state = ElementStates.Changing;
    await wait(SHORT_DELAY_IN_MS);
    queue.dequeue();
    setLoader(false);
  }

  const handleReset = () => {
    queue.clear();
    setValues({input: ''});
  }

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.input_container}>
        <div className={styles.input_modify}>
          <Input isLimitText={true} maxLength={4} name="input" value={values.input} onChange={onChange}>
          </Input>
          <Button onClick={handleAdd} text="Добавить" isLoader={loader} disabled={!values.input.length || queue.getTail() > 6}></Button>
          <Button onClick={handleRemove} text="Удалить" isLoader={loader} disabled={!queue.getLength()}></Button>
        </div>
        <Button onClick={handleReset} text="Очистить" isLoader={loader} disabled={!values.input.length && !queue.getHead() && !queue.getLength()}></Button>
      </form>
      <ul className={styles.res_container}>
        {queue.elements.map((elem, index) => 
          <li key={index}>
            <Circle
            index={index}
            letter={elem.str}
            head={index === queue.getHead() && queue.getLength() ? 'head' : ''}
            tail={index === queue.getTail() - 1 ? 'tail' : ''}
            state={elem.state} />
          </li>)}
      </ul>
    </SolutionLayout>
  );
};
