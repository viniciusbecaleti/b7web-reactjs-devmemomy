export function formatTimeElapsed(seconds: number) {
  let minutes = Math.floor(seconds / 60)
  seconds -= (minutes * 60)

  let secondsString = String(seconds).padStart(2, '0')
  let minutesString = String(minutes).padStart(2, '0')

  return `${minutesString}:${secondsString}`
}