/**
 * Bluescreen.
 *
 * This file is part of the Tracy (http://tracy.nette.org)
 * Copyright (c) 2004 David Grudl (http://davidgrudl.com)
 */

(function(){
	var bs = document.getElementById('tracyBluescreen');
	document.body.appendChild(bs);

	document.addEventListener('keyup', function(e) {
		if (e.keyCode == 27 && !e.shiftKey && !e.altKey && !e.ctrlKey && !e.metaKey) {
			document.getElementById('tracyBluescreenIcon').click();
		}
	});

	for (var i = 0, styles = []; i < document.styleSheets.length; i++) {
		var style = document.styleSheets[i];
		if (!Tracy.hasClass(style.ownerNode, 'tracy-debug')) {
			style.oldDisabled = style.disabled;
			style.disabled = true;
			styles.push(style);
		}
	}

	bs.addEventListener('click', function(e) {
		if (e.ctrlKey) {
			for (var link = e.target; link && (!link.getAttribute || !link.getAttribute('data-tracy-href')); link = link.parentNode) {}
			if (link) {
				location.href = link.getAttribute('data-tracy-href');
				return false;
			}
		}

		if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
			return;
		}

		for (var link = e.target; link && (!link.tagName || !Tracy.hasClass(link, 'tracy-toggle')); link = link.parentNode) {}
		if (!link) {
			return true;
		}

		var collapsed = Tracy.hasClass(link, 'tracy-collapsed'),
			ref = link.getAttribute('data-ref') || link.getAttribute('href', 2),
			dest = ref && ref !== '#' ? document.getElementById(ref.substring(1)) : link.nextElementSibling;

		Tracy[collapsed ? 'removeClass' : 'addClass'](link, 'tracy-collapsed');
		Tracy[collapsed ? 'removeClass' : 'addClass'](dest, 'tracy-collapsed');

		if (link.id === 'tracyBluescreenIcon') {
			for (i = 0; i < styles.length; i++) {
				styles[i].disabled = collapsed ? true : styles[i].oldDisabled;
			}
		}
		e.preventDefault();
		e.stopPropagation();
	});
})();