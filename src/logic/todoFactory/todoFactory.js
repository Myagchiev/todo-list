export default function createTodo(
  title,
  description = '',
  dueDate = null,
  priority = 'low',
  notes = '',
  checklist = []
) {
  return {
    id: Date.now() + Math.random().toString(36).substr(2, 5),
    title,
    description,
    dueDate: dueDate ? new Date(dueDate) : null,
    priority,
    notes,
    checklist: checklist.map((item) => ({
      id: Date.now() + Math.random().toString(36).substr(2, 5),
      text: item.text || item,
      completed: item.completed || false,
    })),
    completed: false,
  };
}