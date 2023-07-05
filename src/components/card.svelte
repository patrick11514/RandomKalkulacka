<script lang="ts">
    import { twMerge } from 'tailwind-merge'

    let cls = ''
    export { cls as class }
</script>

<div class="flex min-h-screen">
    <div
        class={twMerge(
            'm-auto w-full min-w-[95%] space-y-3 rounded-xl bg-gradient-to-bl from-white to-slate-300 px-2 py-10 text-black shadow-2xl sm:min-w-[80%] md:min-w-[55%] lg:min-w-[45%] xl:min-w-[40%] 2xl:min-w-[30%]',
            cls
        )}
    >
        <slot />
    </div>
</div>
