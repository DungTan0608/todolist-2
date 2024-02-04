import { createContext } from "react";
import { CaulatorContextObject } from "./type";
export const TodoContext = createContext<CaulatorContextObject>(
    {} as CaulatorContextObject
);
const CaculatorProvider = ({children}: PropsWithChildren) => 