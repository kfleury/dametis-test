export function isValidColor(color: string): boolean {
    const hexRegex = /^#[0-9A-Fa-f]{6}$/
    if (hexRegex.test(color)) {
        return true
    }
    const predefinedColors = [
        'transparent', 'black', 'silver', 'gray', 'white', 'maroon', 'red', 'purple', 
        'fuchsia', 'green', 'lime', 'olive', 'yellow', 'navy', 'blue', 'teal', 'aqua', 'pink'
    ]
    if (predefinedColors.includes(color.toLowerCase())) {
        return true
    }
    return false
}