<template>
    <div class="demo-root">
        <input ref="inputEl" />
        <div class="center">
            {{ strValue }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { useVueTimeInput } from '../../src'

const { inputEl, strValue } = useVueTimeInput()
</script>

<style>
body {
    margin: 0;
}
.demo-root {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.center {
    margin-left: auto;
    margin-right: auto;
}
</style>
