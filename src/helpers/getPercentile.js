export default function(current, max) {
	return +(current / max * 100).toFixed(2)
}