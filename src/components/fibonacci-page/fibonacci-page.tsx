import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./fibonacci-page.module.css";
import { Circle } from "../ui/circle/circle";
import { useForm } from "../../hooks/use-from";
import { wait } from "../../utils/utils";

export const FibonacciPage: React.FC = () => {
  const { values, onChange } = useForm({
    input: '',
  });


  const [res, setRes] = useState<number[]>([]);
  const [loader, setLoader] = useState(false);

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    setLoader(true);
    fib(Number(values.input));
  }

  const fib = async (n: number) => {
    if (n < 1 || n > 19) {
      setLoader(false);
    }
    const arr = [];
    if (n > 0) {
      arr.push(1);
      setRes([...arr]);
      await wait(500);
    }
    if (n > 1) {
      arr.push(1);
      setRes([...arr]);
      await wait(500);
    }
    if (n > 2) {
      for (let i = 2; i <= n; i++) {
        arr.push(arr[i - 2] + arr[i - 1]);
        setRes([...arr]);
        await wait(500);
      }
    }
    setLoader(false);
  }
  
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form onSubmit={handleSubmit} className={styles.input_container}>
        <Input isLimitText={true} max={19} name="input" type="number" onChange={onChange}>
        </Input>
        <Button type="submit" text="Рассчитать" isLoader={loader}></Button>
      </form>
      <ul className={styles.res_container}>
        {res.map((char, index) => <li key={index}><Circle index={index} letter={String(char)} /></li>)}
      </ul>
    </SolutionLayout>
  );
};
