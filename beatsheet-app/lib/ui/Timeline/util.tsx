export function getRandomColor() {
    const minBrightness = 70; // Adjust this value to set the minimum brightness
    const maxAttempts = 100;  // Adjust this value to control the number of attempts

    const randomColor = () => Math.floor(Math.random() * 256);

    const generatedColors = new Set();

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const r = randomColor();
        const g = randomColor();
        const b = randomColor();

        const brightness = (r * 299 + g * 587 + b * 114) / 1000;

        if (brightness >= minBrightness) {
            const colorString = `rgb(${r},${g},${b})`;

            if (!generatedColors.has(colorString)) {
                generatedColors.add(colorString);
                return colorString;
            }
        }
    }
}