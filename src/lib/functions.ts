import Swal from 'sweetalert2'

export const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export const SwalAlert = async ({
    icon,
    title,
    buttons,
    confirmButton,
    cancelButton,
    denyButton,
    reverseButtons,
    toast,
    disablePosition,
    disableTimer,
    time,
    input,
    inputLabel,
    text
}: {
    icon?: 'success' | 'error' | 'question'
    title: string
    buttons?: boolean
    confirmButton?: string
    cancelButton?: string
    denyButton?: string
    reverseButtons?: boolean
    toast?: boolean
    disablePosition?: boolean
    disableTimer?: boolean
    time?: number
    input?: 'text' | 'number'
    inputLabel?: string
    text?: string
}) => {
    return await Swal.fire({
        toast: toast !== undefined ? toast : true,
        position: disablePosition && disablePosition == true ? 'center' : 'top-end',
        timer: disableTimer && disableTimer == true ? undefined : time ?? 2000,
        timerProgressBar: disableTimer && disableTimer == true ? undefined : true,
        icon: icon,
        title: title,
        confirmButtonText: buttons && confirmButton ? confirmButton : undefined,
        showConfirmButton: buttons && confirmButton ? true : false,
        cancelButtonText: buttons && cancelButton ? cancelButton : undefined,
        showCancelButton: buttons && cancelButton ? true : false,
        denyButtonText: buttons && denyButton ? denyButton : undefined,
        showDenyButton: buttons && denyButton ? true : false,
        reverseButtons: reverseButtons ? true : false,
        input: input,
        inputLabel: inputLabel,
        text: text,
        inputValidator: (value) => {
            if (!value) {
                return 'Musíš vyplnit input'
            }
            return null
        }
    })
}
