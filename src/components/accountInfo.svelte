<script lang="ts" context="module">
    import type { ResponseWithData } from '$types/response'

    export const intl = (currency?: string) => {
        return currency
            ? new Intl.NumberFormat('cs-CZ', {
                  style: 'currency',
                  currency
              })
            : new Intl.NumberFormat('cs-CZ', {
                  style: 'decimal',
                  minimumFractionDigits: 2
              })
    }

    export const getAccountData = async (uuid: string) => {
        const request = await fetch('/api/accounts/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uuid
            })
        })

        const data = (await request.json()) as ResponseWithData<accountData>

        if (data.status) {
            return data.data
        } else {
            return null
        }
    }
</script>

<script lang="ts">
    import type { account, accountData } from '$types/types'
    import { onMount } from 'svelte'
    import Button from './button.svelte'

    export let data: account

    let accountData: accountData | null = null

    onMount(async () => {
        accountData = await getAccountData(data.uuid)
    })
</script>

{#if accountData}
    <div class="min-w-[95%] p-2 sm:min-w-[80%] md:min-w-[55%] lg:min-w-[45%] xl:min-w-[40%] 2xl:min-w-[30%]">
        <div class="space-y-3 rounded-xl bg-gradient-to-bl from-white to-slate-300 px-4 py-20 text-black shadow-2xl">
            <div class="px-6 text-sm">
                <div class="flex flex-row">
                    <div class="flex flex-col">
                        <span class="text-xl font-bold">{data.name}</span>
                        <span>{accountData.uuid}</span>
                        <span class="text-md">{accountData.owner.name} ({accountData.owner.id})</span>
                    </div>

                    <div class="ml-auto flex flex-col">
                        {#if accountData.currency && accountData.balance !== null}
                            <span class="ml-auto text-xl font-bold">{intl(accountData.currency).format(accountData.balance)}</span>
                            <span class="ml-auto">{accountData.currency}</span>
                        {:else}
                            <span class="ml-auto text-xl font-bold">{intl().format(0)}</span>
                            <span class="ml-auto">Nenastaveno</span>
                        {/if}
                    </div>
                </div>
                {#if accountData.currency}
                    <div class="flex flex-col">
                        <h2 class="mx-auto w-max text-lg font-bold">Přehled za posledních 30 dní</h2>
                        <div class="flex flex-row px-8 text-2xl font-bold">
                            <span class="mr-auto text-green-600">+{intl(accountData.currency).format(30)}</span>
                            <span class="ml-auto text-red-600">-{intl(accountData.currency).format(30)}</span>
                        </div>
                    </div>
                {/if}
                {#if !accountData.currency && accountData.balance === null}
                    <div class="w-full">
                        <Button class="mx-auto" scheme="pink" on:click={console.log}>Nastavit účet</Button>
                    </div>
                {/if}
            </div>
        </div>
    </div>
{/if}
