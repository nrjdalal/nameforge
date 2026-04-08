"use server"

import { createGenerationPlan } from "../../../bin/name-generator"
import { WORDNET_DEFINITIONS } from "../../../bin/wordnet-definitions"

export async function generateNamesAction(
  targetLength: number,
  prefix: string,
  suffix: string,
  contains: string,
  skip = 0,
  limit = 500,
) {
  try {
    const mainPlan = createGenerationPlan(targetLength, prefix, suffix, contains)

    if (mainPlan.count === 0) {
      return { count: 0, results: [] }
    }

    const results: { name: string; meaning: string }[] = []
    let skipped = 0
    let fetched = 0

    for (const name of mainPlan.names) {
      if (skipped < skip) {
        skipped++
        continue
      }

      const meaning = WORDNET_DEFINITIONS.get(name) ?? ""
      results.push({ name, meaning })
      fetched++

      if (fetched >= limit) break
    }

    return { count: mainPlan.count, results }
  } catch (error) {
    console.error("Error generating names:", error)
    return { count: 0, results: [] }
  }
}
