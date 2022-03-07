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
		'b-add': '&#xe900;',
		'b-full': '&#xe901;',
		'b-chat': '&#xe902;',
		'b-logout': '&#xe903;',
		'b-search': '&#xe904;',
		'b-mini': '&#xe905;',
		'b-close': '&#xe906;',
		'b-transation': '&#xe907;',
		'b-modul': '&#xe908;',
		'b-report': '&#xe909;',
		'b-billing': '&#xe90a;',
		'b-budget': '&#xe90b;',
		'b-commerce': '&#xe90c;',
		'b-compliance': '&#xe90d;',
		'b-cooperative': '&#xe90e;',
		'b-dimensions': '&#xe90f;',
		'b-e_commerce': '&#xe910;',
		'b-financing': '&#xe911;',
		'b-fund_acc': '&#xe912;',
		'b-funding': '&#xe913;',
		'b-management': '&#xe914;',
		'b-insurance': '&#xe915;',
		'b-general_ledger': '&#xe916;',
		'b-loyalty': '&#xe917;',
		'b-multiple': '&#xe918;',
		'b-overview': '&#xe919;',
		'b-accounting': '&#xe91a;',
		'b-recivable': '&#xe91b;',
		'b-payable': '&#xe91c;',
		'b-payroll': '&#xe91d;',
		'b-product': '&#xe91e;',
		'b-service': '&#xe91f;',
		'b-cash': '&#xe920;',
		'b-banking': '&#xe921;',
		'b-payment': '&#xe922;',
		'b-pos': '&#xe923;',
		'b-pricing': '&#xe924;',
		'b-reward': '&#xe925;',
		'b-sale_channel': '&#xe926;',
		'b-segment': '&#xe927;',
		'b-specific': '&#xe928;',
		'b-structures': '&#xe929;',
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
