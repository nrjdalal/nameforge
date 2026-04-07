"use client"

import { ArrowLeft, Copy, Check } from "lucide-react"
import { motion } from "motion/react"
import { useState } from "react"

const commands = [
  {
    cmd: "wordloom",
    desc: "Generate names with default length (5)",
  },
  {
    cmd: "wordloom --prefix no",
    desc: "Generate names starting with 'no'",
  },
  {
    cmd: "wordloom --suffix ut",
    desc: "Generate names ending with 'ut'",
  },
  {
    cmd: "wordloom --contains abs",
    desc: "Generate names containing 'abs'",
  },
  {
    cmd: "wordloom --length 6 --prefix absent",
    desc: "Generate 6-letter names starting with 'absent'",
  },
]

export function CLIDocs({ onBack }: { onBack: () => void }) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleCopy = (cmd: string, index: number) => {
    navigator.clipboard.writeText(cmd)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <motion.div
      layoutId="docs-card"
      className="w-full h-full flex flex-col relative z-20 overflow-hidden"
      transition={{ type: "spring", stiffness: 120, damping: 24 }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="flex flex-col h-full"
      >
        <header className="border-b border-[#1a1a1a] p-6 lg:p-8 flex justify-between items-center shrink-0">
          <motion.h1
            layoutId="docs-title"
            className="font-serif text-3xl font-bold uppercase tracking-tighter"
          >
            CLI Commands
          </motion.h1>
          <button
            onClick={onBack}
            className="font-mono text-xs uppercase hover:underline opacity-60 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Return
          </button>
        </header>

        <div className="p-6 lg:p-8 flex-1 flex flex-col gap-6 bg-[#f8f7f2] overflow-y-auto">
          <p className="font-sans text-sm opacity-70">
            Use these commands in your terminal or the CLI tab in the Studio.
          </p>

          <div className="flex flex-col gap-4">
            {commands.map((c, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center justify-between border border-[#1a1a1a] bg-white p-4 gap-4"
              >
                <div className="flex flex-col gap-1">
                  <code className="font-mono text-sm font-bold bg-[#1a1a1a] text-green-400 px-3 py-1 self-start">
                    {c.cmd}
                  </code>
                  <span className="font-sans text-xs opacity-60 uppercase tracking-widest">
                    {c.desc}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(c.cmd, i)}
                  className="flex items-center justify-center border border-[#1a1a1a] bg-white hover:bg-[#1a1a1a] hover:text-[#ecebe5] text-[#1a1a1a] transition-colors p-2 shrink-0 h-10 w-10 sm:w-auto sm:px-4"
                >
                  {copiedIndex === i ? (
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />{" "}
                      <span className="hidden sm:inline text-xs font-mono uppercase">Copied</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Copy className="w-4 h-4" />{" "}
                      <span className="hidden sm:inline text-xs font-mono uppercase">Copy</span>
                    </span>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
