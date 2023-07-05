<script lang="ts">
    import { page } from '$app/stores'
    import Card from '$components/card.svelte'
</script>

<section class="min-w-screen min-h-screen bg-gradient-to-bl from-violet-800 to-indigo-900">
    <Card class="flex flex-col">
        <h2 class="mx-auto w-max border-b-4 border-b-black font-prompt text-3xl font-semibold">Error {$page.status}</h2>
        <span class="mx-auto w-max font-prompt text-3xl font-medium">{$page.error?.message}</span>
        <img class="mx-auto w-[55%] p-4" src="/images/error.svg" alt="Error" />
    </Card>
</section>
