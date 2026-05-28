export function scaleAnte (ante, a8) {

    const b = 1.6
    const k = 0.75
    const c = ante - 8
    const d = 1 + (0.2 * c)

    const base = a8 * Math.pow((b + Math.pow(k * c, d)), c)
    const exponent = Math.floor(Math.log10(base))
    const magnitude = Math.pow(10, exponent - 1)

    return Math.round(base / magnitude) * magnitude

}