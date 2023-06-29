<script lang="ts">
    import { goto } from '$app/navigation'

    export let link: string | null = ''
    export let target: '_blank' | '_self' = '_self'
    let cls = ''
    export { cls as class }

    export let external = false
    export let onClick = false

    function gt() {
        if (link) {
            goto(link)
        }
    }
</script>

{#if target == '_blank' || external}
    <a style="text-decoration:none;" class={`text-violet-700 ${cls}`} href={link} {target} on:click><slot /></a>
{:else if !onClick}
    <a style="text-decoration:none;" class={`text-violet-700 ${cls}`} href={link} on:click><slot /></a>
{:else}
    <div role="link" class={`text-violet-700 ${cls}`} on:click={() => gt()} on:keypress={() => gt()} tabindex="-1"><slot /></div>
{/if}
