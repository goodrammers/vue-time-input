## install
```shell
yarn add gcomp-vue-time-input
```
or
```shell
npm install gcomp-vue-time-input
```

## usage
```vue
<template>
    <input ref="inputEl" />
</template>

<script>
import {useVueTimeInput} from 'gcomp-vue-time-input'

const { inputEl } = useVueTimeInput()
</script> 
```
## options
```typescript
const { inputEl } = useVueTimeInput()
const { inputEl } = useVueTimeInput({ useSeconds: true })
const { inputEl } = useVueTimeInput({ separator: '-' })
const { inputEl } = useVueTimeInput({ separator: '-', useSeconds: true })
```
