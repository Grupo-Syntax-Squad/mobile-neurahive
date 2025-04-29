export default function convertToSaoPauloUTC(date: number) {
    const timestamp = date * 1000
    const dateUtc = new Date(timestamp)
    const dateSaoPaulo = new Date(dateUtc.getTime() - 3 * 60 * 60 * 1000)
    return dateSaoPaulo
}
