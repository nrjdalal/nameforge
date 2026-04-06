module.exports = [
"[project]/apps/web/app/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"784a28ac3b0c2afcbcd819e9f2c7358fe4f1f3c67b":"generateNamesAction"},"",""] */ __turbopack_context__.s([
    "generateNamesAction",
    ()=>generateNamesAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.6+bf16f8eded5e12ee/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$bin$2f$name$2d$generator$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/bin/name-generator.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$bin$2f$wordnet$2d$definitions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/bin/wordnet-definitions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.bun/next@16.1.6+bf16f8eded5e12ee/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function generateNamesAction(targetLength, prefix, suffix, contains) {
    try {
        const plan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$bin$2f$name$2d$generator$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createGenerationPlan"])(targetLength, prefix, suffix, contains);
        if (plan.count === 0) {
            return {
                count: 0,
                results: []
            };
        }
        // Limit the results to 500 to prevent payload too large issues
        const MAX_RESULTS = 500;
        const results = [];
        let fetched = 0;
        for (const name of plan.names){
            const meaning = __TURBOPACK__imported__module__$5b$project$5d2f$bin$2f$wordnet$2d$definitions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["WORDNET_DEFINITIONS"].get(name) ?? "";
            results.push({
                name,
                meaning
            });
            fetched++;
            if (fetched >= MAX_RESULTS) break;
        }
        return {
            count: plan.count,
            results
        };
    } catch (error) {
        console.error("Error generating names:", error);
        return {
            count: 0,
            results: []
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    generateNamesAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$bun$2f$next$40$16$2e$1$2e$6$2b$bf16f8eded5e12ee$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(generateNamesAction, "784a28ac3b0c2afcbcd819e9f2c7358fe4f1f3c67b", null);
}),
"[project]/apps/web/.next-internal/server/app/try/page/actions.js { ACTIONS_MODULE0 => \"[project]/apps/web/app/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/app/actions.ts [app-rsc] (ecmascript)");
;
}),
"[project]/apps/web/.next-internal/server/app/try/page/actions.js { ACTIONS_MODULE0 => \"[project]/apps/web/app/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "784a28ac3b0c2afcbcd819e9f2c7358fe4f1f3c67b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateNamesAction"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f2e$next$2d$internal$2f$server$2f$app$2f$try$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$apps$2f$web$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/apps/web/.next-internal/server/app/try/page/actions.js { ACTIONS_MODULE0 => "[project]/apps/web/app/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/app/actions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=apps_web_72b44e63._.js.map