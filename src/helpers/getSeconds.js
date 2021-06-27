export default function() {
	let now = new Date()
	let today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
	let seconds = Math.floor((now - today) / 1000)
	return seconds
}