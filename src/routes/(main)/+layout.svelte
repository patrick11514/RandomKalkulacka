<script lang="ts">
    import { browser } from '$app/environment'
    import { userData } from '$components/data.svelte'
    import type { LayoutData } from './$types'

    export let data: LayoutData

    if (data.status) {
        if (browser) {
            userData.set(data.data)
        }
    }
</script>

<section class="h-full w-full overflow-y-scroll bg-gradient-to-bl from-violet-800 to-indigo-900">
    <slot />
</section>
