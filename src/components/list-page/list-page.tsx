import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { useForm } from "../../hooks/use-from";
import { ElementStates } from "../../types/element-states";
import { getRandomInt, wait } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { LinkedList } from "./List";
import { ArrowIcon } from "../ui/icons/arrow-icon";

type ListElem = {
  str: string;
  state: ElementStates;
}

type ChangingCircle = {
  elem: ListElem;
  index: number;
  topBottom: 'top' | 'bottom' | '';
}

export const ListPage: React.FC = () => {
  const generateArr = () => {
    const arr = [];
    for (let i = 0; i < 4; i++) {
      arr.push({
        str: String(getRandomInt(0, 10000)),
        state: ElementStates.Default
      });
    };
    return arr
  }
  const initInputs = {
    str: '',
    index: '',
  }
  const { values, setValues, onChange } = useForm(initInputs);
  const [list] = useState(new LinkedList<ListElem>(generateArr()));
  const [res, setRes] = useState<ListElem []>([]);
  const [loader, setLoader] = useState(false);
  const initialChangingCircle: ChangingCircle = {
    elem: {} as ListElem,
    index: -1,
    topBottom: ''
  }
  const [changingCircle, setChangingCircle] = useState<ChangingCircle>(initialChangingCircle);
  useEffect(() => setRes(list.toArray()), [])

  const switchHead = (index: number) => {
    if (changingCircle?.index === index && changingCircle.topBottom === 'top' && changingCircle) {
      return <Circle letter={changingCircle.elem.str} state={changingCircle.elem.state} isSmall />
    }
    if (index === 0) return 'head'
  }

  const switchTail = (index: number) => {
    if (changingCircle?.index === index && changingCircle.topBottom === 'bottom' && changingCircle) {
      return <Circle letter={changingCircle.elem.str} state={changingCircle.elem.state} isSmall />
    }
    if (index === list.getSize() - 1) return 'tail';
  }


  const prepend = async () => {
    setLoader(true);
    setChangingCircle({
      elem: { str: values.str, state: ElementStates.Changing },
      index: 0,
      topBottom: 'top'
    });
    await wait(SHORT_DELAY_IN_MS);
    setChangingCircle(initialChangingCircle);
    const node = list.prepend({ str: values.str, state: ElementStates.Modified });
    setRes(list.toArray());
    await wait(SHORT_DELAY_IN_MS);
    node.value.state = ElementStates.Default;
    setRes(list.toArray());
    setLoader(false);
  };

  const append = async () => {
    setLoader(true);
    setChangingCircle({
      elem: { str: values.str, state: ElementStates.Changing },
      index: list.getSize() - 1,
      topBottom: 'bottom'
    });
    await wait(SHORT_DELAY_IN_MS);
    setChangingCircle(initialChangingCircle);
    const node = list.append({ str: values.str, state: ElementStates.Modified });
    setRes(list.toArray());
    await wait(SHORT_DELAY_IN_MS);
    node.value.state = ElementStates.Default;
    setRes(list.toArray());
    setLoader(false);
  };

  const deleteHead = async () => {
    setLoader(true);
    let head = list.getHead();
    setChangingCircle({
      elem: { str: head ? head.value.str : '', state: ElementStates.Changing },
      index: 0,
      topBottom: 'bottom'
    });
    if (head) head.value.str = '';
    await wait(SHORT_DELAY_IN_MS);
    setChangingCircle(initialChangingCircle);
    list.deleteHead();
    setRes(list.toArray());
    setLoader(false);
  };

  const deleteTail = async () => {
    setLoader(true);
    let tail = list.getTail();
    setChangingCircle({
      elem: { str: tail ? tail.value.str : '', state: ElementStates.Changing },
      index: list.getSize() - 1,
      topBottom: 'bottom'
    });
    if (tail) tail.value.str = '';
    await wait(SHORT_DELAY_IN_MS);
    setChangingCircle(initialChangingCircle);
    list.deleteTail();
    setRes(list.toArray());
    setLoader(false);
  };

  const addByIndex = async () => {
    setLoader(true);
    for (let i = 0; i <= Number(values.index); i++) {
      if (res[i - 1]) res[i - 1].state = ElementStates.Changing;
      setChangingCircle({
        elem: { str: values.str, state: ElementStates.Changing },
        index: i,
        topBottom: 'top'
      });
      await wait(SHORT_DELAY_IN_MS);
    }
    for (let elem of res) elem.state = ElementStates.Default;
    setChangingCircle(initialChangingCircle);
    const node = list.addByIndex({ str: values.str, state: ElementStates.Modified }, Number(values.index));
    setRes(list.toArray());
    await wait(SHORT_DELAY_IN_MS);
    if (node) node.value.state = ElementStates.Default;
    setLoader(false);
  };

  const deleteByIndex = async () => {
    setLoader(true);
    const index = Number(values.index)
    for (let i = 0; i <= index; i++) {
      res[i].state = ElementStates.Changing;
      setRes([...res]);
      await wait(SHORT_DELAY_IN_MS);
    }
    setChangingCircle({
      elem: { str: res[index].str, state: ElementStates.Changing },
      index: index,
      topBottom: 'bottom'
    });
    res[index]= {str: '', state: ElementStates.Default};
    setRes([...res]);
    await wait(SHORT_DELAY_IN_MS);
    for (let elem of res) elem.state = ElementStates.Default;
    setChangingCircle(initialChangingCircle);
    list.deleteByIndex(Number(values.index));
    setRes(list.toArray());
    setLoader(false);
  };


  return (
    <SolutionLayout title="Связный список">
      <form className={styles.input_container}>
        <div className={styles.input_modify}>
          <Input isLimitText={true} extraClass={styles.input} maxLength={4} name="str" value={values.str} onChange={onChange}>
          </Input>
          <Button onClick={prepend} text="Добавить в head" linkedList={"small"} isLoader={loader} disabled={list.getSize() > 5 || !values.str}></Button>
          <Button onClick={append} text="Добавить в tail" linkedList={"small"} isLoader={loader} disabled={list.getSize() > 5 || !values.str}></Button>
          <Button onClick={deleteHead} text="Удалить из head" linkedList={"small"} isLoader={loader} disabled={!list.getSize()}></Button>
          <Button onClick={deleteTail} text="Удалить из tail" linkedList={"small"} isLoader={loader} disabled={!list.getSize()}></Button>
        </div>
        <div className={styles.input_modify}>
          <Input type="number" max={list.getSize() - 1} placeholder="Введите индекс" extraClass={styles.input} name="index" value={values.index} onChange={onChange}>
          </Input>
          <Button
          onClick={addByIndex}
          text="Добавить по индексу"
          linkedList={"big"}
          isLoader={loader}
          disabled={list.getSize() > 5 || !values.str || !values.index || Number(values.index) < 0 || Number(values.index) > list.getSize() - 1}>
          </Button>
          <Button
          onClick={deleteByIndex}
          text="Удалить по индексу"
          linkedList={"big"}
          isLoader={loader}
          disabled={!list.getSize() || !values.index || Number(values.index) < 0 || Number(values.index) > list.getSize() - 1}></Button>
        </div>
      </form>
      <ul className={styles.res_container}>
        {res?.map((elem, index) =>
          <li className={styles.res_elem} key={index}>
            <Circle
              index={index}
              letter={elem.str}
              head={switchHead(index)}
              tail={switchTail(index)}
              state={elem.state}
            />
            {list.getSize() > index + 1 && <ArrowIcon />}
          </li>
        )}
      </ul>
    </SolutionLayout>
  );
};
