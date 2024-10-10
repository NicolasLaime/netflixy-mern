export function formatReleaseDate(date){
    return new Date(date).toLocaleDateString('en-Es', {
        year: 'numeric',
        month: 'long',
        day:'numeric'
    })
}