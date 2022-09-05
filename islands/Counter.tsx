/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";
import { tw } from "@twind";

import { Button } from "../components/Button.tsx";

interface CounterProps {
  start: number;
}

export default function Counter(props: CounterProps) {
  const [count, setCount] = useState(props.start);
  return (
    <div class={tw`flex gap-2 w-full p-8 bg-slate rounded-xl`}>
      <Button onClick={() => setCount(count - 1)}>-1</Button>
      <p class={tw`flex-grow-1 font-bold text-xl text-center`}>{count}</p>
      <Button onClick={() => setCount(count + 1)}>+1</Button>
    </div>
  );
}
