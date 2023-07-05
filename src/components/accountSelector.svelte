<script lang="ts" context="module">
    import { browser } from '$app/environment'
    import { goto } from '$app/navigation'
    import { SwalAlert } from '$lib/functions'
    import type { ResponseWithData } from '$types/response'
    import type { account } from '$types/types'
    import { onMount } from 'svelte'

    export const getAccounts = async () => {
        const request = await fetch('/api/accounts/list')

        const data = (await request.json()) as ResponseWithData<account[]>

        if (data.status) {
            return data.data
        } else {
            return []
        }
    }

    export const createAccount = async () => {
        const out = await SwalAlert({
            toast: false,
            disablePosition: true,
            title: 'Vytvořit nový účet',
            input: 'text',
            inputLabel: 'Jméno účtu',
            disableTimer: true,
            buttons: true,
            confirmButton: 'Vytvořit',
            cancelButton: 'Zrušit',
            reverseButtons: true
        })

        if (!out.isConfirmed) return

        const request = await fetch('/api/accounts/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: out.value
            })
        })

        const data = (await request.json()) as ResponseWithData<account>

        if (data.status) {
            SwalAlert({
                title: 'Účet byl úspěšně vytvořen',
                icon: 'success'
            })
        } else {
            SwalAlert({
                title: data.error as string,
                icon: 'error'
            })
        }
    }
</script>

<script lang="ts">
    let data: account[] | null = null

    onMount(async () => {
        data = await getAccounts()
    })

    export let selected = ''

    $: if (browser && selected) goto('/dash/account/' + selected)
</script>

<div class="flex flex-row space-x-5">
    <select class="px-4 py-2 text-white rounded-xl font-bold bg-gradient-to-br from-pink-600 to-purple-500" bind:value={selected}>
        {#if data}
            {#if data.length == 0}
                <option class="text-black" value="" selected disabled>Žádné účty nenalezeny</option>
            {:else}
                <option class="text-black" value="" selected disabled>Vyber si účet</option>
            {/if}
            {#each data as account}
                <option class="text-black" value={account.uuid}>{account.name}</option>
            {/each}
        {:else}
            <option class="text-black" value="" selected disabled>Načítání...</option>
        {/if}
    </select>
    <button
        on:click={async () => {
            await createAccount()
            data = await getAccounts()
        }}
        class="px-4 py-2 rounded-xl text-white hover:text-gray-200 cursor-pointer disabled:cursor-not-allowed duration-500 font-bold bg-gradient-to-br from-pink-600 to-purple-500"
    >
        Vytvořit nový účet
    </button>
</div>
