/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            fontFamily: {
                roboto: ['Roboto', 'sans-serif'],
                oswald: ['Oswald', 'sans-serif'],
                prompt: ['Prompt', 'sans-serif']
            },
            gradientColorStops: {
                'winter-neva-100': '#a1c4fd',
                'winder-neva-200': '#c2e9fb'
            },
            lineHeight: {
                nn: '1.5'
            }
        }
    },
    plugins: []
}
