"use client"
import { TextFlippingBoard } from "@workspace/ui/components/ui/text-flipping-board"
import React, { useState, useEffect, useCallback } from "react"

const MESSAGES: string[] = [
  "GENERATE \nSHORT \nSTRINGS",
  "POWERED BY \nCMUDICT \nMARKOV CHAINS",
  "VALIDATED \nBY \nWORDNET",
  "THE ALGORITHM \nBEHIND \nNON-WORDS",
]

export default function TextFlippingBoardDemo() {
  const [msgIdx, setMsgIdx] = useState(0)

  const next = useCallback(() => setMsgIdx((i) => (i + 1) % MESSAGES.length), [])

  useEffect(() => {
    const id = setInterval(next, 6000)
    return () => clearInterval(id)
  }, [next])

  return (
    <div className="flex w-full flex-col items-center justify-center shrink-0 max-w-full">
      <TextFlippingBoard text={MESSAGES[msgIdx]} className="scale-90 lg:scale-100" />
    </div>
  )
}
