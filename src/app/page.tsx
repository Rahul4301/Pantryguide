import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Map } from "lucide-react"
import RecipeGenerator from "@/components/recipe-generator"
import GroceryMap from "@/components/grocery-map"
import { ChefHatIcon } from "@/components/icons/chef-hat"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <ChefHatIcon className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold font-headline text-primary">PantryPal</h1>
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <Tabs defaultValue="recipe" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="recipe">
              <ChefHatIcon className="mr-2 h-4 w-4" />
              Recipe Generator
            </TabsTrigger>
            <TabsTrigger value="map">
              <Map className="mr-2 h-4 w-4" />
              Grocery Stores
            </TabsTrigger>
          </TabsList>
          <TabsContent value="recipe" className="mt-6">
            <RecipeGenerator />
          </TabsContent>
          <TabsContent value="map" className="mt-6">
            <GroceryMap />
          </TabsContent>
        </Tabs>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} PantryPal. All rights reserved.
      </footer>
    </div>
  )
}
