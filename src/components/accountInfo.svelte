<script lang="ts" context="module">
    import type { ResponseWithData } from '$types/response'

    export const intl = (currency: string) => {
        return new Intl.NumberFormat('cs-CZ', {
            style: 'currency',
            currency
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

    export let data: account

    let accountData: accountData | null = null

    onMount(async () => {
        accountData = await getAccountData(data.uuid)
    })
</script>

{#if accountData}
    <div
        class="m-auto py-10 px-2 min-w-[95%] sm:min-w-[80%] md:min-w-[55%] lg:min-w-[45%] xl:min-w-[40%] 2xl:min-w-[30%] bg-gradient-to-bl from-white to-slate-300 rounded-xl shadow-2xl text-black space-y-3"
    >
        <h2 class="w-max mx-auto font-sans font-bold text-2xl border-b-4 border-b-black">{data.name}</h2>
        <table class="mx-autotext-lg">
            <tbody>
                <tr>
                    <td class="text-right font-semibold">Majitel:</td>
                    <td>{accountData.owner.name}</td>
                </tr>
                <tr>
                    <td class="text-right font-semibold">Číslo účtu:</td>
                    <td>{accountData.uuid}</td>
                </tr>
                {#if accountData.currency && accountData.balance !== null}
                    <tr>
                        <td class="text-right font-semibold">Měna:</td>
                        <td>{accountData.currency}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-semibold">Částka</td>
                        <td>{intl(accountData.currency).format(accountData.balance)}</td>
                    </tr>
                {/if}
            </tbody>
        </table>
    </div>
{/if}
