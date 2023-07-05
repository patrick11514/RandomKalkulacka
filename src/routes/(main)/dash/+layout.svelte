<script lang="ts">
    import { page } from '$app/stores'

    const router = {
        '/dash': { name: 'Přehled', icon: 'house' },
        '/dash/accounts': { name: 'Účty', icon: 'cash-coin' }
    }
</script>

<div class="flex min-h-screen">
    <div class="m-auto px-6 py-4 w-[98%] h-[95vh] bg-gradient-to-bl from-white to-slate-300 rounded-xl shadow-2xl text-black space-y-3">
        <nav
            class="px-2 py-2 w-[40%] mx-auto flex flex-row gap-10 justify-center bg-gradient-to-bl from-winter-neva-100 to-winder-neva-200 rounded-full text-black font-prompt text-lg"
        >
            {#each Object.entries(router) as [route, data]}
                {#if $page.url?.pathname == route}
                    <a class="px-3 py-1 bg-blue-950 bg-opacity-30 rounded-xl duration-500" href="./"><i class="bi bi-{data.icon}" /> {data.name}</a>
                {:else}
                    <a class="px-3 py-1 bg-blue-950 bg-opacity-0 hover:bg-opacity-30 rounded-xl duration-500" href={route}>
                        <i class="bi bi-{data.icon}" />
                        {data.name}
                    </a>
                {/if}
            {/each}
        </nav>
        <slot />
    </div>
</div>
