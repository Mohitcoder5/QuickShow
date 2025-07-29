export const dateFormat = (date) => {
    return new Date(date).toLocaleString('en-US', {
        weakday: 'short',
        moth: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    })
}