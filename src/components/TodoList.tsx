import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { CheckCircle2, Circle, Trash2, Plus } from 'lucide-react'

interface Todo {
  id: number
  text: string
  completed: boolean
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn about 6 and 7', completed: true },
    { id: 2, text: 'Explore all pages', completed: false },
    { id: 3, text: 'Click 67 buttons', completed: false },
  ])
  const [newTodo, setNewTodo] = useState('')

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }])
      setNewTodo('')
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Todo List</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          />
          <Button onClick={addTodo} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2">
          {todos.map(todo => (
            <div key={todo.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent">
              <button onClick={() => toggleTodo(todo.id)}>
                {todo.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
              <span className={`flex-1 ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                {todo.text}
              </span>
              <Button
                onClick={() => deleteTodo(todo.id)}
                size="icon"
                variant="ghost"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
