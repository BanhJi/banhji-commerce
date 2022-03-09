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
		'b-close': '&#xe903;',
		'b-logout': '&#xe904;',
		'b-search': '&#xe905;',
		'b-mini': '&#xe906;',
		'b-management': '&#xe907;',
		'b-segment': '&#xe908;',
		'b-recivable': '&#xe909;',
		'b-payable': '&#xe90a;',
		'b-payroll': '&#xe90b;',
		'b-accounting': '&#xe90c;',
		'b-cash': '&#xe90d;',
		'b-banking': '&#xe90e;',
		'b-billing': '&#xe90f;',
		'b-budget': '&#xe910;',
		'b-commerce': '&#xe911;',
		'b-compliance': '&#xe912;',
		'b-cooperative': '&#xe913;',
		'b-dimensions': '&#xe914;',
		'b-e_commerce': '&#xe915;',
		'b-financing': '&#xe916;',
		'b-fund_acc': '&#xe917;',
		'b-funding': '&#xe918;',
		'b-general_ledger': '&#xe919;',
		'b-insurance': '&#xe91a;',
		'b-loyalty': '&#xe91b;',
		'b-modul': '&#xe91c;',
		'b-multiple': '&#xe91d;',
		'b-overview': '&#xe91e;',
		'b-payment': '&#xe91f;',
		'b-pricing': '&#xe921;',
		'b-product': '&#xe922;',
		'b-ratio': '&#xe923;',
		'b-report': '&#xe924;',
		'b-sale_channel': '&#xe926;',
		'b-service': '&#xe927;',
		'b-specific': '&#xe928;',
		'b-statistics': '&#xe929;',
		'b-structures': '&#xe92a;',
		'b-transation': '&#xe92b;',
		'b-reward': '&#xe920;',
		'b-pos': '&#xe925;',
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
