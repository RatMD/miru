# Client Composable

The client composable returns some basic Client related information, such as browser and os details, 
screen resolution and cookie-support. It also attaches itself to a few browser-native events to keep 
the screen details (resolution / orientation) and online/offline state up-to-date.

You can use this composable in a familiar manner.

```js
import { useClient } from 'miru.ink/composables/use-client';

const client = useClient();
```

## agent

```ts
type agent = string
```

Returns the full, unmodified [`navigator.userAgent` property](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent).
string. Keep in mind that users of a browser can change the value of this field if they want to.

## cookies

```ts
type cookies = boolean | null
```

Returns the [`navigator.cookieEnabled` property](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/cookieEnabled) 
value or null when this property is undefined.

## online

```ts
type online = boolean
```

Returns the [`navigator.onLine` property](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine) 
value. This value gets updated using the native `online` and `offline` events, which listeners are 
attached by the composable itself.

## screen.width

```ts
type width = number
```

Returns the current browser screen width, fetched from `documentElement.clientWidth` with
`window.outerWidth` as fallback. This value gets updates using the native `resize`, which listener 
is attached by the composable itself.

## screen.height

```ts
type height = number
```

Returns the current browser screen height, fetched from `documentElement.clientHeight` with
`window.outerHeight` as fallback. This value gets updates using the native `resize` event, which 
listener is attached by the composable itself.

## screen.orientation

```ts
type orientation = 'landscape' | 'portrait'
```

Returns the current browser screen orientation either based on `window.screen.orientation` or by
calculating the available width and height of the current available screen. This value gets updates 
using the native `resize` and `orientation` events, which listeners are attached by the composable 
itself.

## browser

> Source: [stackoverflow.com/a/18706818](https://stackoverflow.com/a/18706818), slightly modified by rat.md.

```ts
type browser = string
```

Returns the used browser with support for the following apps but, however, tries to recognise the 
name even if unknown / not directly supported.

- Chrome
- Firefox
- Microsoft Edge
- Microsoft Legacy Edge
- Microsoft Internet Explorer
- Opera
- Safari
- Samsung
- UC Browser
- Yandex

## browserVersion

> Source: [stackoverflow.com/a/18706818](https://stackoverflow.com/a/18706818), slightly modified by rat.md.

```ts
type browserVersion = string
```

Returns the used browser version with support for the apps above but, however, tries to recognise 
the version number even if unknown / not directly supported.


## browserMajorVersion

> Source: [stackoverflow.com/a/18706818](https://stackoverflow.com/a/18706818), slightly modified by rat.md.

```ts
type browserMajorVersion = number
```

Returns the used browser major version with support for the apps above but, however, tries to 
recognise the version number even if unknown / not directly supported.

## os

> Source: [stackoverflow.com/a/18706818](https://stackoverflow.com/a/18706818), slightly modified by rat.md.

```ts
type os = string|null
```

Returns the used operating system supporting the following ones, or null if not supported.

- Windows 10
- Windows 8.1
- Windows 8
- Windows 7
- Windows Vista
- Windows Server 2003
- Windows XP
- Windows 2000
- Windows ME
- Windows 98
- Windows 95
- Windows NT 4.0
- Windows CE
- Windows 3.11
- Android
- Open BSD
- Sun OS
- Chrome OS
- Linux
- iOS
- Mac OS X
- Mac OS
- QNX
- UNIX
- BeOS
- OS/2
- Search Bot

## osVersion

> Source: [stackoverflow.com/a/18706818](https://stackoverflow.com/a/18706818), slightly modified by rat.md.

```ts
type osVersion = string|null
```

Returns the used operating system version supporting the above ones, or null if not supported.

## isApple

> Source: [stackoverflow.com/a/18706818](https://stackoverflow.com/a/18706818), slightly modified by rat.md.

```ts
type isApple = boolean
```

Returns true if the operating system could be recognized as an Apple OS, otherwise false.

## isLinux

> Source: [stackoverflow.com/a/18706818](https://stackoverflow.com/a/18706818), slightly modified by rat.md.

```ts
type isLinux = boolean
```

Returns true if the operating system could be recognized as an Linux OS, otherwise false.

## isWindows

> Source: [stackoverflow.com/a/18706818](https://stackoverflow.com/a/18706818), slightly modified by rat.md.

```ts
type isWindows = boolean
```

Returns true if the operating system could be recognized as an Windows OS, otherwise false.

## isMobile

> Source: [stackoverflow.com/a/18706818](https://stackoverflow.com/a/18706818), slightly modified by rat.md.

```ts
type isMobile = boolean
```

Returns true if the operating system could be recognized as an Mobile / Smartphone OS, otherwise false.
