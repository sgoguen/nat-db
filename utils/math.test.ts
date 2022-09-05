import { assertEquals } from "https://deno.land/std@0.154.0/testing/asserts.ts";
import {
  bigSqrt,
  bigNRoot,
  cantorUnpair,
  cantorPair,
  szudzikPair,
  szudzikUnpair,
  rosenbergStringPair,
  rosenbergStrongUnpair,
  isPermutation,
  getPermutationMapFn,
  getNthOfMthPermutation,
  factorial,
  nextPermutation,
  permutationFromBeforeAfter,
  getPermutationFn,
getNthPermutation,
} from "./math.ts";

Deno.test("bigSqrt", () => {
  assertEquals(bigSqrt(0n), 0n);
});

Deno.test("bigNRoot", () => {
  assertEquals(bigNRoot(0n, 0n), 1n);
  assertEquals(bigNRoot(5n, 0n), 1n);
  assertEquals(bigNRoot(5n, 2n), 2n);
  assertEquals(bigNRoot(1000n, 3n), 10n);
  assertEquals(bigNRoot(37n * 37n * 37n, 3n), 37n);
  assertEquals(bigNRoot(37n * 37n * 37n * 37n, 4n), 37n);
});

Deno.test("cantor pair and unpair are inverses", () => {
  for (let z = 0n; z < 100n; z++) {
    const [x, y] = cantorUnpair(z);
    const z2 = cantorPair(x, y);
    assertEquals(z, z2);
  }
});

Deno.test("szudzik pair and unpair are inverses", () => {
  for (let z = 0n; z < 100n; z++) {
    const [x, y] = szudzikUnpair(z);
    const z2 = szudzikPair(x, y);
    assertEquals(z, z2);
  }
});

Deno.test("rosenberg-strong pair and unpair are inverses", () => {
  for (let z = 0n; z < 100n; z++) {
    const [x, y] = rosenbergStrongUnpair(z);
    const z2 = rosenbergStringPair(x, y);
    assertEquals(z, z2);
  }
});

Deno.test("isPermutation", () => {
  assertEquals(isPermutation([0, 1, 2, 3, 4]), true);
  assertEquals(isPermutation([0, 1, 2, 3, 4, 5]), true);
  assertEquals(isPermutation([0, 1, 3]), false);
  assertEquals(isPermutation([0, 1, 1]), false);
});

Deno.test("getPermutationMapFn", () => {
  const f = getPermutationMapFn([2, 0, 1]);
  assertEquals(f([0, 1, 2]), [2, 0, 1]);
  assertEquals(f([1, 0, 2]), [2, 1, 0]);
});

Deno.test("getPermutationFn", () => {
  const f = getPermutationFn([2, 0, 1]);
  assertEquals([0, 1, 2, 3, 4, 5].map(f), [2, 0, 1, 5, 3, 4]);
});

Deno.test("nextPermutation", () => {
  assertEquals(nextPermutation([0, 1, 2]), [0, 2, 1]);
  assertEquals(nextPermutation([0, 2, 1]), [1, 0, 2]);
  assertEquals(nextPermutation([1, 0, 2]), [1, 2, 0]);
  assertEquals(nextPermutation([1, 2, 0]), [2, 0, 1]);
  assertEquals(nextPermutation([2, 0, 1]), [2, 1, 0]);
  assertEquals(nextPermutation([2, 1, 0]), [0, 1, 2]);
});

Deno.test("permutationFromBeforeAfter", () => {
  assertEquals(permutationFromBeforeAfter([0, 1, 2], [0, 2, 1]), [0, 2, 1]);
  assertEquals(permutationFromBeforeAfter([0, 2, 1], [1, 0, 2]), [2, 0, 1]);
  assertEquals(permutationFromBeforeAfter([1, 0, 2], [1, 2, 0]), [0, 2, 1]);
  assertEquals(permutationFromBeforeAfter([1, 2, 0], [2, 0, 1]), [1, 2, 0]);
  assertEquals(permutationFromBeforeAfter([2, 0, 1], [2, 1, 0]), [0, 2, 1]);
  assertEquals(permutationFromBeforeAfter([2, 1, 0], [0, 1, 2]), [2, 1, 0]);
});

Deno.test("getNthOfMthPermutation", () => {
  assertEquals(getNthOfMthPermutation(0, 1), [0]);

  assertEquals(getNthOfMthPermutation(0, 2), [0, 1]);
  assertEquals(getNthOfMthPermutation(1, 2), [1, 0]);

  assertEquals(getNthOfMthPermutation(0, 3), [0, 1, 2]);
  assertEquals(getNthOfMthPermutation(1, 3), [0, 2, 1]);
  assertEquals(getNthOfMthPermutation(2, 3), [1, 0, 2]);
  assertEquals(getNthOfMthPermutation(3, 3), [1, 2, 0]);
  assertEquals(getNthOfMthPermutation(4, 3), [2, 0, 1]);
  assertEquals(getNthOfMthPermutation(5, 3), [2, 1, 0]);
});

Deno.test("getNthPermutation", () => {
    assertEquals(getNthPermutation(0), [0]);
    assertEquals(getNthPermutation(1), [0, 1]);
    assertEquals(getNthPermutation(2), [1, 0]);
    assertEquals(getNthPermutation(3), [0, 1, 2]);
    assertEquals(getNthPermutation(4), [0, 2, 1]);
    assertEquals(getNthPermutation(5), [1, 0, 2]);
    assertEquals(getNthPermutation(6), [1, 2, 0]);
    assertEquals(getNthPermutation(7), [2, 0, 1]);
    assertEquals(getNthPermutation(8), [2, 1, 0]);
    assertEquals(getNthPermutation(9), [0, 1, 2, 3]);
    assertEquals(getNthPermutation(10), [0, 1, 3, 2]);
    assertEquals(getNthPermutation(11), [0, 2, 1, 3]);
    assertEquals(getNthPermutation(12), [0, 2, 3, 1]);
    assertEquals(getNthPermutation(13), [0, 3, 1, 2]);
    assertEquals(getNthPermutation(14), [0, 3, 2, 1]);
    assertEquals(getNthPermutation(15), [1, 0, 2, 3]);
    assertEquals(getNthPermutation(16), [1, 0, 3, 2]);
    assertEquals(getNthPermutation(17), [1, 2, 0, 3]);
    assertEquals(getNthPermutation(18), [1, 2, 3, 0]);
});

Deno.test("factorial", () => {
  assertEquals(factorial(0), 1);
  assertEquals(factorial(1), 1);
  assertEquals(factorial(2), 2);
  assertEquals(factorial(10), 3628800);
});
