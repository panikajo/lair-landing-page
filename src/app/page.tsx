"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Instagram, Facebook, Phone, MapPin, Clock, Menu as MenuIcon, X, Sun, Moon, ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [slide, setSlide] = useState(0);

  const slides = [
    "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=1800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1529973565459-c3dc186fd8f3?q=80&w=1600&auto=format&fit=crop",
  ];

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const prefersDark = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = (stored as "light" | "dark") || (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/50 border-b border-border/50">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="font-serif text-2xl tracking-wide">
            Lair
          </button>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <button onClick={() => scrollTo("menu")} className="hover:text-primary transition-colors">Menu</button>
            <button onClick={() => scrollTo("about")} className="hover:text-primary transition-colors">About</button>
            <button onClick={() => scrollTo("visit")} className="hover:text-primary transition-colors">Visit</button>
            <Link href="#visit">
              <Button size="sm" variant="default" onClick={(e) => { e.preventDefault(); scrollTo("visit"); }}>Reserve</Button>
            </Link>
            <Button size="icon" variant="secondary" className="ml-2" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </nav>
          <button className="md:hidden p-2" aria-label="Toggle menu" onClick={() => setOpen(o => !o)}>
            {open ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
        {open && (
          <div className="md:hidden border-t border-border/50 bg-background/90 backdrop-blur">
            <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col gap-3">
              <button onClick={() => scrollTo("menu")} className="py-2 text-left">Menu</button>
              <button onClick={() => scrollTo("about")} className="py-2 text-left">About</button>
              <button onClick={() => scrollTo("visit")} className="py-2 text-left">Visit</button>
              <Button className="mt-2 w-full" onClick={() => scrollTo("visit")}>Reserve</Button>
              <Button variant="secondary" className="mt-2" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === "dark" ? "Light mode" : "Dark mode"}
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="hero" className="relative h-[92svh] md:h-[92vh] grid place-items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=1800&auto=format&fit=crop"
          alt="Moody cafe bar interior with warm lighting"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 dark:bg-black/50" />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-white">Lair</h1>
          <p className="mt-4 text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
            A moody cafe by day, intimate cocktail bar by night.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Button onClick={() => scrollTo("menu")} variant="default">Explore Menu</Button>
            <Button onClick={() => scrollTo("visit")} variant="secondary">Visit Us</Button>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="py-16 md:py-24">
        <div className="px-0">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              key={slide}
              src={slides[slide]}
              alt="Menu slide"
              fill
              className="object-cover"
              sizes="100vw"
              priority={false}
            />
            {/* Controls */}
            <div className="absolute inset-0 flex items-center justify-between p-2">
              <button
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/70 backdrop-blur text-foreground border border-border hover:bg-background/90"
                onClick={() => setSlide((s) => (s - 1 + slides.length) % slides.length)}
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/70 backdrop-blur text-foreground border border-border hover:bg-background/90"
                onClick={() => setSlide((s) => (s + 1) % slides.length)}
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  className={`h-2 w-2 rounded-full ${i === slide ? "bg-foreground" : "bg-foreground/40"}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 md:py-24 border-t border-border/60">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-10 items-center">
          <div className="relative h-72 md:h-96 rounded-xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1600&auto=format&fit=crop"
              alt="Bartender crafting a cocktail at Lair"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold">About Lair</h3>
            <p className="mt-4 text-muted-foreground">
              Hidden in plain sight, Lair is designed as a refuge—soft light, textured walls, and
              a soundtrack that leans late-night. By day, we serve meticulously sourced coffee; by night,
              the room shifts to an intimate bar for conversation-forward cocktails.
            </p>
            <p className="mt-4 text-muted-foreground">
              We value craft, quiet confidence, and the small details that make a place feel like yours.
            </p>
          </div>
        </div>
      </section>

      {/* Visit */}
      <section id="visit" className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5" /> Visit Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>123 Lair Lane, Shadow District, NY 10001</p>
              <div className="flex items-start gap-2 text-muted-foreground">
                <Clock className="h-4 w-4 mt-1" />
                <div>
                  <p>Mon–Thu: 8a – 10p</p>
                  <p>Fri: 8a – 12a</p>
                  <p>Sat: 10a – 12a</p>
                  <p>Sun: 10a – 8p</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+12125551234" className="underline underline-offset-4">(212) 555‑1234</a>
              </div>
              <Button className="mt-2" asChild>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=123+Lair+Lane+NY+10001"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open in Maps
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reservations & Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We hold limited tables for walk-ins. For groups of 6+ or private events, get in touch.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild className="flex-1">
                  <a href="mailto:hello@lair.bar?subject=Reservation%20Inquiry">Email Us</a>
                </Button>
                <Button variant="secondary" asChild className="flex-1">
                  <a href="tel:+12125551234">Call</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 py-10">
        <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          <div>
            <div className="font-serif text-2xl">Lair</div>
            <p className="text-muted-foreground mt-2">Coffee. Cocktails. Small plates.</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-primary">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-primary">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
          <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} Lair. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

function MenuItem({ name, desc, price }: { name: string; desc: string; price: string }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-baseline justify-between gap-4">
          <CardTitle className="text-base font-medium">{name}</CardTitle>
          <span className="text-sm text-muted-foreground">{price}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </CardContent>
    </Card>
  );
}