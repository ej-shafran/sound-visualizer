/**
 * More optimized version of `waveForm` which utilizes the `Uint8Array` type.
 *
 * @pure this function is determinstic and does not mutate state.
 *
 * @param array the `Uint8Array` to find the waveform value of.
 *
 * @returns the waveform value for `array`, AKA the difference between the maximum and minimum values.
 **/
export function waveFormUint(array: Uint8Array) {
  let min = 256;
  let max = -1;
  for (let current of array) {
    if (current < min) min = current;
    if (current > max) max = current;
  }
  return max - min;
}

/**
 * @pure this function is determinstic and does not mutate state.
 *
 * @param array the array to find the waveform value of.
 *
 * @returns the waveform value for `array`, AKA the difference between the maximum and minimum values.
 **/
export function waveForm(array: number[]) {
  let min = Infinity;
  let max = -Infinity;
  for (let current of array) {
    if (current < min) min = current;
    if (current > max) max = current;
  }
  return max - min;
}

/**
 * The `waveForm` functions return a higher value for a higher waveform value.
 * However, the higher the value fed as y to the canvas,
 * the smaller the wave - so we want to reverse the wave form,
 * so that a large waveform value is displayed as a large wave on the canvas
 *
 * @param audioData the audio data to get a useable frequency value for.
 *
 * @returns the frequency value for `audioData`; AKA the Uint8 maximum minus the waveform value.
 *
 * @pure this function is determinstic and does not mutate state.
 **/
export function frequencyValue(audioData: Uint8Array) {
  return 255 - waveFormUint(audioData);
}
