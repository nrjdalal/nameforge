"use client"

import { ArrowLeft, Bookmark, BookmarkCheck, Copy, LayoutDashboard, Terminal } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import Link from "next/link"
import { useState, useTransition, useEffect, useRef, memo, useCallback } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

import { generateNamesAction, getLetterOffsetsAction } from "../actions"

function parseCliCommand(cmd: string) {
  const args = cmd.trim().split(/\s+/)
  let parsedLength = 5
  let parsedPrefix = ""
  let parsedSuffix = ""
  let parsedContains = ""

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if ((arg === "-l" || arg === "--length") && i + 1 < args.length) {
      parsedLength = parseInt(args[++i] ?? "", 10) || 5
    } else if ((arg === "-p" || arg === "--prefix") && i + 1 < args.length) {
      parsedPrefix = args[++i] ?? ""
    } else if ((arg === "-s" || arg === "--suffix") && i + 1 < args.length) {
      parsedSuffix = args[++i] ?? ""
    } else if ((arg === "-c" || arg === "--contains") && i + 1 < args.length) {
      parsedContains = args[++i] ?? ""
    }
  }

  return { parsedLength, parsedPrefix, parsedSuffix, parsedContains }
}

const TryResultCard = memo(function TryResultCard({
  item,
  isSaved,
  onToggleBookmark,
  onCopy,
}: {
  item: { name: string; meaning: string }
  isSaved: boolean
  onToggleBookmark: (item: { name: string; meaning: string }) => void
  onCopy: (text: string) => void
}) {
  return (
    <div
      style={{ contentVisibility: "auto", containIntrinsicSize: "0 160px" } as any}
      className="group relative flex h-[160px] cursor-default flex-col border border-[#1a1a1a] p-4 transition-colors hover:bg-[#1a1a1a] hover:text-white"
    >
      <button
        onClick={() => onToggleBookmark(item)}
        className="absolute top-4 right-4 text-[#1a1a1a] transition-transform group-hover:text-white hover:scale-110"
        title={isSaved ? "Remove Bookmark" : "Save Bookmark"}
      >
        {isSaved ? (
          <BookmarkCheck className="h-5 w-5 fill-current" />
        ) : (
          <Bookmark className="h-5 w-5" />
        )}
      </button>

      <button
        onClick={() => onCopy(item.name)}
        className="absolute top-4 right-12 text-[#1a1a1a] transition-transform group-hover:text-white hover:scale-110"
        title="Copy to Clipboard"
      >
        <Copy className="h-4 w-4" />
      </button>

      <div className="mb-2 flex flex-col pr-20">
        <span
          className="text-xl font-bold tracking-widest lowercase"
          style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
        >
          {item.name}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="line-clamp-3 pr-8 font-sans text-xs leading-relaxed opacity-70 group-hover:opacity-100">
          {item.meaning}
        </div>
        <div className="flex h-4 items-center gap-2">
          {item.meaning && (
            <span className="pointer-events-none bg-[#1a1a1a] px-1 py-0.5 font-mono text-[8px] text-[#ecebe5] uppercase group-hover:bg-[#ecebe5] group-hover:text-[#1a1a1a]">
              Def
            </span>
          )}
          <span className="font-mono text-[8px] uppercase opacity-40 group-hover:opacity-60">
            {item.name.length} chars
          </span>
        </div>
      </div>
    </div>
  )
})

export default function TryPage() {
  const [mode, setMode] = useState<"ui" | "cli" | "bookmarks">("ui")
  const [cliCommand, setCliCommand] = useState("wordloom -l 5")

  const [length, setLength] = useState([5])
  const [prefix, setPrefix] = useState("")
  const [suffix, setSuffix] = useState("")
  const [contains, setContains] = useState("")

  const [isPending, startTransition] = useTransition()
  const [results, setResults] = useState<{ name: string; meaning: string }[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [skip, setSkip] = useState(0)
  const [hasMore, setHasMore] = useState(false)

  // Bookmarks State
  const [bookmarks, setBookmarks] = useState<{ name: string; meaning: string }[]>([])
  const [hasMounted, setHasMounted] = useState(false)
  const [bookmarkSort, setBookmarkSort] = useState<"latest" | "alpha">("latest")

  const [letterOffsets, setLetterOffsets] = useState<Record<string, number>>({})
  const [activeLetter, setActiveLetter] = useState<string>("a")
  const [hasSearched, setHasSearched] = useState(false)
  const [pendingLetter, setPendingLetter] = useState<string | null>(null)

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const resultsCache = useRef<
    Record<
      number,
      { results: { name: string; meaning: string }[]; hasMore: boolean; totalCount: number }
    >
  >({})

  useEffect(() => {
    setHasMounted(true)
    const saved = localStorage.getItem("wordloom_bookmarks")
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to parse bookmarks", e)
      }
    }
  }, [])

  const toggleBookmark = useCallback((item: { name: string; meaning: string }) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.name === item.name)
      const updated = exists ? prev.filter((b) => b.name !== item.name) : [...prev, item]
      localStorage.setItem("wordloom_bookmarks", JSON.stringify(updated))
      return updated
    })
  }, [])

  // ScrollSpy for A-Z Navigation
  useEffect(() => {
    if (mode === "bookmarks" || results.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleLetters = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target.getAttribute("data-letter") || "")

        if (visibleLetters.length > 0 && visibleLetters[0]) {
          // Set to the first visible letter in the viewport
          setActiveLetter(visibleLetters[0].toLowerCase())
        }
      },
      { threshold: 0.1, rootMargin: "-10% 0px -80% 0px" },
    )

    const sections = document.querySelectorAll("[data-letter]")
    sections.forEach((s) => observer.observe(s))

    return () => observer.disconnect()
  }, [results, mode])

  const handleCopy = useCallback((text: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`Copied "${text}" to clipboard`, {
      description: "You can now paste it anywhere.",
    })
  }, [])

  const handleGenerate = () => {
    setResults([])
    setSkip(0)
    setTotalCount(0)
    setHasMore(false)
    setHasSearched(true)
    setLetterOffsets({})
    resultsCache.current = {}

    startTransition(async () => {
      let finalLength = length[0] ?? 5
      let finalPrefix = prefix
      let finalSuffix = suffix
      let finalContains = contains

      if (mode === "cli") {
        const parsed = parseCliCommand(cliCommand)
        finalLength = parsed.parsedLength
        finalPrefix = parsed.parsedPrefix
        finalSuffix = parsed.parsedSuffix
        finalContains = parsed.parsedContains
      }

      // Pre-calculate alphabetical offsets for A-Z Jumping
      const offsets = await getLetterOffsetsAction(
        finalLength,
        finalPrefix.toLowerCase(),
        finalSuffix.toLowerCase(),
        finalContains.toLowerCase(),
      )
      setLetterOffsets(offsets)

      const res = await generateNamesAction(
        finalLength,
        finalPrefix.toLowerCase(),
        finalSuffix.toLowerCase(),
        finalContains.toLowerCase(),
        0,
        500,
      )

      setResults(res.results)
      setTotalCount(res.count)
      setSkip(res.results.length)
      setHasMore(res.results.length < res.count)

      // Cache the first page
      resultsCache.current[0] = {
        results: res.results,
        hasMore: res.results.length < res.count,
        totalCount: res.count,
      }

      if (res.results.length > 0 && res.results[0]) {
        setActiveLetter(res.results[0].name[0]?.toLowerCase() || "a")
      }

      if (mode === "bookmarks") setMode("ui")
    })
  }

  const scrollToLetterSection = (letter: string) => {
    requestAnimationFrame(() => {
      const container = scrollContainerRef.current
      if (!container) return

      const element = container.querySelector(
        `[data-letter="${letter.toLowerCase()}"]`,
      ) as HTMLElement
      if (element) {
        // Calculate offset relative to the container
        const targetScroll = element.offsetTop
        container.scrollTop = targetScroll
      }
    })
  }

  const jumpToLetter = (letter: string) => {
    const offset = letterOffsets[letter]
    if (offset === undefined || offset === -1) return

    // 1. Check if already in current results (DOM check)
    scrollToLetterSection(letter)
    setActiveLetter(letter)

    // 2. Check Cache
    const cached = resultsCache.current[offset]
    if (cached) {
      setResults((prev) => {
        const map = new Map(prev.map((i) => [i.name, i]))
        cached.results.forEach((i) => map.set(i.name, i))
        return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name))
      })
      setSkip(offset + cached.results.length)
      setHasMore(cached.hasMore)
      setTotalCount(cached.totalCount)
      setActiveLetter(letter)
      setPendingLetter(null)
      scrollToLetterSection(letter)
      return
    }

    // 3. Fetch (Cache Miss)
    setSkip(offset)
    setHasMore(true)
    setActiveLetter(letter)
    setPendingLetter(letter.toLowerCase())

    startTransition(async () => {
      let finalLength = length[0] ?? 5
      let finalPrefix = prefix
      let finalSuffix = suffix
      let finalContains = contains

      if (mode === "cli") {
        const parsed = parseCliCommand(cliCommand)
        finalLength = parsed.parsedLength
        finalPrefix = parsed.parsedPrefix
        finalSuffix = parsed.parsedSuffix
        finalContains = parsed.parsedContains
      }

      const res = await generateNamesAction(
        finalLength,
        finalPrefix.toLowerCase(),
        finalSuffix.toLowerCase(),
        finalContains.toLowerCase(),
        offset,
        500,
      )

      setResults((prev) => {
        const map = new Map(prev.map((i) => [i.name, i]))
        res.results.forEach((i) => map.set(i.name, i))
        return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name))
      })
      setSkip(offset + res.results.length)
      setHasMore(offset + res.results.length < totalCount)

      // Update Cache
      resultsCache.current[offset] = {
        results: res.results,
        hasMore: offset + res.results.length < totalCount,
        totalCount: totalCount,
      }

      setPendingLetter(null)
      scrollToLetterSection(letter)
    })
  }

  const loadMore = () => {
    if (isPending || !hasMore) return

    startTransition(async () => {
      let finalLength = length[0] ?? 5
      let finalPrefix = prefix
      let finalSuffix = suffix
      let finalContains = contains

      if (mode === "cli") {
        const parsed = parseCliCommand(cliCommand)
        finalLength = parsed.parsedLength
        finalPrefix = parsed.parsedPrefix
        finalSuffix = parsed.parsedSuffix
        finalContains = parsed.parsedContains
      }

      const res = await generateNamesAction(
        finalLength,
        finalPrefix.toLowerCase(),
        finalSuffix.toLowerCase(),
        finalContains.toLowerCase(),
        skip,
        500,
      )

      setResults((prev) => {
        const map = new Map(prev.map((i) => [i.name, i]))
        res.results.forEach((i) => map.set(i.name, i))
        return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name))
      })
      setSkip((prev) => prev + res.results.length)
      setHasMore(results.length + res.results.length < res.count)
    })
  }

  useEffect(() => {
    if (!hasMore || isPending) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadMore()
        }
      },
      { threshold: 1.0 },
    )

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current)
    }

    return () => observer.disconnect()
  }, [hasMore, isPending, skip])

  const sortedBookmarks = [...bookmarks].sort((a, b) => {
    if (bookmarkSort === "alpha") return a.name.localeCompare(b.name)
    return 0 // Latest order
  })

  const displayedResults = mode === "bookmarks" ? sortedBookmarks : results
  const displayedCount = mode === "bookmarks" ? bookmarks.length : totalCount

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-transparent p-4 text-[#1a1a1a] selection:bg-[#1a1a1a] selection:text-[#ecebe5]">
      {/* Main Container */}
      <main className="relative z-10 flex h-[calc(100vh-2rem)] w-full max-w-6xl flex-col overflow-hidden border border-[#1a1a1a] bg-white shadow-2xl md:aspect-[4/3] md:h-auto">
        {/* Header */}
        <header className="flex shrink-0 items-center justify-between border-b border-[#1a1a1a] p-6 lg:p-8">
          <div className="flex items-center gap-4">
            <h1 className="font-serif text-3xl font-bold tracking-tighter uppercase">Studio</h1>
            <div className="ml-4 hidden border border-[#1a1a1a] font-mono text-xs sm:flex">
              <button
                onClick={() => setMode("ui")}
                className={`flex items-center gap-2 px-3 py-1 transition-colors ${mode === "ui" ? "bg-[#1a1a1a] text-[#ecebe5]" : "text-[#1a1a1a] hover:bg-neutral-100"}`}
              >
                <LayoutDashboard className="h-3 w-3" /> Visual
              </button>
              <button
                onClick={() => setMode("cli")}
                className={`flex items-center gap-2 border-r border-l border-[#1a1a1a] px-3 py-1 transition-colors ${mode === "cli" ? "bg-[#1a1a1a] text-[#ecebe5]" : "text-[#1a1a1a] hover:bg-neutral-100"}`}
              >
                <Terminal className="h-3 w-3" /> CLI
              </button>
              <button
                onClick={() => setMode("bookmarks")}
                className={`flex items-center gap-2 px-3 py-1 transition-colors ${mode === "bookmarks" ? "bg-[#1a1a1a] text-[#ecebe5]" : "text-[#1a1a1a] hover:bg-neutral-100"}`}
              >
                <Bookmark className="h-3 w-3" /> Saved ({hasMounted ? bookmarks.length : 0})
              </button>
            </div>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-xs uppercase opacity-60 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Return
          </Link>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-12">
          {/* Controls Sidebar */}
          <div className="flex flex-col gap-8 overflow-y-auto border-b border-[#1a1a1a] bg-[#f8f7f2] p-6 md:col-span-4 md:border-r md:border-b-0 lg:p-8">
            {/* Mobile Mode Toggle */}
            <div className="flex flex-wrap border border-[#1a1a1a] font-mono text-xs sm:hidden">
              <button
                onClick={() => setMode("ui")}
                className={`flex flex-1 items-center justify-center gap-2 px-2 py-2 transition-colors ${mode === "ui" ? "bg-[#1a1a1a] text-[#ecebe5]" : "text-[#1a1a1a] hover:bg-neutral-100"}`}
              >
                <LayoutDashboard className="h-3 w-3" /> Visual
              </button>
              <button
                onClick={() => setMode("cli")}
                className={`flex flex-1 items-center justify-center gap-2 border-r border-l border-[#1a1a1a] px-2 py-2 transition-colors ${mode === "cli" ? "bg-[#1a1a1a] text-[#ecebe5]" : "text-[#1a1a1a] hover:bg-neutral-100"}`}
              >
                <Terminal className="h-3 w-3" /> CLI
              </button>
              <button
                onClick={() => setMode("bookmarks")}
                className={`flex flex-1 items-center justify-center gap-2 px-2 py-2 transition-colors ${mode === "bookmarks" ? "bg-[#1a1a1a] text-[#ecebe5]" : "text-[#1a1a1a] hover:bg-neutral-100"}`}
              >
                <Bookmark className="h-3 w-3" /> Saved
              </button>
            </div>

            {mode === "ui" && (
              <>
                <div className="space-y-4">
                  <div className="flex items-end justify-between">
                    <Label className="font-serif tracking-widest text-[#1a1a1a] uppercase">
                      Length
                    </Label>
                    <span className="bg-[#1a1a1a] px-2 py-0.5 font-mono text-sm font-bold text-white">
                      {length[0]}
                    </span>
                  </div>
                  <Slider
                    value={length}
                    onValueChange={setLength}
                    max={8}
                    min={2}
                    step={1}
                    className="cursor-pointer py-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prefix" className="font-serif text-xs tracking-widest uppercase">
                    Prefix
                  </Label>
                  <Input
                    id="prefix"
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value.replace(/[^a-zA-Z]/g, ""))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleGenerate()
                      }
                    }}
                    placeholder="lu"
                    maxLength={length[0]}
                    className="h-10 rounded-none border-[#1a1a1a] font-bold tracking-widest uppercase"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="suffix" className="font-serif text-xs tracking-widest uppercase">
                    Suffix
                  </Label>
                  <Input
                    id="suffix"
                    value={suffix}
                    onChange={(e) => setSuffix(e.target.value.replace(/[^a-zA-Z]/g, ""))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleGenerate()
                      }
                    }}
                    placeholder="id"
                    maxLength={length[0]}
                    className="h-10 rounded-none border-[#1a1a1a] font-bold tracking-widest uppercase"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="contains"
                    className="font-serif text-xs tracking-widest uppercase"
                  >
                    Contains
                  </Label>
                  <Input
                    id="contains"
                    value={contains}
                    onChange={(e) => setContains(e.target.value.replace(/[^a-zA-Z]/g, ""))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleGenerate()
                      }
                    }}
                    placeholder="min"
                    maxLength={length[0]}
                    className="h-10 rounded-none border-[#1a1a1a] font-bold tracking-widest uppercase"
                  />
                </div>

                <div className="mt-auto space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <span className="font-mono text-[10px] uppercase opacity-40">Loom Status</span>
                    <span className="font-mono text-[10px] font-bold text-[#1a1a1a] uppercase">
                      {isPending ? "Weaving..." : "Ready"}
                    </span>
                  </div>
                  <div className="pt-2 pr-2">
                    <button
                      onClick={handleGenerate}
                      disabled={isPending}
                      className="flex h-14 w-full items-center justify-center border-2 border-[#1a1a1a] bg-white font-serif text-sm font-bold tracking-[0.2em] text-[#1a1a1a] uppercase shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] transition-none hover:bg-[#1a1a1a] hover:text-white active:translate-x-[4px] active:translate-y-[4px] active:shadow-none disabled:translate-x-[4px] disabled:translate-y-[4px] disabled:opacity-50 disabled:shadow-none"
                    >
                      {isPending ? "Processing" : "Generate"}
                    </button>
                  </div>
                </div>
              </>
            )}

            {mode === "cli" && (
              <div className="flex flex-1 flex-col space-y-2">
                <Label
                  htmlFor="cliCommand"
                  className="font-serif text-xs tracking-widest text-[#1a1a1a] uppercase"
                >
                  Terminal
                </Label>
                <input
                  id="cliCommand"
                  type="text"
                  value={cliCommand}
                  onChange={(e) => setCliCommand(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleGenerate()
                    }
                  }}
                  className="w-full rounded-none border border-[#1a1a1a] bg-transparent p-4 font-mono text-sm text-[#1a1a1a] focus:ring-1 focus:ring-[#1a1a1a] focus:outline-none"
                  placeholder="wordloom -l 6 -p ma"
                />
                <div className="mt-2 flex items-center justify-between">
                  <p className="font-mono text-[10px] uppercase opacity-50">Press Enter to run</p>
                  <a
                    href="https://github.com/nrjdalal/wordloom"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] text-[#1a1a1a] uppercase underline hover:opacity-70"
                  >
                    View CLI Docs
                  </a>
                </div>
                {isPending && (
                  <p className="mt-4 animate-pulse text-center font-mono text-[10px] uppercase opacity-50">
                    Running...
                  </p>
                )}
              </div>
            )}

            {mode === "bookmarks" && (
              <div className="flex h-full flex-1 flex-col items-start justify-start gap-4">
                <div className="flex w-full items-center justify-between">
                  <h3 className="font-serif text-xl text-black uppercase">Your Collection</h3>
                  <div className="flex border border-[#1a1a1a] font-mono text-[10px]">
                    <button
                      onClick={() => setBookmarkSort("latest")}
                      className={`px-2 py-0.5 transition-colors ${bookmarkSort === "latest" ? "bg-[#1a1a1a] text-white" : "text-[#1a1a1a] hover:bg-neutral-100"}`}
                    >
                      Latest
                    </button>
                    <button
                      onClick={() => setBookmarkSort("alpha")}
                      className={`border-l border-[#1a1a1a] px-2 py-0.5 transition-colors ${bookmarkSort === "alpha" ? "bg-[#1a1a1a] text-white" : "text-[#1a1a1a] hover:bg-neutral-100"}`}
                    >
                      A-Z
                    </button>
                  </div>
                </div>

                <p className="font-sans text-sm opacity-60">
                  {bookmarks.length === 0
                    ? "You haven't bookmarked any generations yet."
                    : `You have successfully saved ${bookmarks.length} phonotactic generation(s). They will presist locally on this device.`}
                </p>
                {bookmarks.length > 0 && (
                  <Button
                    onClick={() => {
                      setBookmarks([])
                      localStorage.removeItem("wordloom_bookmarks")
                    }}
                    variant="outline"
                    className="mt-auto rounded-none border-[#1a1a1a] font-serif text-xs tracking-widest uppercase"
                  >
                    Clear All
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Results Area */}
          <div className="flex min-h-0 flex-col bg-white p-6 md:col-span-8 lg:p-8">
            <div className="mb-6 flex shrink-0 items-center justify-between border-b border-[#1a1a1a] pb-4">
              <h2 className="font-sans text-sm font-semibold tracking-widest uppercase opacity-60">
                {mode === "bookmarks" ? "Saved Directory" : "Result Feed"}
              </h2>
              <span className="bg-[#ecebe5] px-2 py-1 font-mono text-xs text-[#1a1a1a] uppercase">
                {mode === "bookmarks"
                  ? `${bookmarks.length} saved`
                  : totalCount > 0
                    ? `${totalCount} found`
                    : "Idle"}
              </span>
            </div>

            <div ref={scrollContainerRef} className="relative flex-1 overflow-y-auto pr-2">
              {isPending && skip === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 opacity-30">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#1a1a1a] border-t-transparent" />
                  <p className="font-mono text-[10px] tracking-widest uppercase">
                    Generating exhaustive set...
                  </p>
                </div>
              ) : displayedResults.length === 0 ? (
                <div className="flex h-full items-center justify-center opacity-30">
                  <p className="font-serif text-2xl tracking-tighter uppercase">
                    {mode === "bookmarks"
                      ? "No Bookmarks"
                      : hasSearched
                        ? "No items found"
                        : "Awaiting input..."}
                  </p>
                </div>
              ) : (
                <div className="space-y-12 pb-12">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {displayedResults.map((item, i) => (
                      <div key={item.name} data-letter={item.name[0]?.toLowerCase()}>
                        <TryResultCard
                          item={item}
                          isSaved={bookmarks.some((b) => b.name === item.name)}
                          onToggleBookmark={toggleBookmark}
                          onCopy={handleCopy}
                        />
                      </div>
                    ))}
                  </div>

                  {mode !== "bookmarks" && hasMore && (
                    <div ref={sentinelRef} className="flex flex-col items-center gap-4 py-8">
                      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#1a1a1a] border-t-transparent" />
                      <p className="font-mono text-[10px] uppercase opacity-40">
                        Weaving more results...
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        {mode !== "bookmarks" && Object.keys(letterOffsets).length > 0 && (
          <div className="z-30 shrink-0 border-t border-[#1a1a1a] bg-white px-8 pt-4 pb-6">
            <div className="mx-auto flex w-full max-w-7xl flex-row flex-nowrap items-center justify-between">
              {"abcdefghijklmnopqrstuvwxyz".split("").map((l) => {
                const isAvailable = letterOffsets[l] !== undefined && letterOffsets[l] !== -1
                return (
                  <button
                    key={l}
                    disabled={!isAvailable}
                    onClick={() => jumpToLetter(l)}
                    className={`flex-1 border-none bg-transparent px-0.5 text-center font-mono text-[11px] uppercase transition-all ${
                      activeLetter === l
                        ? "scale-110 font-extrabold text-black"
                        : isAvailable
                          ? "text-neutral-500 hover:text-black"
                          : "cursor-not-allowed text-neutral-300"
                    } `}
                  >
                    <span className={!isAvailable ? "line-through opacity-40" : ""}>{l}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
