function factorialInt(n: number): number {
  if (n === 0) return 1;
  return n * factorialInt(n - 1);
}

export const factorial = memoize(factorialInt);

export function bigSqrt(n: bigint): bigint {
  let x = n;
  let y = (x + 1n) / 2n;
  while (y < x) {
    x = y;
    y = (x + n / x) / 2n;
  }
  return x;
}

export function bigNRoot(n: bigint, r: bigint): bigint {
  if (r === 0n) return 1n;
  let x = n;
  let y = (r * x + n / x ** (r - 1n)) / (r + 1n);
  while (y < x) {
    x = y;
    y = (r * x + n / x ** (r - 1n)) / (r + 1n);
  }
  return x;
}

export function cantorUnpair(k: bigint): [bigint, bigint] {
  const w = (bigSqrt(8n * k + 1n) - 1n) / 2n;
  const t = (w * w + w) / 2n;
  const y = k - t;
  const x = w - y;
  return [x, y];
}

export function cantorPair(x: bigint, y: bigint): bigint {
  return ((x + y) * (x + y + 1n)) / 2n + y;
}

export function szudzikPair(x: bigint, y: bigint): bigint {
  return x >= y ? x * x + x + y : x + y * y;
}

export function szudzikUnpair(z: bigint): bigint[] {
  const r = bigSqrt(z);
  const ar = r < 0n ? -r : r;
  const zmr = z - r * r;
  if (zmr < r) {
    return [zmr, ar];
  } else {
    return [ar, zmr - r];
  }
}

export function rosenbergStringPair(x: bigint, y: bigint): bigint {
  const max = x > y ? x : y;
  return max * max + max + x - y;
}

export function rosenbergStrongUnpair(z: bigint): [bigint, bigint] {
  const m = bigSqrt(z);
  const zmm2 = z - m * m;
  if (zmm2 < m) {
    return [zmm2, m];
  } else {
    return [m, m * m + 2n * m - z];
  }
}

export function isPermutation(map: number[]) {
  // Check that the map is a permutation of the integers 0..n-1
  const n = map.length;
  const seen = new Set<number>();
  for (const x of map) {
    if (x < 0 || x >= n || seen.has(x)) return false;
    seen.add(x);
  }
  return true;
}

//  getPermutationFn: number[] => (number[] => number[])
//  Returns a function that takes a permutation map and returns a function that
//  takes a list of numbers and returns the list of numbers permuted by the map.
export function getPermutationMapFn(
  map: number[]
): (list: number[]) => number[] {
  if (!isPermutation(map)) throw new Error("Not a permutation");
  return (list: number[]) => {
    const n = list.length;
    if (map.length !== n) throw new Error("Map length mismatch");
    const result = new Array(n);
    for (let i = 0; i < n; i++) {
      result[i] = list[map[i]];
    }
    return result;
  };
}

export function getPermutationFn(map: number[]): (n: number) => number {
  const max = map.length;
  return (n: number) => {
    const r = map[n % max];
    return r + Math.floor(n / max) * max;
  };
}

/// Given n, this function returns a permutation map that maps the integers 0..n-1
/// in a deterministic way.
//  getNthPermutation(0) = getNthOfMthPermutation(0, 1)
//  getNthPermutation(1) = getNthOfMthPermutation(0, 1)
//  getNthPermutation(2) = getNthOfMthPermutation(1, 2)
//  getNthPermutation(3) = getNthOfMthPermutation(0, 3)
//  getNthPermutation(4) = getNthOfMthPermutation(1, 3)
//  getNthPermutation(5) = getNthOfMthPermutation(2, 3)

export function getNthPermutation(n: number): number[] {
  //  First we figure out the size by counting the number of permutations
  //  needed to get to n.
  let size = 1;
  let startAt = 0;
  while (startAt + factorial(size) <= n) {
    startAt += factorial(size);
    size++;
  }
  return getNthOfMthPermutationFast(n - startAt, size);
}

// getNthPermutation: (number, number) => number[]
// Returns the nth permutation of the integers 0..n-1
export function getNthOfMthPermutation(nth: number, size: number): number[] {
  const map = new Array(size);
  for (let i = 0; i < size; i++) {
    map[i] = i;
  }
  for (let i = 0; i < nth; i++) {
    mutateNextPermutation(map);
  }
  return map;
}

// getNthPermutation: (number, number) => number[]
// Returns the nth permutation of the integers 0..n-1
export function getNthOfMthPermutationFast(n: number, size: number): number[] {
  let map = new Array(size);
  for (let i = 0; i < size; i++) {
    map[i] = i;
  }

  const result = [];
  for (let i = size; i > 0; i--) {
    const r = n % i;
    n = Math.floor(n / i);
    result.push(map[r]);
    map = map.slice(0, r).concat(map.slice(r + 1));
  }
  return result;
}

export function nextPermutation(map: number[]): number[] {
  const n = map.length;
  const result = new Array(n);
  for (let i = 0; i < n; i++) {
    result[i] = map[i];
  }
  mutateNextPermutation(result);
  return result;
}

// nextPermutation: number[] => void
// Modifies the array in place to be the next permutation of the integers 0..n-1
function mutateNextPermutation(map: number[]): void {
  const n = map.length;
  // Find the largest index k such that map[k] < map[k + 1]
  let i = n - 2;
  while (i >= 0 && map[i] >= map[i + 1]) {
    i--;
  }
  if (i < 0) {
    // return the first permutation
    for (let j = 0; j < n; j++) {
      map[j] = j;
    }
    return;
  }
  // Find the largest index l such that map[k] < map[l]
  let j = n - 1;
  while (map[j] <= map[i]) {
    j--;
  }
  // Swap map[k] and map[l]
  [map[i], map[j]] = [map[j], map[i]];
  // Reverse the sequence from map[k + 1] up to and including the final element map[n]
  let left = i + 1;
  let right = n - 1;
  while (left < right) {
    [map[left], map[right]] = [map[right], map[left]];
    left++;
    right--;
  }
}

// Given a list of numbers before and after, figure out the permutation map
// that would transform the before list into the after list.
// Ex:  before = [0, 1, 2], after = [2, 0, 1] => [2, 0, 1]
// Ex:  before = [2, 1, 0], after = [0, 1, 2] => [2, 1, 0]
// Ex:  before = [0, 2, 1], after = [1, 0, 2] => [2, 0, 1]
export function permutationFromBeforeAfter(
  before: number[],
  after: number[]
): number[] {
  const positions = new Map<number, number>();
  for (let i = 0; i < before.length; i++) {
    positions.set(before[i], i);
  }
  const result = new Array(before.length);
  for (let i = 0; i < after.length; i++) {
    result[i] = positions.get(after[i])!;
  }
  return result;
}

type Fn<T, U> = (input: T) => U;

function memoize<T, U>(fn: Fn<T, U>): Fn<T, U> {
  const cache = new Map<T, U>();

  return (input: T) => {
    const cached = cache.get(input);
    if (cached) return cached;
    const result = fn(input);
    cache.set(input, result);
    return result;
  };
}
