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
    let buttonDisabled = false

    const login = async () => {
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
                action: 'login',
                username,
                password
            })
        })

        const data = (await request.json()) as ResponseWithData<user>

        if (data.status) {
            SwalAlert({
                title: 'Přihlášení proběhlo úspěšně',
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
    <title>Login | Finanční Kalkulačka</title>
    <meta name="description" content="Login to Financial Calculator" />
</svelte:head>

<Card>
    <h2 class="mx-auto w-max font-prompt text-3xl font-semibold border-b-4 border-b-black">Přihlášení</h2>
    <h3 class="mx-auto w-max px-3 py-1 bg-gray-400 rounded-xl">
        <i class="bi bi-lock-fill text-green-600" />
        https://fc.patrick115.eu
    </h3>
    <div class="mx-auto w-[75%] flex flex-col space-y-2">
        <input bind:value={username} placeholder="Jméno" class="px-3 py-0.5 border-2 border-black rounded-md outline-none" type="text" />
        <input bind:value={password} placeholder="Heslo" class="px-3 py-0.5 border-2 border-black rounded-md outline-none" type="password" />
        <button
            disabled={buttonDisabled}
            class="mx-auto px-8 py-2 w-max rounded-xl bg-gradient-to-bl from-violet-800 to-indigo-900 text-white cursor-pointer disabled:cursor-not-allowed disabled:grayscale transition-all duration-300"
            on:click={login}
        >
            Přihlásit se
        </button>
    </div>
    <h6 class="mx-auto w-max text-lg">Nebo se místo toho <Link link="/register">registrovat</Link>.</h6>
</Card>
