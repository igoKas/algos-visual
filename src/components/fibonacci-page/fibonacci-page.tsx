import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./fibonacci-page.module.css";
import { Circle } from "../ui/circle/circle";
import { useForm } from "../../hooks/use-from";
import { wait } from "../../utils/utils";
import { fib } from "./fib";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const { values, onChange } = useForm({
    input: '',
  });


  const [res, setRes] = useState<number[]>([]);
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    setRes([]);
    setLoader(true);
    const arr = fib(Number(values.input));
    for(const element of arr) {
      setRes(prevRes => [...prevRes, element]);
      await wait(SHORT_DELAY_IN_MS);
    };
    setLoader(false);
  }

  
  
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form onSubmit={handleSubmit} className={styles.input_container}>
        <Input isLimitText={true} max={19} name="input" type="number" onChange={onChange}>
        </Input>
        <Button type="submit" text="Рассчитать" isLoader={loader} disabled={(Number(values.input)) < 1 || (Number(values.input) > 19)}></Button>
      </form>
      <ul className={styles.res_container}>
        {res.map((char, index) => <li key={index}><Circle index={index} letter={String(char)} /></li>)}
      </ul>
    </SolutionLayout>
  );
};
