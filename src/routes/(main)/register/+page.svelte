<script lang="ts">
    import { goto } from '$app/navigation'
    import Card from '$components/card.svelte'
    import { userData } from '$components/data.svelte'
    import Link from '$components/link.svelte'
    import { SwalAlert } from '$lib/functions'
    import type { ResponseWithData } from '$types/response'
    import type { user } from '$types/types'

    let username = ''
    let password = ''
    let secondPassword = ''
    let buttonDisabled = false

    let error = ''

    $: {
        if (password != secondPassword) {
            error = 'Hesla se neshodují'
        } else {
            error = ''
        }
    }

    const register = async () => {
        if (password != secondPassword) return
        if (username === '' || password === '') {
            SwalAlert({
                title: 'Nevyplnil jsi všechny údaje',
                icon: 'error'
            })
            return
        }
        buttonDisabled = true

        const request = await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'register',
                username,
                password
            })
        })

        const data = (await request.json()) as ResponseWithData<user>

        if (data.status) {
            SwalAlert({
                title: 'Registrace proběhla úspěšně',
                icon: 'success'
            })
            userData.set(data.data)
            goto('/dash')
        } else {
            SwalAlert({
                title: data.error as string,
                icon: 'error'
            })
            buttonDisabled = false
        }
    }
</script>

<svelte:head>
    <title>Registrace | Finanční Kalkulačka</title>
    <meta name="description" content="Register to Financial Calculator" />
</svelte:head>

<Card>
    <h2 class="mx-auto w-max border-b-4 border-b-black font-prompt text-3xl font-semibold">Registrace</h2>
    <h3 class="mx-auto w-max rounded-xl bg-gray-400 px-3 py-1">
        <i class="bi bi-lock-fill text-green-600" />
        https://fc.patrick115.eu
    </h3>
    <div class="mx-auto flex w-[75%] flex-col space-y-2">
        {#if error != ''}
            <span class="mx-auto w-[80%] rounded-md border-2 border-red-600 bg-red-300 px-4 py-1 text-center font-bold text-black">{error}</span>
        {/if}
        <input bind:value={username} placeholder="Jméno" class="rounded-md border-2 border-black px-3 py-0.5 outline-none" type="text" />
        <input bind:value={password} placeholder="Heslo" class="rounded-md border-2 border-black px-3 py-0.5 outline-none" type="password" />
        <input bind:value={secondPassword} placeholder="Znova heslo" class="rounded-md border-2 border-black px-3 py-0.5 outline-none" type="password" />
        <button
            disabled={buttonDisabled}
            class="mx-auto w-max cursor-pointer rounded-xl bg-gradient-to-bl from-violet-800 to-indigo-900 px-8 py-2 text-white transition-all duration-300 disabled:cursor-not-allowed disabled:grayscale"
            on:click={register}
        >
            Zaregistrovat se
        </button>
    </div>
    <h6 class="mx-auto w-max text-lg">Nebo se místo toho <Link link="/">přihlásit</Link>.</h6>
</Card>
