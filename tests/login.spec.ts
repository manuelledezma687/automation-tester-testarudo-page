import { test, expect } from '../src/fixtures/index';
import users from '../src/test-data/users.json'


const passwords = {
  admin: process.env.ADMIN_PASSWORD!,
  student:process.env.STUDENT_PASSWORD!,
  invalid:process.env.INVALID_PASSWORD!,
};

test.describe("Login - flujo real desde Home",() => {


  test.beforeEach( async ({page, cookies, menu}) => {
    await page.goto('/');
    await cookies.clickAcceptCookies();
    await menu.clickLoginSection();
  });

test('Login Admin', async ({ loginPage, dashboardPage }) => {
  await loginPage.loginUser(users.adminUser.email, passwords.admin);
  await dashboardPage.isAdminLogged();
});

test('Login Student', async ({ loginPage, dashboardPage }) => {
  await loginPage.loginUser(users.studentUser.email, passwords.student);
  await dashboardPage.isStudentLogged();
});

test('Not valid User', async ({ loginPage, dashboardPage }) => {
  await loginPage.loginUser(users.notValidUser.email, passwords.invalid);
  await dashboardPage.isStudentNotLogged();
});

});
