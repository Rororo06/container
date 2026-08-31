import { test, expect } from '@playwright/test';

const addTodo = async (page, text) => {
  await page.getByRole('textbox').fill(text);
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText(text)).toBeVisible();
};

test.describe('Todo app', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('the frontend is served', async ({ page }) => {
    await expect(page).toHaveTitle(/Todo/i);
    await expect(page.getByRole('textbox')).toBeVisible();
  });

  test('a todo can be added', async ({ page }) => {
    await addTodo(page, `Test todo ${Date.now()}`);
  });

  test('a todo can be set as done', async ({ page }) => {
    const text = `Toggle test ${Date.now()}`;
    await addTodo(page, text);

    const row = page.getByText(text).locator('..');
    await expect(row.getByText('This todo is not done')).toBeVisible();

    await row.getByRole('button', { name: 'Set as done' }).click();

    await expect(row.getByText('This todo is done')).toBeVisible();
  });
});

test.describe('Todo backend', () => {
  test('GET /api/todos returns the todos', async ({ request }) => {
    const response = await request.get('/api/todos');

    expect(response.status()).toBe(200);
    expect(Array.isArray(await response.json())).toBe(true);
  });

  test('POST /api/todos creates a todo', async ({ request }) => {
    const newTodo = { text: `API test todo ${Date.now()}`, done: false };

    const response = await request.post('/api/todos', { data: newTodo });

    expect(response.status()).toBe(200);

    const createdTodo = await response.json();
    expect(createdTodo.text).toBe(newTodo.text);
    expect(createdTodo).toHaveProperty('_id');
  });

  test('GET /api/statistics counts the added todos', async ({ request }) => {
    await request.post('/api/todos', {
      data: { text: 'Stats test todo', done: false }
    });

    const response = await request.get('/api/statistics');

    expect(response.status()).toBe(200);

    const stats = await response.json();
    expect(typeof stats.added_todos).toBe('number');
    expect(stats.added_todos).toBeGreaterThan(0);
  });

  test('PUT /api/todos/:id updates a todo', async ({ request }) => {
    const createResponse = await request.post('/api/todos', {
      data: { text: 'Update test todo', done: false }
    });
    const createdTodo = await createResponse.json();

    const updateResponse = await request.put(`/api/todos/${createdTodo._id}`, {
      data: { text: 'Updated todo text', done: true }
    });

    expect(updateResponse.status()).toBe(200);

    const updatedTodo = await updateResponse.json();
    expect(updatedTodo.text).toBe('Updated todo text');
    expect(updatedTodo.done).toBe(true);
  });
});
