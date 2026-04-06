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
    const plan = createGenerationPlan(targetLength, prefix, suffix, contains)

    if (plan.count === 0) {
      return { count: 0, results: [] }
    }

    // Limit the results to 500 to prevent payload too large issues
    const MAX_RESULTS = 500
    const results = []
    let fetched = 0

    for (const name of plan.names) {
      const meaning = WORDNET_DEFINITIONS.get(name) ?? ""
      results.push({ name, meaning })
      fetched++
      if (fetched >= MAX_RESULTS) break
    }

    return { count: plan.count, results }
  } catch (error) {
    console.error("Error generating names:", error)
    return { count: 0, results: [] }
  }
}
