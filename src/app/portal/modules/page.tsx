"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  ArrowRight, 
  Clock,
  Zap,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Filter
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { AI_MODULES, MODULE_CATEGORIES, type AIModule } from "@/lib/modules";

export default function ModulesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedModule, setSelectedModule] = useState<AIModule | null>(null);
  const [enabledModules, setEnabledModules] = useState<string[]>(
    AI_MODULES.slice(0, 8).map(m => m.id)
  );

  const filteredModules = AI_MODULES.filter(module => {
    const matchesSearch = module.name.toLowerCase().includes(search.toLowerCase()) ||
      module.shortDescription.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || module.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleModule = (id: string) => {
    setEnabledModules(prev => 
      prev.includes(id) 
        ? prev.filter(m => m !== id)
        : [...prev, id]
    );
  };

  const isEnabled = (id: string) => enabledModules.includes(id);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-normal tracking-tight mb-2" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>
            AI Modules
          </h2>
          <p className="text-muted-foreground">
            View and manage all AI modules available in your organization.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="text-sm py-1 px-3">
            {enabledModules.length} of {AI_MODULES.length} enabled
          </Badge>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search modules by name or description..."
                className="pl-9"
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
                All ({AI_MODULES.length})
              </Button>
              {MODULE_CATEGORIES.map(cat => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.label} ({cat.count})
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modules Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredModules.map((module, i) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.03 }}
            layout
          >
            <Card 
              className={`h-full transition-all cursor-pointer hover:shadow-md ${
                isEnabled(module.id) ? "border-accent/50 bg-accent/5" : ""
              }`}
              onClick={() => setSelectedModule(module)}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <Badge variant="secondary" className="text-xs">{module.categoryLabel}</Badge>
                  <div onClick={(e) => e.stopPropagation()}>
                    <Switch
                      checked={isEnabled(module.id)}
                      onCheckedChange={() => toggleModule(module.id)}
                    />
                  </div>
                </div>
                <h3 className="font-semibold mb-2">{module.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {module.shortDescription}
                </p>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {module.latency}
                  </div>
                  <div className="flex items-center gap-1">
                    {isEnabled(module.id) ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-accent" />
                        <span className="text-accent">Enabled</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3 text-muted-foreground" />
                        <span className="text-muted-foreground">Disabled</span>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredModules.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No modules match your search criteria.</p>
          <Button 
            variant="ghost" 
            className="mt-4" 
            onClick={() => { setSearch(""); setSelectedCategory(null); }}
          >
            Clear filters
          </Button>
        </div>
      )}

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
                  Back to Modules
                </Button>

                <div className="flex items-start justify-between mb-6">
                  <div>
                    <Badge variant="secondary" className="mb-3">{selectedModule.categoryLabel}</Badge>
                    <h2 className="text-2xl font-semibold">{selectedModule.name}</h2>
                  </div>
                  <Switch
                    checked={isEnabled(selectedModule.id)}
                    onCheckedChange={() => toggleModule(selectedModule.id)}
                  />
                </div>

                <p className="text-muted-foreground mb-8">{selectedModule.description}</p>

                <div className="space-y-8">
                  {/* Status */}
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    {isEnabled(selectedModule.id) ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-accent" />
                        <div>
                          <p className="font-medium text-accent">Module Enabled</p>
                          <p className="text-sm text-muted-foreground">Active in your environment</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Module Disabled</p>
                          <p className="text-sm text-muted-foreground">Toggle to enable</p>
                        </div>
                      </>
                    )}
                  </div>

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
                    <pre className="p-4 bg-foreground text-background rounded-lg text-xs overflow-x-auto font-mono whitespace-pre-wrap">
                      {selectedModule.exampleInput}
                    </pre>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Example Output</h3>
                    <pre className="p-4 bg-foreground text-background rounded-lg text-xs overflow-x-auto font-mono whitespace-pre-wrap">
                      {selectedModule.exampleOutput}
                    </pre>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
