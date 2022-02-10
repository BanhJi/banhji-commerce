/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'banhji-accounting-icon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'b-recivable': '&#xe900;',
		'b-payable': '&#xe901;',
		'b-payroll': '&#xe902;',
		'b-accounting': '&#xe903;',
		'b-service': '&#xe904;',
		'b-payment': '&#xe905;',
		'b-product': '&#xe906;',
		'b-financing': '&#xe907;',
		'b-funding': '&#xe908;',
		'b-insurance': '&#xe909;',
		'b-banking': '&#xe90a;',
		'b-billing': '&#xe90b;',
		'b-budget': '&#xe90c;',
		'b-overview': '&#xe90d;',
		'b-cash': '&#xe90e;',
		'b-compliance': '&#xe90f;',
		'b-commerce': '&#xe910;',
		'b-cooperative': '&#xe91d;',
		'b-segment': '&#xe911;',
		'b-report': '&#xe912;',
		'b-management': '&#xe913;',
		'b-add': '&#xe914;',
		'b-chat': '&#xe915;',
		'b-close': '&#xe916;',
		'b-full': '&#xe917;',
		'b-logout': '&#xe918;',
		'b-mini': '&#xe919;',
		'b-modul': '&#xe91a;',
		'b-search': '&#xe91b;',
		'b-transation': '&#xe91c;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/b-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
