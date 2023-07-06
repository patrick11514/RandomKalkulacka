<script lang="ts">
    import { twMerge } from 'tailwind-merge'

    export let type: 'button' | 'submit' | 'reset' | null | undefined = undefined
    export let disabled: boolean = false
    let cls = ''
    export { cls as class }
    export let scheme: 'violet' | 'pink' = 'violet'
</script>

<button
    {type}
    {disabled}
    on:click
    class={twMerge(
        'mx-auto w-max cursor-pointer rounded-xl bg-gradient-to-bl px-8 py-2 text-white transition-all duration-300 disabled:cursor-not-allowed disabled:grayscale',
        cls,
        scheme === 'violet' ? 'from-violet-800 to-indigo-900' : 'from-pink-600 to-purple-500'
    )}
>
    <slot />
</button>
