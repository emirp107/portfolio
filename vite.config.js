import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    // GitHub PagesのURLに合わせて'/'または'/リポジトリ名/'を設定します
    // リポジトリ名が 'portfolio' の場合は '/portfolio/' にしてください
    base: './',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                report: resolve(__dirname, 'case-report.html'),
                expense: resolve(__dirname, 'case-expense.html'),
                alert: resolve(__dirname, 'case-alert.html'),
                seat: resolve(__dirname, 'case-seat.html'),
            },
        },
    },
});
