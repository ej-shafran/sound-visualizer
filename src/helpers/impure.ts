export * from "../common/draw/impure";
export * from "../continuous/draw/impure";
export * from "../current/draw/impure";

/**
 * Takes all the necessary steps to get the byteTimeDomainData analysis for a MediaStream,
 * returning two functions that analyse the audio at a given moment.
 *
 * @param audio the audio to analyse
 *
 * @returns
 * // an analysis function, which returns a Uint8Array with data for the current audio
 * // and a disconnecting function, to be called when the analysis is no longer needed
 * { analyse: () => Uint8Array, disconnect: () => void }
 *
 * @impure this function connects to (and alters) global state
 **/
export function startAnalysis(audio: MediaStream) {
  const audioContext = new window.AudioContext();
  const analyser = audioContext.createAnalyser();
  const dataArray = new Uint8Array(analyser.frequencyBinCount);
  const source = audioContext.createMediaStreamSource(audio);
  source.connect(analyser);

  function analyse() {
    analyser.getByteTimeDomainData(dataArray);
    return dataArray;
  }

  function disconnect() {
    source.disconnect();
    analyser.disconnect();
  }

  return { analyse, disconnect };
}
