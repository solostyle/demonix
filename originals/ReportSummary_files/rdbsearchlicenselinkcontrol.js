window.onload = function() {

	var oRequest = _getXHR();
	var hlReleaseLink = _getRDBReleaseLink();
	if(hlReleaseLink === null) {
		return;
	}

	hlReleaseLink.onclick = function() {
		oRequest.open('get', _getLinkURL());
		oRequest.onreadystatechange = function() {
			if(oRequest.readyState === 4 && oRequest.status === 200) {
				hlReleaseLink.style.display = 'none';
			}
		}
		oRequest.send(null);
		return false;
	}

}

function _getXHR() {
	var request = null;
	try {
		request = new XMLHttpRequest();
	} catch(tryMicrosoft) {
		try {
			request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (tryMicrosoftAlternative) {
			try {
				request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (failedException) {
				request = null;
			}
		}
	}
	return request;
}

function _getRDBReleaseLink() {

	var hlReleaseLock = null;
	
	var oRegEx = new RegExp('\\breleaserdblock\\b');
	var liItems = document.getElementsByTagName('li');
	for(var i = 0; i < liItems.length; i++) {
		var liCurrent = liItems[i];
		if(oRegEx.test(liCurrent.className)) {
			hlReleaseLock = liCurrent;
			hlReleaseLock.childNodes[0].title = "Release RDB Search License";
			hlReleaseLock.childNodes[0].id = 'cbhlReleaseLic';
			break;
		}
	}
	return hlReleaseLock;
}

function _getLinkURL() {
	var aRelease = document.getElementById('cbhlReleaseLic');
	var sUrl = aRelease.href;
	sUrl += '&randomSeed=' + Math.floor(Math.random()*100);
	return sUrl;
}