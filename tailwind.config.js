/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            fontFamily: {
                roboto: ['Roboto', 'sans-serif'],
                oswald: ['Oswald', 'sans-serif'],
                prompt: ['Prompt', 'sans-serif']
            }
        }
    },
    plugins: []
}
