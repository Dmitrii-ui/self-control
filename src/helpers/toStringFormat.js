export default function(num) {
	let hours = Math.floor(num / 3600)
	let minutes = Math.floor((num - (hours * 3600)) / 60)
	let seconds = (num - (hours * 3600)) - (60 * minutes)
	hours = String(hours).length === 1 ? '0' + hours : hours
	minutes = String(minutes).length === 1 ? '0' + minutes : minutes
	seconds = String(seconds).length === 1 ? '0' + seconds : seconds
	return hours + ':' + minutes + ':' + seconds
}

// export default function(num) {
// 	let hours = Math.floor(num)
// 	const remainder = num - hours
// 	const partRemainder = 1 - remainder
// 	let minutes = Math.floor(1 * 60 - partRemainder * 60)
// 	let seconds = Math.ceil(+((1 * 60 - partRemainder * 60) % 1).toFixed(4) * 60)
// 	hours = String(hours).length === 1 ? '0' + hours : hours
// 	minutes = String(minutes).length === 1 ? '0' + minutes : minutes
// 	seconds = String(seconds).length === 1 ? '0' + seconds : seconds
// 	return hours + ':' + minutes + ':' + seconds
// }