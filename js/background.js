function launch() {
	chrome.app.window.create('inspectorwrapper.html', {
		'width' : 1100,
		'height' : 800,
		'frame' : 'none'
	});
}
chrome.app.runtime.onLaunched.addListener(function() {
	launch();
});