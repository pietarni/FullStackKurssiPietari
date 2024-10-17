const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const usernamefield = await page.getByText('username')
    const passfield = await page.getByText('password')
    await expect(usernamefield).toBeVisible()
    await expect(passfield).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
        await page.getByTestId('username').fill('mluukkai')
        await page.getByTestId('password').fill('salainen')
        await page.getByRole('button', { name: 'login' }).click()
        await expect(page.getByText('Logged in!')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
        await page.getByTestId('username').fill('mluukkai')
        await page.getByTestId('password').fill('wrong')
        await page.getByRole('button', { name: 'login' }).click()
        await expect(page.getByText('wrong credentials')).toBeVisible()
    })
  })
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173')

        await page.getByTestId('username').fill('mluukkai')
        await page.getByTestId('password').fill('salainen')
        await page.getByRole('button', { name: 'login' }).click()
    })
  
    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'add blog' }).click() 
      await page.getByTestId('blogTitle').fill('titteli')
      await page.getByTestId('blogAuthor').fill('authori')
      await page.getByTestId('blogURL').fill('urli')
      await page.getByRole('button', { name: 'create' }).click()

      await expect(page.getByText('titteli authori')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'add blog' }).click() 
        await page.getByTestId('blogTitle').fill('titteli2')
        await page.getByTestId('blogAuthor').fill('authori2')
        await page.getByTestId('blogURL').fill('urli')
        await page.getByRole('button', { name: 'create' }).click()
  
        await expect(page.getByText('titteli2 authori2')).toBeVisible()

        await page.getByRole('button', { name: 'show details' }).click()

        await page.getByRole('button', { name: 'like' }).click()
      })

      test('a self made blog can be deleted', async ({ page }) => {
        await page.getByRole('button', { name: 'add blog' }).click() 
        await page.getByTestId('blogTitle').fill('titteli3')
        await page.getByTestId('blogAuthor').fill('authori3')
        await page.getByTestId('blogURL').fill('urli')
        await page.getByRole('button', { name: 'create' }).click()
  
        await expect(page.getByText('titteli3 authori3')).toBeVisible()

        await page.getByRole('button', { name: 'show details' }).click()
        
        page.on('dialog', async (dialog) => {
            console.log(`Dialog message: ${dialog.message()}`);
            
            await dialog.accept();
          });

        await page.getByRole('button', { name: 'Delete' }).click()
        
        await expect(page.getByText('titteli2 authori2')).not.toBeVisible()
      })

      test('only owner of blogpost can delete', async ({ page,request }) => {
        await request.post('http://localhost:3003/api/users', {
        data: {
            name: 'Matti Luukkainen2',
            username: 'mluukkai2',
            password: 'salainen'
        }
        })
        
        await page.getByRole('button', { name: 'add blog' }).click() 
        await page.getByTestId('blogTitle').fill('titteli4')
        await page.getByTestId('blogAuthor').fill('authori4')
        await page.getByTestId('blogURL').fill('urli')
        await page.getByRole('button', { name: 'create' }).click()
  
        await expect(page.getByText('titteli4 authori4')).toBeVisible()
        
        await page.getByRole('button', { name: 'logout' }).click()

        await page.getByTestId('username').fill('mluukkai2')
        await page.getByTestId('password').fill('salainen')
        await page.getByRole('button', { name: 'login' }).click()
        await page.getByRole('button', { name: 'show details' }).click()
        await expect(page.getByRole('button', { name: 'Delete' })).not.toBeVisible()
      })

      test.only('Blogs are sorted', async ({ page }) => {
  
        for (let i = 0; i < 5; i++) {
            const likes = i;

            await page.getByRole('button', { name: 'add blog' }).click();
            await page.getByTestId('blogTitle').fill(`Title${i}`);
            await page.getByTestId('blogAuthor').fill(`Author${i}`);
            await page.getByTestId('blogURL').fill(`http://url${i}.com`);
            await page.getByRole('button', { name: 'create' }).click();
        
            await expect(page.getByText(`Title${i} Author${i}`)).toBeVisible();
            const blogParent = await page.getByText(`Title${i} Author${i}`)
            //const blogElement = await blogParent.locator('.')
            await blogParent.getByRole('button', { name: 'show details' }).click();
            
            for (let j = 0; j < likes; j++) {
                await blogParent.getByRole('button', { name: 'like' }).click();
            }
        }
        const blogs = await page.locator('.blog');
        const numberOfBlogs = await blogs.count();
        const lastLike = Infinity
        for (let i = 0; i < numberOfBlogs; i++) {
            const likeElement = await blogs.nth(i).getByTestId('likes-count');
            const likeText = await likeElement.textContent();
            const parts = likeText.split(" ");
            const likeCount = parseInt(parts[1]);
            expect(likeCount).toBeLessThanOrEqual(lastLike);
        }
     })
  })
})