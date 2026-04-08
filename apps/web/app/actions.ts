"use server"

import { createGenerationPlan } from "../../../bin/name-generator"
import { WORDNET_DEFINITIONS } from "../../../bin/wordnet-definitions"

export async function generateNamesAction(
  targetLength: number,
  prefix: string,
  suffix: string,
  contains: string,
) {
  try {
    const mainPlan = createGenerationPlan(targetLength, prefix, suffix, contains)

    if (mainPlan.count === 0) {
      return { count: 0, results: [] }
    }

    const MAX_RESULTS = 500
    const results: { name: string; meaning: string }[] = []

    if (prefix === "") {
      // Broad sampling across the alphabet
      const letters = "abcdefghijklmnopqrstuvwxyz".split("")
      const quotaPerLetter = Math.ceil(MAX_RESULTS / 26)

      for (const char of letters) {
        const letterPlan = createGenerationPlan(targetLength, char, suffix, contains)
        if (letterPlan.count === 0) continue

        let fetchedForLetter = 0
        for (const name of letterPlan.names) {
          const meaning = WORDNET_DEFINITIONS.get(name) ?? ""
          results.push({ name, meaning })
          fetchedForLetter++
          if (fetchedForLetter >= quotaPerLetter) break
        }
        if (results.length >= MAX_RESULTS) break
      }
    } else {
      // Standard deep search for specific prefix
      let fetched = 0
      for (const name of mainPlan.names) {
        const meaning = WORDNET_DEFINITIONS.get(name) ?? ""
        results.push({ name, meaning })
        fetched++
        if (fetched >= MAX_RESULTS) break
      }
    }

    return { count: mainPlan.count, results }
  } catch (error) {
    console.error("Error generating names:", error)
    return { count: 0, results: [] }
  }
}
