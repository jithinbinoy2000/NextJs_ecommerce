"use client"
import { useRef } from "react";
const { Provider } = require("react-redux");
const { makeStore } = require("./lib/store");
export default function StoreProvider({children}){
    const storeRef = useRef();
    if(!storeRef.current){
        storeRef.current = makeStore();

    }
    return <Provider store={storeRef.current}>{children}</Provider>
}