# levenshtein <Badge text="v0.1.0" />

> Source: [tutorialspoint.com/levenshtein-distance-in-javascript](https://www.tutorialspoint.com/levenshtein-distance-in-javascript), slightly modified by rat.md.

Calculates the [Levenshtein distance](https://en.wikipedia.org/wiki/Levenshtein_distance) between 2 
words.

## Declaration

```ts
declare function levenshtein(string1: string, string2: string): number
```

## Examples

```ts
import levenshtein from 'miru.ink/utils/levenshtein';

console.log( levenshtein('Austria', 'Australia') ); // Output: 2
```
