<script lang="ts">
    import { page } from '$app/stores'

    const router = {
        '/dash': { name: 'Přehled', icon: 'house' },
        '/dash/accounts': { name: 'Účty', icon: 'cash-coin' }
    }
</script>

<div class="flex h-full min-h-screen p-4">
    <div class="m-auto h-full min-h-[98vh] w-full space-y-3 rounded-xl bg-gradient-to-bl from-white to-slate-300 px-6 py-4 text-black shadow-2xl">
        <nav
            class="mx-auto flex w-[40%] flex-row justify-center gap-10 rounded-full bg-gradient-to-bl from-winter-neva-100 to-winder-neva-200 px-2 py-2 font-prompt text-lg text-black"
        >
            {#each Object.entries(router) as [route, data]}
                {#if $page.url?.pathname == route}
                    <a class="rounded-xl bg-blue-950 bg-opacity-30 px-3 py-1 duration-500" href="./"><i class="bi bi-{data.icon}" /> {data.name}</a>
                {:else}
                    <a class="rounded-xl bg-blue-950 bg-opacity-0 px-3 py-1 duration-500 hover:bg-opacity-30" href={route}>
                        <i class="bi bi-{data.icon}" />
                        {data.name}
                    </a>
                {/if}
            {/each}
        </nav>
        <slot />
    </div>
</div>
