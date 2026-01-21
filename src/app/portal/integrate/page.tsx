"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Search, 
  ArrowRight, 
  Code2, 
  Webhook, 
  Play, 
  Copy, 
  Check,
  Clock,
  Zap,
  FileJson,
  Terminal
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AI_MODULES, MODULE_CATEGORIES, type AIModule } from "@/lib/modules";

export default function IntegratePage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedModule, setSelectedModule] = useState<AIModule | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const filteredModules = AI_MODULES.filter(module => {
    const matchesSearch = module.name.toLowerCase().includes(search.toLowerCase()) ||
      module.shortDescription.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || module.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const getRESTExample = (module: AIModule) => `curl -X POST https://api.vsee.ai/v1/modules/${module.id}/invoke \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "input": ${JSON.stringify(module.exampleInput).slice(0, 100)}...
  }'`;

  const getTypeScriptSDK = (module: AIModule) => `import { VSeeAI } from '@vsee/ai-sdk';

const client = new VSeeAI({
  apiKey: process.env.VSEE_API_KEY
});

const result = await client.modules.${module.id.replace(/-/g, '_')}.invoke({
  input: yourInputData
});

console.log(result);
// ${module.exampleOutput.slice(0, 50)}...`;

  const getPythonSDK = (module: AIModule) => `from vsee_ai import VSeeAI

client = VSeeAI(api_key="YOUR_API_KEY")

result = client.modules.${module.id.replace(/-/g, '_')}.invoke(
    input=your_input_data
)

print(result)
# ${module.exampleOutput.slice(0, 50)}...`;

  const getWebhookExample = (module: AIModule) => `{
  "event": "module.${module.id}.completed",
  "timestamp": "2026-01-20T10:30:00Z",
  "data": {
    "request_id": "req_abc123",
    "module": "${module.id}",
    "status": "success",
    "result": ${module.exampleOutput.slice(0, 80)}...
  }
}`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-normal tracking-tight mb-2" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>
          Integrate into Existing Systems
        </h2>
        <p className="text-muted-foreground">
          Every module is headless. Access via REST APIs, SDKs, or webhooks. Embed AI into any system.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Module Browser */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Module Browser</CardTitle>
              <CardDescription>Select a module to view integration options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search modules..."
                  className="pl-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-1">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  size="sm"
                  className="text-xs h-7"
                  onClick={() => setSelectedCategory(null)}
                >
                  All
                </Button>
                {MODULE_CATEGORIES.map(cat => (
                  <Button
                    key={cat.id}
                    variant={selectedCategory === cat.id ? "default" : "outline"}
                    size="sm"
                    className="text-xs h-7"
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    {cat.label.split(' ')[0]}
                  </Button>
                ))}
              </div>

              {/* Module List */}
              <div className="space-y-1 max-h-[50vh] overflow-y-auto">
                {filteredModules.map((module) => (
                  <button
                    key={module.id}
                    onClick={() => setSelectedModule(module)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedModule?.id === module.id 
                        ? "bg-accent text-accent-foreground" 
                        : "hover:bg-muted"
                    }`}
                  >
                    <p className="text-sm font-medium truncate">{module.name}</p>
                    <p className={`text-xs truncate ${
                      selectedModule?.id === module.id 
                        ? "text-accent-foreground/70" 
                        : "text-muted-foreground"
                    }`}>
                      {module.shortDescription}
                    </p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Module Detail / Integration View */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {selectedModule ? (
              <motion.div
                key={selectedModule.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Module Header */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <Badge variant="secondary" className="mb-3">{selectedModule.categoryLabel}</Badge>
                        <h3 className="text-2xl font-semibold">{selectedModule.name}</h3>
                        <p className="text-muted-foreground mt-2">{selectedModule.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Latency: {selectedModule.latency}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{selectedModule.useCases.length} use cases</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Integration Methods */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Integration Options</CardTitle>
                    <CardDescription>Choose your preferred integration method</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="rest" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="rest" className="text-xs">
                          <FileJson className="w-3 h-3 mr-1" />
                          REST API
                        </TabsTrigger>
                        <TabsTrigger value="typescript" className="text-xs">
                          <Code2 className="w-3 h-3 mr-1" />
                          TypeScript
                        </TabsTrigger>
                        <TabsTrigger value="python" className="text-xs">
                          <Terminal className="w-3 h-3 mr-1" />
                          Python
                        </TabsTrigger>
                        <TabsTrigger value="webhook" className="text-xs">
                          <Webhook className="w-3 h-3 mr-1" />
                          Webhook
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="rest" className="mt-4">
                        <div className="relative">
                          <pre className="p-4 bg-foreground text-background rounded-lg text-xs overflow-x-auto font-mono">
                            {getRESTExample(selectedModule)}
                          </pre>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2 text-background/70 hover:text-background hover:bg-background/10"
                            onClick={() => copyToClipboard(getRESTExample(selectedModule), "rest")}
                          >
                            {copied === "rest" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-3">
                          Standard REST endpoint. All modules follow the same pattern.
                        </p>
                      </TabsContent>

                      <TabsContent value="typescript" className="mt-4">
                        <div className="relative">
                          <pre className="p-4 bg-foreground text-background rounded-lg text-xs overflow-x-auto font-mono">
                            {getTypeScriptSDK(selectedModule)}
                          </pre>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2 text-background/70 hover:text-background hover:bg-background/10"
                            onClick={() => copyToClipboard(getTypeScriptSDK(selectedModule), "ts")}
                          >
                            {copied === "ts" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-3">
                          Install: <code className="bg-muted px-1 rounded">npm install @vsee/ai-sdk</code>
                        </p>
                      </TabsContent>

                      <TabsContent value="python" className="mt-4">
                        <div className="relative">
                          <pre className="p-4 bg-foreground text-background rounded-lg text-xs overflow-x-auto font-mono">
                            {getPythonSDK(selectedModule)}
                          </pre>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2 text-background/70 hover:text-background hover:bg-background/10"
                            onClick={() => copyToClipboard(getPythonSDK(selectedModule), "py")}
                          >
                            {copied === "py" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-3">
                          Install: <code className="bg-muted px-1 rounded">pip install vsee-ai</code>
                        </p>
                      </TabsContent>

                      <TabsContent value="webhook" className="mt-4">
                        <div className="relative">
                          <pre className="p-4 bg-foreground text-background rounded-lg text-xs overflow-x-auto font-mono">
                            {getWebhookExample(selectedModule)}
                          </pre>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2 text-background/70 hover:text-background hover:bg-background/10"
                            onClick={() => copyToClipboard(getWebhookExample(selectedModule), "webhook")}
                          >
                            {copied === "webhook" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-3">
                          Configure webhook URL in your portal settings to receive async results.
                        </p>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                {/* Request/Response Playground */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">Request / Response</CardTitle>
                        <CardDescription>Example input and output for this module</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" disabled>
                        <Play className="w-4 h-4 mr-2" />
                        Try it (Demo)
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Example Input</p>
                      <pre className="p-4 bg-muted rounded-lg text-xs overflow-x-auto font-mono whitespace-pre-wrap">
                        {selectedModule.exampleInput}
                      </pre>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Example Output</p>
                      <pre className="p-4 bg-accent/5 border border-accent/20 rounded-lg text-xs overflow-x-auto font-mono whitespace-pre-wrap">
                        {selectedModule.exampleOutput}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex items-center justify-center"
              >
                <Card className="max-w-md text-center">
                  <CardContent className="p-12">
                    <Code2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Select a Module</h3>
                    <p className="text-muted-foreground text-sm">
                      Choose a module from the browser to view integration documentation, code examples, and test the API.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
