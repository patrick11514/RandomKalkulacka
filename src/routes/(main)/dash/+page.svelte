<script lang="ts">
    import AccountInfo from '$components/accountInfo.svelte'
    import AccountSelector, { getAccounts } from '$components/accountSelector.svelte'
    import type { account } from '$types/types'
    import { onMount } from 'svelte'

    let accounts: account[] = []

    onMount(async () => {
        accounts = await getAccounts()
    })
</script>

<svelte:head>
    <title>Přehled | Finanční Kalkulačka</title>
</svelte:head>

<AccountSelector />

<div class="p-10 h-[85%] flex flex-row space-x-3 overflow-x-scroll">
    {#each accounts as account}
        <AccountInfo data={account} />
    {/each}
</div>
