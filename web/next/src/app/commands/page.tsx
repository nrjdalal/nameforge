"use client"

import { ArrowLeft, Copy, Check } from "lucide-react"
import Link from "next/link"
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

export default function CommandsPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleCopy = (cmd: string, index: number) => {
    navigator.clipboard.writeText(cmd)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#ecebe5] p-4 text-[#1a1a1a] selection:bg-[#1a1a1a] selection:text-[#ecebe5]">
      <main className="relative z-10 flex min-h-[95vh] w-full max-w-4xl flex-col overflow-hidden border border-[#1a1a1a] bg-white shadow-2xl md:min-h-0">
        <header className="flex shrink-0 items-center justify-between border-b border-[#1a1a1a] p-6 lg:p-8">
          <h1 className="font-serif text-3xl font-bold tracking-tighter uppercase">CLI Commands</h1>
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-xs uppercase opacity-60 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Return
          </Link>
        </header>

        <div className="flex h-full flex-col gap-6 bg-[#f8f7f2] p-6 lg:p-8">
          <p className="font-sans text-sm opacity-70">
            Use these commands in your terminal or the CLI tab in the Studio.
          </p>

          <div className="flex flex-col gap-4">
            {commands.map((c, i) => (
              <div
                key={i}
                className="flex flex-col justify-between gap-4 border border-[#1a1a1a] bg-white p-4 sm:flex-row sm:items-center"
              >
                <div className="flex flex-col gap-1">
                  <code className="self-start bg-[#1a1a1a] px-3 py-1 font-mono text-sm font-bold text-green-400">
                    {c.cmd}
                  </code>
                  <span className="font-sans text-xs tracking-widest uppercase opacity-60">
                    {c.desc}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(c.cmd, i)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#1a1a1a] bg-white p-2 text-[#1a1a1a] transition-colors hover:bg-[#1a1a1a] hover:text-[#ecebe5] sm:w-auto sm:px-4"
                >
                  {copiedIndex === i ? (
                    <span className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />{" "}
                      <span className="hidden font-mono text-xs uppercase sm:inline">Copied</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Copy className="h-4 w-4" />{" "}
                      <span className="hidden font-mono text-xs uppercase sm:inline">Copy</span>
                    </span>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
