/**
 * @pure
 **/
export function waveFormUint(array: Uint8Array) {
    let min = 256;
    let max = -1;
    for(let current of array) {
        if(current < min) min = current;
        if(current > max) max = current;
    }
    return max - min;
}

/**
 * @pure
 **/
export function waveForm(array: number[]) {
    let min = Infinity;
    let max = -Infinity;
    for(let current of array) {
        if(current < min) min = current;
        if(current > max) max = current;
    }
    return max - min;
}

/**
 * @pure
 **/
export function frequencyValue(audioData: Uint8Array) {
    // the higher the value fed as y to the canvas,
    // the smaller the wave - so we want to reverse the wave-form,
    // so that a large wave-form value ends up as a large wave on the canvas
    return 255 - waveFormUint(audioData);
}
