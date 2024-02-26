

```js{1,6}
import { createMiru } from 'miru.ink';
import { createApp } from 'vue';
import App from '@/App.vue';

const app = createApp(App);
app.use(createMiru());
app.mount('#app');
```
