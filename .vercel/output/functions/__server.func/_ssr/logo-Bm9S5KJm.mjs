import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as cn } from "./store-DJZ3SnuM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/logo-Bm9S5KJm.js
var import_jsx_runtime = require_jsx_runtime();
function DbsMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 36 36",
		className: cn("size-9", className),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "18",
				cy: "18",
				r: "16",
				fill: "none",
				stroke: "currentColor",
				className: "text-primary",
				strokeWidth: "1.7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "18",
				cy: "18",
				r: "12.5",
				className: "fill-primary/15"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "18",
				y: "23",
				textAnchor: "middle",
				fontSize: "14",
				fontWeight: "700",
				className: "fill-primary",
				fontFamily: "Outfit, sans-serif",
				children: "D"
			})
		]
	});
}
function DbsLogo({ compact = false, light = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DbsMark, {}), !compact && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 leading-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("font-display text-sm font-semibold tracking-wide", light ? "text-primary-foreground" : "text-foreground"),
				children: "DBS"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs font-medium uppercase tracking-widest text-muted-foreground",
				children: "Digital Business Store"
			})]
		})]
	});
}
//#endregion
export { DbsMark as n, DbsLogo as t };
