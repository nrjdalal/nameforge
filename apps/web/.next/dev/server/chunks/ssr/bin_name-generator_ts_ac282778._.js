module.exports = [
"[project]/bin/name-generator.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createGenerationPlan",
    ()=>createGenerationPlan
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$bin$2f$cmudict$2d$model$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/bin/cmudict-model.ts [app-rsc] (ecmascript)");
;
const startContext = "^".repeat(__TURBOPACK__imported__module__$5b$project$5d2f$bin$2f$cmudict$2d$model$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CMUDICT_CONTEXT_SIZE"]);
const listNextCharacters = (context)=>(__TURBOPACK__imported__module__$5b$project$5d2f$bin$2f$cmudict$2d$model$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CMUDICT_TRANSITIONS"].get(context) ?? "").replaceAll("$", "");
const canEnd = (context)=>(__TURBOPACK__imported__module__$5b$project$5d2f$bin$2f$cmudict$2d$model$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CMUDICT_TRANSITIONS"].get(context) ?? "").includes("$");
const advanceContext = (context, character)=>`${context}${character}`.slice(-__TURBOPACK__imported__module__$5b$project$5d2f$bin$2f$cmudict$2d$model$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CMUDICT_CONTEXT_SIZE"]);
const buildFailureTable = (pattern)=>{
    if (!pattern) {
        return [];
    }
    const failureTable = Array.from({
        length: pattern.length
    }, ()=>0);
    for(let index = 1; index < pattern.length; index += 1){
        let candidateLength = failureTable[index - 1] ?? 0;
        while(candidateLength > 0 && pattern[index] !== pattern[candidateLength]){
            candidateLength = failureTable[candidateLength - 1] ?? 0;
        }
        if (pattern[index] === pattern[candidateLength]) {
            candidateLength += 1;
        }
        failureTable[index] = candidateLength;
    }
    return failureTable;
};
const advancePatternState = (pattern, failureTable, currentState, character)=>{
    if (!pattern) {
        return 0;
    }
    let nextState = currentState;
    while(nextState > 0 && character !== pattern[nextState]){
        nextState = failureTable[nextState - 1] ?? 0;
    }
    if (character === pattern[nextState]) {
        nextState += 1;
    }
    return nextState;
};
const suffixMatches = (suffix, suffixState)=>!suffix || suffixState === suffix.length;
const containsMatches = (contains, containsMatched)=>!contains || containsMatched;
const advanceContainsProgress = (contains, failureTable, containsMatched, containsState, character)=>{
    if (!contains || containsMatched) {
        return {
            matched: containsMatched || !contains,
            state: 0
        };
    }
    const nextState = advancePatternState(contains, failureTable, containsState, character);
    return nextState === contains.length ? {
        matched: true,
        state: 0
    } : {
        matched: false,
        state: nextState
    };
};
const validatePrefix = (prefix, suffix, suffixFailureTable, contains, containsFailureTable)=>{
    let context = startContext;
    let containsMatched = contains.length === 0;
    let containsState = 0;
    let suffixState = 0;
    for (const character of prefix){
        if (!listNextCharacters(context).includes(character)) {
            return {
                containsMatched: false,
                containsState: 0,
                context: "",
                suffixState: 0,
                valid: false
            };
        }
        context = advanceContext(context, character);
        suffixState = advancePatternState(suffix, suffixFailureTable, suffixState, character);
        const nextContainsProgress = advanceContainsProgress(contains, containsFailureTable, containsMatched, containsState, character);
        containsMatched = nextContainsProgress.matched;
        containsState = nextContainsProgress.state;
    }
    return {
        containsMatched,
        containsState,
        context,
        suffixState,
        valid: true
    };
};
const emptyNames = function*() {};
const createGenerationPlan = (targetLength, prefix, suffix, contains)=>{
    const suffixFailureTable = buildFailureTable(suffix);
    const containsFailureTable = buildFailureTable(contains);
    const prefixValidation = validatePrefix(prefix, suffix, suffixFailureTable, contains, containsFailureTable);
    const countMemo = new Map();
    const countCompletions = (remainingLength, context, suffixState, containsState, containsMatched)=>{
        const cacheKey = `${remainingLength}:${context}:${suffixState}:${containsState}:${containsMatched ? 1 : 0}`;
        const cachedCount = countMemo.get(cacheKey);
        if (cachedCount !== undefined) {
            return cachedCount;
        }
        let completionCount = 0;
        if (remainingLength === 0) {
            completionCount = canEnd(context) && suffixMatches(suffix, suffixState) && containsMatches(contains, containsMatched) ? 1 : 0;
            countMemo.set(cacheKey, completionCount);
            return completionCount;
        }
        for (const character of listNextCharacters(context)){
            const nextContainsProgress = advanceContainsProgress(contains, containsFailureTable, containsMatched, containsState, character);
            completionCount += countCompletions(remainingLength - 1, advanceContext(context, character), advancePatternState(suffix, suffixFailureTable, suffixState, character), nextContainsProgress.state, nextContainsProgress.matched);
        }
        countMemo.set(cacheKey, completionCount);
        return completionCount;
    };
    function* generateNames(remainingLength, context, currentName, suffixState, containsState, containsMatched) {
        if (remainingLength === 0) {
            if (canEnd(context) && suffixMatches(suffix, suffixState) && containsMatches(contains, containsMatched)) {
                yield currentName;
            }
            return;
        }
        for (const character of listNextCharacters(context)){
            const nextContext = advanceContext(context, character);
            const nextSuffixState = advancePatternState(suffix, suffixFailureTable, suffixState, character);
            const nextContainsProgress = advanceContainsProgress(contains, containsFailureTable, containsMatched, containsState, character);
            if (!countCompletions(remainingLength - 1, nextContext, nextSuffixState, nextContainsProgress.state, nextContainsProgress.matched)) {
                continue;
            }
            yield* generateNames(remainingLength - 1, nextContext, currentName + character, nextSuffixState, nextContainsProgress.state, nextContainsProgress.matched);
        }
    }
    const count = prefixValidation.valid ? countCompletions(targetLength - prefix.length, prefixValidation.context, prefixValidation.suffixState, prefixValidation.containsState, prefixValidation.containsMatched) : 0;
    return {
        count,
        names: count === 0 ? emptyNames() : generateNames(targetLength - prefix.length, prefixValidation.context, prefix, prefixValidation.suffixState, prefixValidation.containsState, prefixValidation.containsMatched)
    };
};
}),
];

//# sourceMappingURL=bin_name-generator_ts_ac282778._.js.map