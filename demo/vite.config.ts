import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
    root: path.resolve(__dirname),
    plugins: [vue()],
    resolve: {
        alias: {
            // 데모에서 라이브러리 소스 코드를 불러오기 위한 alias 설정
            '@': path.resolve(__dirname, '../src'),
        },
    },
})
