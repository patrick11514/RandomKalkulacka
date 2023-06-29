<script lang="ts" context="module">
    import type { user } from '$types/types'
    import { writable } from 'svelte/store'

    export const userData = writable<user>()
</script>
