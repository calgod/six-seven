import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const lineData = [
  { name: 'Jan', six: 6, seven: 7, combo: 13 },
  { name: 'Feb', six: 12, seven: 14, combo: 26 },
  { name: 'Mar', six: 18, seven: 21, combo: 39 },
  { name: 'Apr', six: 24, seven: 28, combo: 52 },
  { name: 'May', six: 30, seven: 35, combo: 65 },
  { name: 'Jun', six: 36, seven: 42, combo: 78 },
]

const barData = [
  { name: '6×1', value: 6 },
  { name: '6×2', value: 12 },
  { name: '6×3', value: 18 },
  { name: '6×4', value: 24 },
  { name: '6×5', value: 30 },
  { name: '6×6', value: 36 },
  { name: '6×7', value: 42 },
]

const pieData = [
  { name: 'Purple', value: 6, color: '#8b5cf6' },
  { name: 'Pink', value: 7, color: '#ec4899' },
  { name: 'Blue', value: 13, color: '#3b82f6' },
  { name: 'Green', value: 42, color: '#10b981' },
]

const areaData = [
  { name: 'Week 1', visitors: 67, pageViews: 134 },
  { name: 'Week 2', visitors: 76, pageViews: 152 },
  { name: 'Week 3', visitors: 167, pageViews: 334 },
  { name: 'Week 4', visitors: 267, pageViews: 534 },
]

export function ChartsPage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Data Visualizations
        </h1>
        <p className="text-muted-foreground text-lg">
          Beautiful charts showcasing 6 and 7 data
        </p>
        <div className="flex gap-2 justify-center">
          <Badge>6 Charts</Badge>
          <Badge variant="secondary">7 Colors</Badge>
          <Badge variant="outline">Infinite Data</Badge>
        </div>
      </div>

      {/* Line Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Growth Trends - 6 vs 7</CardTitle>
          <CardDescription>Monthly progression of our lucky numbers</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="six" stroke="#8b5cf6" strokeWidth={3} />
              <Line type="monotone" dataKey="seven" stroke="#ec4899" strokeWidth={3} />
              <Line type="monotone" dataKey="combo" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Multiplication Table</CardTitle>
            <CardDescription>6 times table visualization</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Color Distribution</CardTitle>
            <CardDescription>Breakdown by favorite colors</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Area Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Website Analytics</CardTitle>
          <CardDescription>Weekly visitors and page views</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={areaData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="visitors" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" />
              <Area type="monotone" dataKey="pageViews" stackId="2" stroke="#ec4899" fill="#ec4899" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6 text-center">
            <div className="text-4xl font-bold mb-2">6</div>
            <div className="text-sm opacity-90">Perfect Number</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white">
          <CardContent className="p-6 text-center">
            <div className="text-4xl font-bold mb-2">7</div>
            <div className="text-sm opacity-90">Lucky Number</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6 text-center">
            <div className="text-4xl font-bold mb-2">42</div>
            <div className="text-sm opacity-90">The Answer</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6 text-center">
            <div className="text-4xl font-bold mb-2">67</div>
            <div className="text-sm opacity-90">Magic Combo</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
