(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/packages/ui/src/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$tailwind$2d$merge$40$3$2e$5$2e$0$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/tailwind-merge@3.5.0/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$tailwind$2d$merge$40$3$2e$5$2e$0$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/ui/src/components/ui/text-flipping-board.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TextFlippingBoard",
    ()=>TextFlippingBoard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.6+bf16f8eded5e12ee/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$framer$2d$motion$40$12$2e$38$2e$0$2b$bf16f8eded5e12ee$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/framer-motion@12.38.0+bf16f8eded5e12ee/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.6+bf16f8eded5e12ee/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
const FLAP_CHARS = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$()-+&=;:'\"%,./?°";
const BOARD_ROWS = 5;
const BOARD_COLS = 16;
const BASE_COL_DELAY = 30;
const BASE_ROW_DELAY = 20;
const BASE_STEP_MS = 55;
const BASE_FLIP_S = 0.35;
const BASE_TOTAL_S = ((BOARD_COLS - 1) * BASE_COL_DELAY + (BOARD_ROWS - 1) * BASE_ROW_DELAY + 8 * BASE_STEP_MS) / 1000;
const ACCENT_COLORS = [
    {
        top: "bg-[#111]",
        bottom: "bg-black",
        text: "text-white"
    },
    {
        top: "bg-[#ecebe5]",
        bottom: "bg-white",
        text: "text-black"
    },
    {
        top: "bg-neutral-300",
        bottom: "bg-neutral-400",
        text: "text-black"
    }
];
const CELL_TEXT_STYLE = {
    fontSize: "clamp(6px, 2vw, 22px)",
    lineHeight: 1
};
// ── Individual Split-Flap Character ───────────────────────────────────
const FlapCell = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].memo(_s(function FlapCell({ target, delay, stepMs, flipDuration }) {
    _s();
    const [current, setCurrent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(" ");
    const [prev, setPrev] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(" ");
    const [flipId, setFlipId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [accent, setAccent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [prevAccent, setPrevAccent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const curRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(" ");
    const tgtRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const accentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const startTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const stepTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FlapCell.FlapCell.useEffect": ()=>{
            if (startTimer.current) clearTimeout(startTimer.current);
            if (stepTimer.current) clearTimeout(stepTimer.current);
            startTimer.current = null;
            stepTimer.current = null;
            const normalized = FLAP_CHARS.includes(target.toUpperCase()) ? target.toUpperCase() : " ";
            if (normalized === tgtRef.current) return;
            tgtRef.current = normalized;
            if (normalized === " " && curRef.current === " ") return;
            const scrambleCount = normalized === " " ? 8 + Math.floor(Math.random() * 8) : 25 + Math.floor(Math.random() * 15);
            const runStep = {
                "FlapCell.FlapCell.useEffect.runStep": (i)=>{
                    const isLast = i === scrambleCount;
                    const ch = isLast ? normalized : FLAP_CHARS[1 + Math.floor(Math.random() * (FLAP_CHARS.length - 1))] ?? " ";
                    const newAccent = isLast ? null : Math.random() < 0.2 ? ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)] ?? null : null;
                    setPrev(curRef.current);
                    setPrevAccent(accentRef.current);
                    curRef.current = ch;
                    accentRef.current = newAccent;
                    setCurrent(ch);
                    setAccent(newAccent);
                    setFlipId({
                        "FlapCell.FlapCell.useEffect.runStep": (n)=>n + 1
                    }["FlapCell.FlapCell.useEffect.runStep"]);
                    if (!isLast) {
                        stepTimer.current = setTimeout({
                            "FlapCell.FlapCell.useEffect.runStep": ()=>runStep(i + 1)
                        }["FlapCell.FlapCell.useEffect.runStep"], stepMs);
                    }
                }
            }["FlapCell.FlapCell.useEffect.runStep"];
            startTimer.current = setTimeout({
                "FlapCell.FlapCell.useEffect": ()=>runStep(1)
            }["FlapCell.FlapCell.useEffect"], delay);
            return ({
                "FlapCell.FlapCell.useEffect": ()=>{
                    if (startTimer.current) clearTimeout(startTimer.current);
                    if (stepTimer.current) clearTimeout(stepTimer.current);
                    startTimer.current = null;
                    stepTimer.current = null;
                    tgtRef.current = null;
                }
            })["FlapCell.FlapCell.useEffect"];
        }
    }["FlapCell.FlapCell.useEffect"], [
        target,
        delay,
        stepMs
    ]);
    const show = current === " " ? "\u00A0" : current;
    const showPrev = prev === " " ? "\u00A0" : prev;
    const textCx = "absolute inset-x-0 flex select-none items-center justify-center font-mono font-bold tracking-wide";
    const topBg = accent?.top ?? "bg-neutral-200/80 dark:bg-neutral-900";
    const bottomBg = accent?.bottom ?? "bg-neutral-200/80 dark:bg-neutral-900";
    const textColor = accent?.text ?? "text-neutral-800 dark:text-white";
    const flapTopBg = prevAccent?.top ?? "bg-neutral-100 dark:bg-neutral-800";
    const flapTextColor = prevAccent?.text ?? "text-neutral-800 dark:text-white";
    const bottomDelay = flipDuration * 0.5;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex aspect-[1/2] flex-col overflow-hidden rounded-[2px] border border-neutral-300 md:rounded-[3px] md:border-2 dark:border-black",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative flex-1 perspective-dramatic transform-3d",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 z-40 hidden flex-row items-center justify-center md:flex",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-1/2 w-px rounded-tr-sm rounded-br-sm bg-neutral-300 dark:bg-black"
                            }, void 0, false, {
                                fileName: "[project]/packages/ui/src/components/ui/text-flipping-board.tsx",
                                lineNumber: 131,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex h-px flex-1 bg-neutral-300 dark:bg-black"
                            }, void 0, false, {
                                fileName: "[project]/packages/ui/src/components/ui/text-flipping-board.tsx",
                                lineNumber: 132,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-1/2 w-px rounded-tl-sm rounded-bl-sm bg-neutral-300 dark:bg-black"
                            }, void 0, false, {
                                fileName: "[project]/packages/ui/src/components/ui/text-flipping-board.tsx",
                                lineNumber: 133,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/ui/src/components/ui/text-flipping-board.tsx",
                        lineNumber: 130,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute inset-x-0 top-0 h-[calc(50%-0.5px)] overflow-hidden rounded-t-[3px]", topBg),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(textCx, textColor, "top-0 h-[200%]"),
                            style: CELL_TEXT_STYLE,
                            children: show
                        }, void 0, false, {
                            fileName: "[project]/packages/ui/src/components/ui/text-flipping-board.tsx",
                            lineNumber: 143,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/ui/src/components/ui/text-flipping-board.tsx",
                        lineNumber: 137,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute inset-x-0 bottom-0 h-[calc(50%-0.5px)] overflow-hidden rounded-b-[3px]", bottomBg),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(textCx, textColor, "bottom-0 h-[200%]"),
                                style: CELL_TEXT_STYLE,
                                children: show
                            }, void 0, false, {
                                fileName: "[project]/packages/ui/src/components/ui/text-flipping-board.tsx",
                                lineNumber: 155,
                                columnNumber: 13
                            }, this),
                            flipId > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$framer$2d$motion$40$12$2e$38$2e$0$2b$bf16f8eded5e12ee$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: "pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.8),transparent_60%)] dark:bg-[linear-gradient(to_bottom,rgba(0,0,0,0.8),transparent_60%)]",
                                initial: {
                                    opacity: 0.5
                                },
                                animate: {
                                    opacity: 0
                                },
                                transition: {
                                    duration: flipDuration * 1.3,
                                    ease: "easeOut"
                                }
                            }, `s${flipId}`, false, {
                                fileName: "[project]/packages/ui/src/components/ui/text-flipping-board.tsx",
                                lineNumber: 159,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/ui/src/components/ui/text-flipping-board.tsx",
                        lineNumber: 149,
                        columnNumber: 11
                    }, this),
                    flipId > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$framer$2d$motion$40$12$2e$38$2e$0$2b$bf16f8eded5e12ee$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute inset-x-0 top-0 z-10 h-[calc(50%-0.5px)] origin-bottom overflow-hidden rounded-t-[3px] backface-hidden transform-3d", flapTopBg),
                        initial: {
                            rotateX: 0
                        },
                        animate: {
                            rotateX: -100
                        },
                        transition: {
                            duration: flipDuration,
                            ease: [
                                0.55,
                                0.055,
                                0.675,
                                0.19
                            ]
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(textCx, flapTextColor, "top-0 h-[200%]"),
                                style: CELL_TEXT_STYLE,
                                children: showPrev
                            }, void 0, false, {
                                fileName: "[project]/packages/ui/src/components/ui/text-flipping-board.tsx",
                                lineNumber: 184,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$framer$2d$motion$40$12$2e$38$2e$0$2b$bf16f8eded5e12ee$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: "pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,1))] dark:bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,1))]",
                                initial: {
                                    opacity: 0
                                },
                                animate: {
                                    opacity: 0.6
                                },
                                transition: {
                                    duration: flipDuration
                                }
                            }, void 0, false, {
                                fileName: "[project]/packages/ui/src/components/ui/text-flipping-board.tsx",
                                lineNumber: 187,
                                columnNumber: 15
                            }, this)
                        ]
                    }, flipId, true, {
                        fileName: "[project]/packages/ui/src/components/ui/text-flipping-board.tsx",
                        lineNumber: 171,
                        columnNumber: 13
                    }, this),
                    flipId > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$framer$2d$motion$40$12$2e$38$2e$0$2b$bf16f8eded5e12ee$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute inset-x-0 bottom-0 z-10 h-[calc(50%-0.5px)] origin-top overflow-hidden rounded-b-[3px] backface-hidden transform-3d", bottomBg),
                        initial: {
                            rotateX: 90
                        },
                        animate: {
                            rotateX: 0
                        },
                        transition: {
                            duration: flipDuration * 0.85,
                            delay: bottomDelay,
                            ease: [
                                0.33,
                                1.55,
                                0.64,
                                1
                            ]
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(textCx, textColor, "bottom-0 h-[200%]"),
                                style: CELL_TEXT_STYLE,
                                children: show
                            }, void 0, false, {
                                fileName: "[project]/packages/ui/src/components/ui/text-flipping-board.tsx",
                                lineNumber: 212,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$framer$2d$motion$40$12$2e$38$2e$0$2b$bf16f8eded5e12ee$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: "pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(255,255,255,0),rgba(255,255,255,0.6))] dark:bg-[linear-gradient(to_top,rgba(0,0,0,0),rgba(0,0,0,0.6))]",
                                initial: {
                                    opacity: 0.4
                                },
                                animate: {
                                    opacity: 0
                                },
                                transition: {
                                    duration: flipDuration * 0.85,
                                    delay: bottomDelay
                                }
                            }, void 0, false, {
                                fileName: "[project]/packages/ui/src/components/ui/text-flipping-board.tsx",
                                lineNumber: 215,
                                columnNumber: 15
                            }, this)
                        ]
                    }, `b${flipId}`, true, {
                        fileName: "[project]/packages/ui/src/components/ui/text-flipping-board.tsx",
                        lineNumber: 198,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pointer-events-none absolute inset-x-0 top-1/2 z-20 h-px -translate-y-[0.5px] bg-neutral-400/50 dark:bg-black/50"
                    }, void 0, false, {
                        fileName: "[project]/packages/ui/src/components/ui/text-flipping-board.tsx",
                        lineNumber: 228,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/ui/src/components/ui/text-flipping-board.tsx",
                lineNumber: 129,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-1 w-full bg-neutral-300 dark:bg-black/50 opacity-20 md:h-2"
            }, void 0, false, {
                fileName: "[project]/packages/ui/src/components/ui/text-flipping-board.tsx",
                lineNumber: 232,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/ui/src/components/ui/text-flipping-board.tsx",
        lineNumber: 127,
        columnNumber: 7
    }, this);
}, "qVMZEMKBVFTcXKBfeeijgwKhNHA="), (prevProps, nextProps)=>prevProps.target === nextProps.target && prevProps.delay === nextProps.delay && prevProps.stepMs === nextProps.stepMs && prevProps.flipDuration === nextProps.flipDuration);
_c = FlapCell;
// ── Color Tile ────────────────────────────────────────────────────────
const COLOR_MAP = {
    "{R}": "#D32F2F",
    "{O}": "#F57C00",
    "{Y}": "#FBC02D",
    "{G}": "#43A047",
    "{B}": "#1E88E5",
    "{V}": "#8E24AA",
    "{W}": "#FAFAFA"
};
const ColorCell = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].memo(function ColorCell({ color }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "aspect-[3/5] rounded-[3px] border-2 border-neutral-300 dark:border-black",
        style: {
            backgroundColor: color
        }
    }, void 0, false, {
        fileName: "[project]/packages/ui/src/components/ui/text-flipping-board.tsx",
        lineNumber: 257,
        columnNumber: 5
    }, this);
});
_c1 = ColorCell;
function parseRow(row) {
    const cells = [];
    let i = 0;
    while(i < row.length){
        if (row[i] === "{" && i + 2 < row.length && row[i + 2] === "}") {
            const code = row.substring(i, i + 3);
            if (COLOR_MAP[code]) {
                cells.push({
                    type: "color",
                    hex: COLOR_MAP[code]
                });
                i += 3;
                continue;
            }
        }
        cells.push({
            type: "char",
            value: row[i] ?? " "
        });
        i++;
    }
    return cells;
}
// ── Word Wrap ─────────────────────────────────────────────────────────
function wrapParagraph(paragraph, maxCols) {
    const lines = [];
    const words = paragraph.split(/[ \t]+/).filter(Boolean);
    let currentLine = "";
    for (const word of words){
        if (word.length > maxCols) {
            if (currentLine) {
                lines.push(currentLine);
                currentLine = "";
            }
            lines.push(word.slice(0, maxCols));
            continue;
        }
        if (!currentLine) {
            currentLine = word;
        } else if (currentLine.length + 1 + word.length <= maxCols) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
}
function wrapText(input, maxCols) {
    return input.split("\n").flatMap((paragraph)=>paragraph.trim() === "" ? [
            ""
        ] : wrapParagraph(paragraph, maxCols));
}
function TextFlippingBoard({ rows, text, className, duration = BASE_TOTAL_S }) {
    _s1();
    const scale = duration / BASE_TOTAL_S;
    const colDelay = BASE_COL_DELAY * scale;
    const rowDelay = BASE_ROW_DELAY * scale;
    const stepMs = BASE_STEP_MS * scale;
    const flipDur = Math.min(0.6, Math.max(0.15, BASE_FLIP_S * scale));
    const board = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TextFlippingBoard.useMemo[board]": ()=>{
            const grid = Array.from({
                length: BOARD_ROWS
            }, {
                "TextFlippingBoard.useMemo[board].grid": ()=>Array.from({
                        length: BOARD_COLS
                    }, {
                        "TextFlippingBoard.useMemo[board].grid": ()=>({
                                type: "char",
                                value: " "
                            })
                    }["TextFlippingBoard.useMemo[board].grid"])
            }["TextFlippingBoard.useMemo[board].grid"]);
            if (text) {
                const lines = wrapText(text, BOARD_COLS).slice(0, BOARD_ROWS);
                const startRow = Math.max(0, Math.floor((BOARD_ROWS - lines.length) / 2));
                lines.forEach({
                    "TextFlippingBoard.useMemo[board]": (line, i)=>{
                        const row = startRow + i;
                        if (row >= BOARD_ROWS) return;
                        const parsed = parseRow(line);
                        const startCol = Math.max(0, Math.floor((BOARD_COLS - parsed.length) / 2));
                        parsed.forEach({
                            "TextFlippingBoard.useMemo[board]": (cell, c)=>{
                                if (startCol + c < BOARD_COLS) {
                                    const targetRow = grid[row];
                                    if (targetRow) targetRow[startCol + c] = cell;
                                }
                            }
                        }["TextFlippingBoard.useMemo[board]"]);
                    }
                }["TextFlippingBoard.useMemo[board]"]);
            } else if (rows) {
                rows.forEach({
                    "TextFlippingBoard.useMemo[board]": (row, r)=>{
                        if (r >= BOARD_ROWS) return;
                        const parsed = parseRow(row);
                        parsed.forEach({
                            "TextFlippingBoard.useMemo[board]": (cell, c)=>{
                                if (c < BOARD_COLS) {
                                    const targetRow = grid[r];
                                    if (targetRow) targetRow[c] = cell;
                                }
                            }
                        }["TextFlippingBoard.useMemo[board]"]);
                    }
                }["TextFlippingBoard.useMemo[board]"]);
            }
            return grid;
        }
    }["TextFlippingBoard.useMemo[board]"], [
        rows,
        text
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative mx-auto w-full max-w-3xl rounded-xl bg-neutral-100 p-2 shadow-xl md:rounded-2xl md:p-4 dark:bg-neutral-900 dark:shadow-[0_20px_70px_-15px_rgba(0,0,0,0.6)]", className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid gap-px md:gap-[3px]",
            style: {
                gridTemplateColumns: `repeat(${BOARD_COLS}, 1fr)`
            },
            children: board.map((row, r)=>row.map((cell, c)=>cell.type === "color" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ColorCell, {
                        color: cell.hex
                    }, `${r}-${c}`, false, {
                        fileName: "[project]/packages/ui/src/components/ui/text-flipping-board.tsx",
                        lineNumber: 398,
                        columnNumber: 15
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FlapCell, {
                        target: cell.value,
                        delay: c * colDelay + r * rowDelay,
                        stepMs: stepMs,
                        flipDuration: flipDur
                    }, `${r}-${c}`, false, {
                        fileName: "[project]/packages/ui/src/components/ui/text-flipping-board.tsx",
                        lineNumber: 400,
                        columnNumber: 15
                    }, this)))
        }, void 0, false, {
            fileName: "[project]/packages/ui/src/components/ui/text-flipping-board.tsx",
            lineNumber: 391,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/ui/src/components/ui/text-flipping-board.tsx",
        lineNumber: 385,
        columnNumber: 5
    }, this);
}
_s1(TextFlippingBoard, "DjA+Py5MNWoFEaTMK2jwdkWQfvg=");
_c2 = TextFlippingBoard;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "FlapCell");
__turbopack_context__.k.register(_c1, "ColorCell");
__turbopack_context__.k.register(_c2, "TextFlippingBoard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/components/text-flipping-board-demo.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TextFlippingBoardDemo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.6+bf16f8eded5e12ee/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$text$2d$flipping$2d$board$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/ui/src/components/ui/text-flipping-board.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.6+bf16f8eded5e12ee/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const MESSAGES = [
    "GENERATE \nSHORT \nSTRINGS",
    "POWERED BY \nCMUDICT \nMARKOV CHAINS",
    "VALIDATED \nBY \nWORDNET",
    "THE ALGORITHM \nBEHIND \nNON-WORDS"
];
function TextFlippingBoardDemo() {
    _s();
    const [msgIdx, setMsgIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const next = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TextFlippingBoardDemo.useCallback[next]": ()=>setMsgIdx({
                "TextFlippingBoardDemo.useCallback[next]": (i)=>(i + 1) % MESSAGES.length
            }["TextFlippingBoardDemo.useCallback[next]"])
    }["TextFlippingBoardDemo.useCallback[next]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TextFlippingBoardDemo.useEffect": ()=>{
            const id = setInterval(next, 6000);
            return ({
                "TextFlippingBoardDemo.useEffect": ()=>clearInterval(id)
            })["TextFlippingBoardDemo.useEffect"];
        }
    }["TextFlippingBoardDemo.useEffect"], [
        next
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex w-full flex-col items-center justify-center shrink-0 max-w-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$ui$2f$src$2f$components$2f$ui$2f$text$2d$flipping$2d$board$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextFlippingBoard"], {
            text: MESSAGES[msgIdx],
            className: "scale-90 lg:scale-100"
        }, void 0, false, {
            fileName: "[project]/apps/web/components/text-flipping-board-demo.tsx",
            lineNumber: 24,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/components/text-flipping-board-demo.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_s(TextFlippingBoardDemo, "9s2Z6EOQ8nH9Nj0u1BmPQtXuOj4=");
_c = TextFlippingBoardDemo;
var _c;
__turbopack_context__.k.register(_c, "TextFlippingBoardDemo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/components/vanta-background.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VantaBackground
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.6+bf16f8eded5e12ee/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.6+bf16f8eded5e12ee/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$three$40$0$2e$183$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/three@0.183.2/node_modules/three/build/three.module.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function VantaBackground() {
    _s();
    const [vantaEffect, setVantaEffect] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const myRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VantaBackground.useEffect": ()=>{
            // Vanta expects THREE to be attached to the window
            if ("TURBOPACK compile-time truthy", 1) {
                ;
                window.THREE = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$three$40$0$2e$183$2e$2$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__;
            }
            if (!vantaEffect && myRef.current) {
                // @ts-ignore
                __turbopack_context__.A("[project]/node_modules/.bun/vanta@0.5.24/node_modules/vanta/dist/vanta.fog.min.js [app-client] (ecmascript, async loader)").then({
                    "VantaBackground.useEffect": (FOGModule)=>{
                        const FOG = FOGModule.default || FOGModule;
                        try {
                            setVantaEffect(FOG({
                                el: myRef.current,
                                mouseControls: true,
                                touchControls: true,
                                gyroControls: false,
                                minHeight: 200.0,
                                minWidth: 200.0,
                                highlightColor: 0xffc300,
                                midtoneColor: 0xff1f00,
                                lowlightColor: 0x2d00ff,
                                baseColor: 0xffebeb,
                                blurFactor: 0.6,
                                zoom: 1.0,
                                speed: 1.0
                            }));
                        } catch (err) {
                            console.error("[VantaBackground] Failed to init Vanta:", err);
                        }
                    }
                }["VantaBackground.useEffect"]);
            }
            return ({
                "VantaBackground.useEffect": ()=>{
                    if (vantaEffect) vantaEffect.destroy();
                }
            })["VantaBackground.useEffect"];
        }
    }["VantaBackground.useEffect"], [
        vantaEffect
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: myRef,
        className: "absolute inset-0 w-full h-full -z-10 bg-[#ecebe5]"
    }, void 0, false, {
        fileName: "[project]/apps/web/components/vanta-background.tsx",
        lineNumber: 48,
        columnNumber: 10
    }, this);
}
_s(VantaBackground, "mxmCMykF/Tg205yTtRwanxjWhPA=");
_c = VantaBackground;
var _c;
__turbopack_context__.k.register(_c, "VantaBackground");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_31497b56._.js.map