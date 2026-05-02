import { test, expect } from '../src/fixtures/index';
import users from '../src/test-data/users.json'


const passwords = {
  admin: process.env.ADMIN_PASSWORD!,
  student:process.env.STUDENT_PASSWORD!,
  invalid:process.env.INVALID_PASSWORD!,
};

test.describe("Admin - Smoke test",() => {


  test.beforeEach( async ({page, cookies, menu, loginPage, dashboardPage}) => {
    await page.goto('/');
    await cookies.clickAcceptCookies();
    await menu.clickLoginSection();
    await loginPage.loginUser(users.adminUser.email, passwords.admin);
    await dashboardPage.isAdminLogged();
  });

test('Admin filter by user', async ({ page }) => {
  await page.getByTestId('nav-admin-users').click();
  await page.getByTestId('users-search-input').click();
  await page.getByTestId('users-search-input').fill('testcomprauno');
  await expect(page.getByRole('cell', { name: 'testcomprauno@yopmail.com' })).toBeVisible();
});

test.only('Admin new blog', async ({ page }) => {
  const postTitle = `E2E Post ${Date.now()}`;
  await page.getByTestId('nav-admin-blog').click();
  await page.getByRole('link', { name: '+ Nuevo Post' }).click();
  await page.getByRole('textbox', { name: 'Post title' }).click();
  await page.getByRole('textbox', { name: 'Post title' }).fill(postTitle);
  await page.getByRole('paragraph').filter({ hasText: /^$/ }).click();
  await page.getByRole('textbox').nth(2).fill('test blog');
  await page.getByRole('button', { name: 'Save draft' }).click();
  await expect.soft(page.getByRole('cell', { name: postTitle })).toBeVisible();
  await expect.soft(page.getByText('draft').first()).toBeVisible();
  await expect.soft(page.getByRole('link', { name: 'Editar' }).first()).toBeVisible();
});

});

test.describe("Student - Smoke test",() => {


  test.beforeEach( async ({page, cookies, menu, loginPage, dashboardPage}) => {
    await page.goto('/');
    await cookies.clickAcceptCookies();
    await menu.clickLoginSection();
    await loginPage.loginUser(users.studentUser.email, passwords.student);
    await dashboardPage.isStudentLogged();
  });

test('Student see enrolled course', async ({ page }) => {
  await page.getByTestId('nav-courses').click();
  await expect(page.getByRole('heading', { name: 'Curso Básico de Cypress' })).toBeVisible();
});

});
