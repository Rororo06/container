import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'

import Todo from './Todo'

const todo = { _id: '1', text: 'Write a test for the Todo component', done: false }

test('renders the text of an unfinished todo', () => {
  render(<Todo todo={todo} deleteTodo={() => {}} completeTodo={() => {}} />)

  expect(screen.getByText(todo.text)).toBeDefined()
  expect(screen.getByText('This todo is not done')).toBeDefined()
})

test('renders a finished todo without the complete button', () => {
  render(<Todo todo={{ ...todo, done: true }} deleteTodo={() => {}} completeTodo={() => {}} />)

  expect(screen.getByText('This todo is done')).toBeDefined()
  expect(screen.queryByText('Set as done')).toBeNull()
})

test('calls completeTodo with the todo when the button is clicked', async () => {
  const completeTodo = vi.fn()
  render(<Todo todo={todo} deleteTodo={() => {}} completeTodo={completeTodo} />)

  await userEvent.click(screen.getByText('Set as done'))

  expect(completeTodo).toHaveBeenCalledWith(todo)
})
