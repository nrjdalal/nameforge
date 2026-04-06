"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

export default function VantaBackground() {
  const [vantaEffect, setVantaEffect] = useState<any>(null)
  const myRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Vanta expects THREE to be attached to the window
    if (typeof window !== "undefined") {
      ;(window as any).THREE = THREE
    }

    if (!vantaEffect && myRef.current) {
      // @ts-ignore
      import("vanta/dist/vanta.fog.min").then((FOGModule) => {
        const FOG = FOGModule.default || FOGModule
        try {
          setVantaEffect(
            FOG({
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
              speed: 1.0,
            }),
          )
        } catch (err) {
          console.error("[VantaBackground] Failed to init Vanta:", err)
        }
      })
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

  return <div ref={myRef} className="absolute inset-0 w-full h-full -z-10 bg-[#ecebe5]" />
}
