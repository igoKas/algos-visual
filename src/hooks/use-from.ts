import { useCallback, useState } from "react";

type FormFields = {
    [key: string]: string
}

export const useForm = (initailState: FormFields) => {
    const [values, setValues] = useState(initailState);
    const onChange = useCallback((event) => {
      const {value, name} = event.target;
      setValues({...values, [name]: value});
    }, [values]);
    return {values, setValues, onChange};
}