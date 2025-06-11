"use client"
import { useState, useEffect } from "react"
import {
  Menu,
  User,
  Bell,
  Settings,
  TrendingUp,
  TrendingDown,
  Zap,
  Home,
  Lightbulb,
  Thermometer,
  Monitor,
  Refrigerator,
  ChefHat,
  Eye,
  EyeOff,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { XAxis, YAxis, ResponsiveContainer, Area, AreaChart, Tooltip, ReferenceLine } from "recharts"
import { PieChart, Pie, Cell, ResponsiveContainer as PieResponsiveContainer } from "recharts"

const hourlyData = [
  { hour: "12am", consumption: 1.2, cost: 0.15, efficiency: 85 },
  { hour: "2am", consumption: 1.0, cost: 0.12, efficiency: 90 },
  { hour: "4am", consumption: 1.1, cost: 0.13, efficiency: 88 },
  { hour: "6am", consumption: 1.8, cost: 0.22, efficiency: 75 },
  { hour: "8am", consumption: 2.2, cost: 0.27, efficiency: 70 },
  { hour: "10am", consumption: 3.1, cost: 0.38, efficiency: 65 },
  { hour: "12pm", consumption: 2.8, cost: 0.34, efficiency: 68 },
  { hour: "2pm", consumption: 4.2, cost: 0.51, efficiency: 55 },
  { hour: "4pm", consumption: 3.5, cost: 0.43, efficiency: 62 },
]

const deviceData = [
  {
    name: "Oven",
    value: 33,
    color: "#FF6B35",
    status: "active",
    icon: ChefHat,
    power: "2.1 kW",
    efficiency: 65,
    lastUsed: "2 hours ago",
  },
  {
    name: "Heater",
    value: 34,
    color: "#FF4757",
    status: "active",
    icon: Thermometer,
    power: "2.3 kW",
    efficiency: 58,
    lastUsed: "Active now",
  },
  {
    name: "A/C",
    value: 22,
    color: "#3742FA",
    status: "active",
    icon: Home,
    power: "1.5 kW",
    efficiency: 78,
    lastUsed: "Active now",
  },
  {
    name: "TV",
    value: 7,
    color: "#70A1FF",
    status: "standby",
    icon: Monitor,
    power: "0.2 kW",
    efficiency: 92,
    lastUsed: "30 min ago",
  },
  {
    name: "Fridge",
    value: 4,
    color: "#2ED573",
    status: "active",
    icon: Refrigerator,
    power: "0.3 kW",
    efficiency: 95,
    lastUsed: "Always on",
  },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm p-4 border border-gray-200 rounded-xl shadow-lg">
        <p className="text-sm font-semibold text-gray-800 mb-2">{label}</p>
        <div className="space-y-1">
          <p className="text-sm text-blue-600 flex items-center gap-2">
            <Zap className="w-3 h-3" />
            {payload[0].value} kWh
          </p>
          <p className="text-sm text-green-600">💰 ${payload[0].payload.cost}</p>
          <p className="text-sm text-purple-600">⚡ {payload[0].payload.efficiency}% efficient</p>
        </div>
      </div>
    )
  }
  return null
}

export default function ModernEnergyDashboard() {
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const totalConsumption = deviceData.reduce((sum, device) => sum + device.value, 0)
  const totalCost = hourlyData.reduce((sum, hour) => sum + hour.cost, 0)
  const avgEfficiency = deviceData.reduce((sum, device) => sum + device.efficiency, 0) / deviceData.length
  const activeDevices = deviceData.filter((d) => d.status === "active").length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-gray-100/80 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-5 w-5 text-gray-700" />
              </Button>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ORACLE
                  </h1>
                  <p className="text-xs text-gray-500">Energy Intelligence</p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Dashboard
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Devices
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Analytics
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Insights
              </a>
            </nav>

            <div className="flex items-center space-x-3">
              <div className="hidden sm:block text-right">
                <p className="text-xs text-gray-500">
                  {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
                <p className="text-xs text-gray-400">
                  {currentTime.toLocaleDateString([], { month: "short", day: "numeric" })}
                </p>
              </div>
              <Button variant="ghost" size="icon" className="relative hover:bg-gray-100/80">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gray-100/80">
                <Settings className="h-5 w-5 text-gray-600" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gray-100/80">
                <User className="h-5 w-5 text-gray-600" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="text-center lg:text-left mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Today's Energy Insights</h1>
            <p className="text-lg text-gray-600 mb-6">Smart monitoring for efficient energy consumption</p>

            {/* Enhanced Success Badge */}
            <div className="flex justify-center lg:justify-start mb-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center space-x-3 transform hover:scale-105 transition-transform">
                <TrendingDown className="w-5 h-5" />
                <span className="font-semibold">SMART CHOICES TODAY!</span>
                <Badge className="bg-white/20 text-white border-0">2¢ SAVED</Badge>
              </div>
            </div>
          </div>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Total Usage</p>
                    <p className="text-2xl font-bold">{totalConsumption}%</p>
                    <p className="text-blue-100 text-xs">vs yesterday</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Zap className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">Daily Cost</p>
                    <p className="text-2xl font-bold">${totalCost.toFixed(2)}</p>
                    <div className="flex items-center text-green-100 text-xs">
                      <TrendingDown className="w-3 h-3 mr-1" />
                      -12% saved
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <span className="text-xl">💰</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">Efficiency</p>
                    <p className="text-2xl font-bold">{Math.round(avgEfficiency)}%</p>
                    <div className="flex items-center text-purple-100 text-xs">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +5% improved
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Lightbulb className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm font-medium">Active Devices</p>
                    <p className="text-2xl font-bold">{activeDevices}</p>
                    <p className="text-orange-100 text-xs">of {deviceData.length} total</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Home className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          {/* Enhanced Hourly Consumption Chart */}
          <Card className="xl:col-span-2 bg-white/70 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-gray-800">Electricity Consumption by Hour</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">Real-time energy usage tracking</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDetails(!showDetails)}
                  className="flex items-center gap-2"
                >
                  {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showDetails ? "Hide" : "Show"} Details
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={hourlyData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <defs>
                      <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                        <stop offset="50%" stopColor="#8B5CF6" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#EC4899" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="hour"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#6B7280" }}
                      interval={0}
                    />
                    <YAxis
                      domain={[0, 5]}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#6B7280" }}
                      label={{
                        value: "kWh",
                        angle: -90,
                        position: "insideLeft",
                        style: { textAnchor: "middle", fontSize: "12px", fill: "#6B7280" },
                      }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine y={3} stroke="#EF4444" strokeDasharray="5 5" label="Peak Alert" />
                    <Area
                      type="monotone"
                      dataKey="consumption"
                      stroke="url(#energyGradient)"
                      strokeWidth={3}
                      fill="url(#energyGradient)"
                      dot={{ fill: "#3B82F6", strokeWidth: 2, r: 5 }}
                      activeDot={{ r: 8, fill: "#3B82F6", stroke: "#fff", strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {showDetails && (
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-semibold text-gray-800 mb-3">Peak Usage Analysis</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Peak Hour:</span>
                      <span className="font-semibold text-gray-800 ml-2">2pm (4.2 kWh)</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Lowest Hour:</span>
                      <span className="font-semibold text-gray-800 ml-2">2am (1.0 kWh)</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Enhanced Device Consumption Chart */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="pb-6">
              <CardTitle className="text-xl font-bold text-gray-800">Device Consumption</CardTitle>
              <p className="text-sm text-gray-600">Smart device breakdown</p>
            </CardHeader>
            <CardContent>
              <div className="h-80 relative">
                <PieResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius="45%"
                      outerRadius="75%"
                      paddingAngle={3}
                      dataKey="value"
                      onMouseEnter={(_, index) => setSelectedDevice(deviceData[index].name)}
                      onMouseLeave={() => setSelectedDevice(null)}
                    >
                      {deviceData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          stroke={selectedDevice === entry.name ? "#1F2937" : "none"}
                          strokeWidth={selectedDevice === entry.name ? 3 : 0}
                          style={{
                            filter: selectedDevice === entry.name ? "brightness(1.1)" : "none",
                            transition: "all 0.3s ease",
                          }}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: any) => [`${value}%`, "Usage"]}
                      labelFormatter={(label: string) => `${label}`}
                    />
                  </PieChart>
                </PieResponsiveContainer>

                {/* Enhanced Center Display */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      100
                    </span>
                    <p className="text-sm text-gray-500 font-medium">Total %</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Device Management */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">Smart Device Control</CardTitle>
            <p className="text-sm text-gray-600">Monitor and control your connected devices</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deviceData.map((device, index) => {
                const IconComponent = device.icon
                return (
                  <Card
                    key={index}
                    className={`transition-all duration-300 cursor-pointer border-2 ${
                      selectedDevice === device.name
                        ? "border-blue-300 bg-blue-50 shadow-lg scale-105"
                        : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                    }`}
                    onMouseEnter={() => setSelectedDevice(device.name)}
                    onMouseLeave={() => setSelectedDevice(null)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg"
                            style={{ backgroundColor: device.color }}
                          >
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{device.name}</h3>
                            <p className="text-sm text-gray-500">{device.power}</p>
                          </div>
                        </div>
                        <Switch checked={device.status === "active"} />
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Usage</span>
                          <span className="font-bold text-gray-800">{device.value}%</span>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Efficiency</span>
                            <span className="text-sm font-medium text-gray-800">{device.efficiency}%</span>
                          </div>
                          <Progress
                            value={device.efficiency}
                            className="h-2"
                            style={{
                              background: `linear-gradient(to right, ${device.color}20, ${device.color}40)`,
                            }}
                          />
                        </div>

                        <div className="pt-2 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <Badge variant={device.status === "active" ? "default" : "secondary"} className="text-xs">
                              {device.status}
                            </Badge>
                            <span className="text-xs text-gray-500">{device.lastUsed}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
