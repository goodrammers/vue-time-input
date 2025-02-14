<template>
    <div class="demo-root">
        <div class="demo-case">
            <input ref="inputEl" />
        </div>

        <div class="demo-case">
            <input ref="inputSec" />
        </div>

        <div class="demo-case">
            <input ref="inputSeparator" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useVueTimeInput } from '../../src'

const { inputEl } = useVueTimeInput()
const { inputEl: inputSec } = useVueTimeInput({ useSeconds: true })
const { inputEl: inputSeparator } = useVueTimeInput({ separator: '-' })
</script>

<style>
body {
    margin: 0;
}
.demo-root {
    width: 100vw;
    height: 100vh;
}
.demo-case {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
}
</style>
