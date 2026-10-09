//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-CePp-FHr.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "/workspace/src/routes/__root.tsx",
		children: [
			"/_admin",
			"/boutique",
			"/panier",
			"/paiement/$orderId"
		],
		preloads: [
			"/assets/index-apLKCdtZ.js",
			"/assets/store-DSYNlzsD.js",
			"/assets/useMatch-CHzEvA22.js",
			"/assets/preload-helper-Bh4-x3m3.js"
		],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-apLKCdtZ.js"
		} }]
	},
	"/_admin": {
		filePath: "/workspace/src/routes/_admin.tsx",
		children: [
			"/_admin/analytics",
			"/_admin/assistance",
			"/_admin/catalogue",
			"/_admin/clients",
			"/_admin/commandes",
			"/_admin/fournisseurs",
			"/_admin/ia",
			"/_admin/integrations",
			"/_admin/parametres",
			"/_admin/payment",
			"/_admin/produits",
			"/_admin/produits-gagnants",
			"/_admin/regles-prix",
			"/_admin/"
		],
		preloads: [
			"/assets/_admin-iO9ZVpxa.js",
			"/assets/useNavigate-szWo52HE.js",
			"/assets/wallet-BOrwdzQc.js",
			"/assets/logo-FWYRCQKL.js",
			"/assets/truck-DGPsQIrJ.js"
		]
	},
	"/boutique": {
		filePath: "/workspace/src/routes/boutique.tsx",
		children: ["/boutique/$id"],
		preloads: [
			"/assets/boutique-DdrYW9eu.js",
			"/assets/shop-shell-DxkkZjcq.js",
			"/assets/logo-FWYRCQKL.js"
		]
	},
	"/panier": {
		filePath: "/workspace/src/routes/panier.tsx",
		children: void 0,
		preloads: [
			"/assets/panier-Ct2YVsIm.js",
			"/assets/useNavigate-szWo52HE.js",
			"/assets/shop-shell-DxkkZjcq.js"
		]
	},
	"/boutique/$id": {
		filePath: "/workspace/src/routes/boutique.$id.tsx",
		children: void 0,
		preloads: ["/assets/boutique._id-D6YqvIWD.js"]
	},
	"/paiement/$orderId": {
		filePath: "/workspace/src/routes/paiement.$orderId.tsx",
		children: void 0,
		preloads: [
			"/assets/paiement._orderId-DICXY7SH.js",
			"/assets/shop-shell-DxkkZjcq.js",
			"/assets/logo-FWYRCQKL.js"
		]
	},
	"/_admin/": {
		filePath: "/workspace/src/routes/_admin/index.tsx",
		children: void 0,
		preloads: ["/assets/_admin-CpavEjtr.js"]
	}
} });
//#endregion
export { tsrStartManifest };
