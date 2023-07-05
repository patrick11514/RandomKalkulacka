<script lang="ts">
    import { twMerge } from 'tailwind-merge'

    let cls = ''
    export { cls as class }
</script>

<div class="flex min-h-screen">
    <div
        class={twMerge(
            'm-auto py-10 px-2 min-w-[95%] sm:min-w-[80%] md:min-w-[55%] lg:min-w-[45%] xl:min-w-[40%] 2xl:min-w-[30%] bg-gradient-to-bl from-white to-slate-300 rounded-xl shadow-2xl text-black space-y-3',
            cls
        )}
    >
        <slot />
    </div>
</div>
