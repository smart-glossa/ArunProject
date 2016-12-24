function show() {
	if (document.getElementById('benefits').style.display == 'none') {
		document.getElementById('benefits').style.display = 'block';
	}
	return false;
}
function hide() {
	if (document.getElementById('benefits').style.display == 'block') {
		document.getElementById('benefits').style.display = 'none';
	}
	return false;
}