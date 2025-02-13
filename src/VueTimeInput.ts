import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

export function useVueTimeInput() {
    const inputEl = ref<HTMLInputElement>()
    const value = ref(-1)
    const strValue = computed(() => (value.value < 0 ? '' : value.value))

    onMounted(() => {
        value.value = 10
    })
    onBeforeUnmount(() => {})

    return {
        inputEl,
        strValue,
    }
}
