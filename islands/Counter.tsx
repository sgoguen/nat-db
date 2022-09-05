/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";
import { tw } from "@twind";

import { Button } from "../components/Button.tsx";
import { bigSqrt, cantorUnpair, getNthPermutation, rosenbergStrongUnpair, szudzikUnpair } from "../utils/math.ts";

interface CounterProps {
  start: number | string;
}

export default function Counter(props: CounterProps) {
  const start = BigInt(props.start.toString());
  const [num, setNum] = useState(start);
  return (
    <div>
      <div class={tw`flex gap-2 w-full p-8 bg-slate rounded-xl`}>
        <Button onClick={() => setNum(num - 1n)}>-1</Button>
        <p class={tw`flex-grow-1 font-bold text-xl text-center`}>{num}</p>
        <Button onClick={() => setNum(num + 1n)}>+1</Button>
      </div>

      <table class={tw`table-auto border border-spacing-4`}>
        <body>
          <tr>
            <th class={tw`font-bold border border-spacing-2 p-1`}>Number</th>
            <td class={tw`border border-spacing-2 p-1`}>{num}</td>
          </tr>
          {/* Square Root */}
          <tr>
            <th class={tw`font-bold border border-spacing-2 p-1`}>Square Root</th>
            <td class={tw`border border-spacing-2 p-1`}>{bigSqrt(num)}</td>
          </tr>
          {/* Cantor Unpair */}
          <tr>
            <th class={tw`font-bold border border-spacing-2 p-1`}>Cantor Unpair</th>
            <td class={tw`border border-spacing-2 p-1`}>{joinHtml(cantorUnpair(num).map(x => <span>{x}</span>), ", ")}</td>
          </tr>
          {/* szudzikUnpair */}
          <tr>
            <th class={tw`font-bold border border-spacing-2 p-1`}>Szudzik Unpair</th>
            <td class={tw`border border-spacing-2 p-1`}>{joinHtml(szudzikUnpair(num).map(x => <span>{x}</span>), ", ")}</td>
          </tr>
          {/* rosenbergStrongUnpair */}
          <tr>
            <th class={tw`font-bold border border-spacing-2 p-1`}>Rosenberg Strong Unpair</th>
            <td class={tw`border border-spacing-2 p-1`}>{joinHtml(rosenbergStrongUnpair(num).map(x => <span>{x}</span>), ", ")}</td>
          </tr>

          {/* getNthPermutation */}
          <tr>
            <th class={tw`font-bold border border-spacing-2 p-1`}>getNthPermutation</th>
            <td class={tw`border border-spacing-2 p-1`}>{joinHtml(getNthPermutation(parseInt(num.toString())).map(x => <span>{x}</span>), ", ")}</td>
          </tr>
          

        </body>
      </table>

    </div>


  );
}

function isPrime(n: bigint): boolean {
  if (n < 2) return false;
  if (n === 2n) return true;
  if (n % 2n === 0n) return false;
  for (let i = 3n; i * i <= n; i += 2n) {
    if (n % i === 0n) return false;
  }
  return true;
}

function primeFactors(n: bigint): bigint[] {
  const factors: bigint[] = [];
  for (let i = 2n; i * i <= n; i++) {
    while (n % i === 0n) {
      factors.push(i);
      n /= i;
    }
  }
  if (n > 1n) {
    factors.push(n);
  }
  // Exclude 1 and the number itself
  return factors.filter(f => f !== 1n && f !== n);
}

function joinHtml<T>(input: h.JSX.Element[], sep: string | h.JSX.Element): h.JSX.Element {
  return <span>{input.map((x, i) => {
    if (i === 0) return x;
    return <span>{sep}{x}</span>
  })}</span>;
}

