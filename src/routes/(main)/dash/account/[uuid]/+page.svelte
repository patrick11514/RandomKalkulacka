<script lang="ts">
    import { page } from '$app/stores'
    import AccountSelector from '$components/accountSelector.svelte'
</script>

<svelte:head>
    <title>{$page.params.uuid} | Finanční Kalkulačka</title>
</svelte:head>

<AccountSelector selected={$page.params.uuid} />

{$page.params.uuid}
