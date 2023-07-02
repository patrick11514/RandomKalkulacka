<script lang="ts">
    import { page } from '$app/stores'
    import Card from '$components/card.svelte'
</script>

<section class="bg-gradient-to-bl from-violet-800 to-indigo-900 min-w-screen min-h-screen">
    <Card class="flex flex-col">
        <h2 class="mx-auto w-max font-prompt text-3xl font-semibold border-b-4 border-b-black">Error {$page.status}</h2>
        <span class="mx-auto w-max font-prompt font-medium text-3xl">{$page.error?.message}</span>
        <img class="mx-auto p-4 w-[55%]" src="/images/error.svg" alt="Error" />
    </Card>
</section>
