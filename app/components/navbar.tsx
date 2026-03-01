"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./toggle-theme-button"

type NavLink = {
  label: string
  href: string
}

const navLinks: NavLink[] = [
  { label: "Hem", href: "#hem" },
  { label: "Tjänster", href: "#tjanster" },
  { label: "Priser", href: "#priser" },
  { label: "Kontakt", href: "#kontakt" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  function toggleMenu() {
    setIsOpen(function (prev) {
      return !prev
    })
  }

  function closeMenu() {
    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <Link
          href="#hem"
          className="font-heading text-2xl font-bold tracking-tight text-foreground"
          onClick={closeMenu}
        >
          Fakey <span className="text-primary">Nails</span>
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(function (link) {
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            )
          })}

          <li>
            <ModeToggle />
          </li>

          <li>
            <Button variant="default" size="sm" asChild>
              <Link href="#kontakt">Boka Nu</Link>
            </Button>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden text-foreground"
          onClick={toggleMenu}
          aria-label="Meny"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen ? (
        <div className="md:hidden bg-background border-t border-border animate-in slide-in-from-top-2 duration-200">
          <ul className="flex flex-col items-center gap-4 py-6">
            {navLinks.map(function (link) {
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-base font-medium text-foreground hover:text-primary transition-colors"
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}

            <li>
              <ModeToggle />
            </li>

            <li>
              <Button variant="default" size="sm" asChild>
                <Link href="#kontakt" onClick={closeMenu}>
                  Boka Nu
                </Link>
              </Button>
            </li>
          </ul>
        </div>
      ) : null}
    </nav>
  )
}