/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { PageProps } from "$fresh/server.ts";
import Counter from "../../islands/Counter.tsx";

export default function Greet(props: PageProps) {
  return <div class={tw`p-4 mx-auto max-w-screen-md`}>
    <Counter start={props.params.num} />
  </div>;
}
