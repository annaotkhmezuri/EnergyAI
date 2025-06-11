"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Menu, User, Plus } from "lucide-react"
import Image from "next/image"

const energyProviders = [
  {
    id: 1,
    name: "Iberdrola",
    logo: "/placeholder.svg?height=40&width=120&text=Iberdrola",
    color: "#00A651",
  },
  {
    id: 2,
    name: "Endesa",
    logo: "/placeholder.svg?height=40&width=120&text=Endesa",
    color: "#0066CC",
  },
  {
    id: 3,
    name: "Naturgy",
    logo: "/placeholder.svg?height=40&width=120&text=Naturgy",
    color: "#FF6600",
  },
  {
    id: 4,
    name: "Repsol",
    logo: "/placeholder.svg?height=40&width=120&text=Repsol",
    color: "#FF6B35",
  },
]

export default function EnergyProvidersPage() {
  const [selectedProvider, setSelectedProvider] = useState<number | null>(null)

  const handleNavigation = (provider: string | undefined) =>{
    window.location.href = '/'+provider;
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Button variant="ghost" size="icon" className="p-2">
            <Menu className="h-6 w-6 text-gray-600" />
          </Button>

          <div className="flex items-center gap-2">
            <Image src="/energyai-logo.png" alt="EnergyAI" width={32} height={32} className="rounded-lg" />
            <span className="text-lg font-semibold text-gray-900">EnergyAI</span>
          </div>

          <Button variant="ghost" size="icon" className="p-2">
            <User className="h-6 w-6 text-gray-600" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-8 max-w-md mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Choose Your Electricity Company</h1>

        <div className="space-y-4">
          {energyProviders.map((provider) => (
            <Card
              key={provider.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedProvider === provider.id ? "ring-2 ring-green-500 shadow-md" : "shadow-sm hover:shadow-lg"
              }`}
              onClick={() => setSelectedProvider(provider.id)}
            >
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-12 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-gray-100">
                    <Image
                      src={provider.logo || "/placeholder.svg"}
                      alt={`${provider.name} logo`}
                      width={60}
                      height={30}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-lg font-medium text-gray-900">{provider.name}</span>
                </div>

                <Button
                  variant={selectedProvider === provider.id ? "default" : "outline"}
                  size="icon"
                  className={`w-10 h-10 rounded-lg ${
                    selectedProvider === provider.id ? "bg-green-600 hover:bg-green-700" : "border-gray-300"
                  }`}
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedProvider && (
          <div className="mt-8">
            <Button onClick={()=> handleNavigation(energyProviders.find((p) => p.id === selectedProvider)?.name) }className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium" size="lg">
              Continue with {energyProviders.find((p) => p.id === selectedProvider)?.name}
            </Button>
          </div>
        )}
      </main>

      {/* Bottom spacing for mobile */}
      <div className="h-8"></div>
    </div>
  )
}
