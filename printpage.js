window.printPage = function(url) {
	function printFrame(id) {
		var ua = window.navigator.userAgent;
		var msie = ua.indexOf("MSIE ");
		var iframe = document.getElementById(id);

		if (msie > 0) {
			iframe.contentWindow.document.execCommand('print', false, null);
		} else {
			iframe.contentWindow.focus();
			iframe.contentWindow.print();
		}
	}

	var frame = $("#printFrame");
	
	if (!frame[0]) {
		
		frame = $("<iframe>", {
			id: "printFrame",
			name: "printFrame",
			style: "display: none"
		});
		
		frame.load(function() { // must subscribe to onload before setting src on Firefox
			if (frame.attr("src") === url) { // Firefox calls onload also for empty URL
				printFrame("printFrame");
			}
		});
		
		frame.appendTo('body');
	}
	
	if (frame.attr("src") !== url) {
		frame.attr("src", url);
	}
	else {
		printFrame("printFrame"); // Firefox does not call onload if src is the same
	}
};
