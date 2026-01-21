"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Search, X, Clock, Zap, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AI_MODULES, MODULE_CATEGORIES, type AIModule } from "@/lib/modules";

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedModule, setSelectedModule] = useState<AIModule | null>(null);

  const filteredModules = AI_MODULES.filter(module => {
    const matchesSearch = module.name.toLowerCase().includes(search.toLowerCase()) ||
      module.shortDescription.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || module.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-8">
            <Link href="/vam" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
                <span className="text-background font-bold text-sm">V</span>
              </div>
              <span className="font-semibold text-lg tracking-tight">VAM</span>
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/vam" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
              <Link href="/vam/catalog" className="text-foreground font-medium">Catalog</Link>
              <Link href="/vam/connect" className="text-muted-foreground hover:text-foreground transition-colors">Connect</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/portal">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/vam/connect">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-normal tracking-tight mb-4" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>
            Module Catalog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Browse all available AI modules. Each module is a standardized, vendor-agnostic capability ready for activation.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search modules..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            {MODULE_CATEGORIES.map(cat => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-6">
          Showing {filteredModules.length} of {AI_MODULES.length} modules
        </p>

        {/* Module Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module, i) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              layout
            >
              <Card 
                className="h-full hover:border-accent/50 transition-all cursor-pointer group"
                onClick={() => setSelectedModule(module)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Badge variant="secondary" className="text-xs">{module.categoryLabel}</Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {module.latency}
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-accent transition-colors">{module.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{module.shortDescription}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{module.useCases.length} use cases</span>
                    <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all ml-auto" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredModules.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No modules match your search criteria.</p>
            <Button variant="ghost" className="mt-4" onClick={() => { setSearch(""); setSelectedCategory(null); }}>
              Clear filters
            </Button>
          </div>
        )}
      </div>

      {/* Module Detail Slide-over */}
      <AnimatePresence>
        {selectedModule && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40"
              onClick={() => setSelectedModule(null)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-background border-l shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-8">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mb-6"
                  onClick={() => setSelectedModule(null)}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Catalog
                </Button>

                <Badge variant="secondary" className="mb-4">{selectedModule.categoryLabel}</Badge>
                <h2 className="text-3xl font-semibold mb-4">{selectedModule.name}</h2>
                <p className="text-lg text-muted-foreground mb-8">{selectedModule.description}</p>

                <div className="space-y-8">
                  {/* Latency */}
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <Zap className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-sm font-medium">Latency Profile</p>
                      <p className="text-sm text-muted-foreground">{selectedModule.latency}</p>
                    </div>
                  </div>

                  {/* Use Cases */}
                  <div>
                    <h3 className="font-semibold mb-3">Use Cases</h3>
                    <ul className="space-y-2">
                      {selectedModule.useCases.map((uc, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                          {uc}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Example I/O */}
                  <div>
                    <h3 className="font-semibold mb-3">Example Input</h3>
                    <pre className="p-4 bg-foreground text-background rounded-lg text-xs overflow-x-auto font-mono">
                      {selectedModule.exampleInput}
                    </pre>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Example Output</h3>
                    <pre className="p-4 bg-foreground text-background rounded-lg text-xs overflow-x-auto font-mono whitespace-pre-wrap">
                      {selectedModule.exampleOutput}
                    </pre>
                  </div>

                  {/* CTA */}
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-4">
                      Ready to activate this module for your organization?
                    </p>
                    <Button asChild>
                      <Link href="/vam/connect">
                        Request Access
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t py-12 px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-foreground flex items-center justify-center">
              <span className="text-background font-bold text-xs">V</span>
            </div>
            <span className="text-sm text-muted-foreground">VSee AI Marketplace</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/vam" className="hover:text-foreground transition-colors">Home</Link>
            <Link href="/vam/connect" className="hover:text-foreground transition-colors">Connect</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
