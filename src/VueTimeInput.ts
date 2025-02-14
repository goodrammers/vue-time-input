import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

function isInputHtml(value: HTMLInputElement | null | undefined): value is HTMLInputElement {
    return !!value
}

export type ErrorTypes =
    | 'INVALID_CHARACTER'
    | 'INVALID_FORMAT'
    | 'INVALID_DIGIT_COUNT'
    | 'INVALID_RANGE'
export interface TimeInputOptions {
    separator?: string
    useSeconds?: boolean
}

export function useVueTimeInput(options: TimeInputOptions = {}) {
    const inputEl = ref<HTMLInputElement>()
    const hour = ref(0)
    const minute = ref(0)
    const second = ref(0)
    const stampSec = ref(-1)
    const strValue = computed(() => {
        const hourMin = `${toString(hour.value)}${separator}${toString(minute.value)}`
        return useSeconds ? `${hourMin}:${toString(second.value)}` : hourMin
    })
    const errors = {
        INVALID_CHARACTER: 'Invalid character included',
        INVALID_FORMAT: 'Invalid format',
        INVALID_DIGIT_COUNT: 'Invalid digit count',
        INVALID_RANGE: 'Invalid range',
    }
    const { separator = ':', useSeconds = false } = options

    function setErrorMsg(code: ErrorTypes, message: string) {
        errors[code] = message
    }

    function applyToInput() {
        if (stampSec.value && inputEl.value) {
            inputEl.value.value = strValue.value
        }
    }

    function update() {
        if (inputEl.value && inputEl.value.value) {
            convert(inputEl.value.value)
            applyToInput()
        }
    }

    function onKeydown(e: KeyboardEvent) {
        const key = e.key
        // @ts-ignore
        const value = e.target.value
        if (key === 'Enter') {
            convert(value)
            applyToInput()
        }
    }
    function zeroPadding(value: string) {
        return value.length === 1 ? '0' + value : value
    }
    function toString(value: number) {
        return value < 10 ? `0${value}` : value.toString()
    }
    function reset() {
        hour.value = 0
        minute.value = 0
        second.value = 0
        stampSec.value = 0
    }
    function convert(value: string): string {
        const availableKeys = '0123456789' + separator
        const regex = new RegExp(`[^${availableKeys}]`)
        if (regex.test(value)) {
            reset()
            return errors.INVALID_CHARACTER
        }
        let result = ''
        if (value.includes(separator)) {
            const split = value.split(separator)
            const validLength = useSeconds ? 3 : 2
            if (split.length !== validLength) {
                reset()
                return errors.INVALID_FORMAT
            }
            let temp = ''
            split.forEach((value) => {
                temp += zeroPadding(value)
            })
            result = convertImpl(temp)
        } else {
            result = convertImpl(value)
        }
        if (result) {
            reset()
        }
        return result
    }

    function checkMinMax(value: number, min: number, max: number) {
        return value >= min && value <= max
    }

    function convertImpl(value: string) {
        const targetLength = useSeconds ? 6 : 4
        if (value.length > targetLength) {
            return errors.INVALID_DIGIT_COUNT
        }
        for (let i = 0; i < 6 - value.length; i++) {
            value += '0'
        }
        const _hour = +value.substring(0, 2)
        const _minute = +value.substring(2, 4)
        const _second = +value.substring(4, 6)
        const result = [
            { value: _hour, min: 0, max: 23 },
            { value: _minute, min: 0, max: 59 },
            { value: _second, min: 0, max: 59 },
        ]
        for (let i = 0; i < result.length; i++) {
            if (!checkMinMax(result[i].value, result[i].min, result[i].max)) {
                return errors.INVALID_RANGE
            }
        }
        hour.value = _hour
        minute.value = _minute
        second.value = _second
        stampSec.value = _hour * 3600 + _minute * 60 + _second
        return ''
    }

    onMounted(() => {
        if (isInputHtml(inputEl.value)) {
            inputEl.value.addEventListener('blur', update)
            inputEl.value.addEventListener('keydown', onKeydown)
        }
    })
    onBeforeUnmount(() => {
        if (isInputHtml(inputEl.value)) {
            inputEl.value.removeEventListener('blur', update)
            inputEl.value.removeEventListener('keydown', onKeydown)
        }
    })

    return {
        inputEl,
        strValue,
        stampSec,

        setErrorMsg,
    }
}
