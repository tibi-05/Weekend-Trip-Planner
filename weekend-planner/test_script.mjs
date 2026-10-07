import puppeteer from 'puppeteer';
import { spawn } from 'child_process';

(async () => {
  console.log("Starting Next.js dev server...");
  const server = spawn('npm', ['run', 'dev'], { stdio: 'ignore', shell: true });
  
  console.log("Waiting for server to be ready (8 seconds)...");
  await new Promise(r => setTimeout(r, 8000));

  console.log("Launching Puppeteer...");
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 1200 });
  
  let retries = 5;
  while (retries > 0) {
    try {
      console.log("Navigating to http://localhost:3000...");
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
      break;
    } catch (e) {
      console.log("Retrying navigation...");
      retries--;
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  // 1. Initial State
  await page.screenshot({ path: 'screenshot_initial.png' });
  console.log("Captured initial state.");

  // 2. £120, 2-day overnight, Outdoors and Food
  await new Promise(r => setTimeout(r, 1000));
  
  await page.evaluate(() => {
    const radios = Array.from(document.querySelectorAll('input[type="radio"]'));
    const overnight = radios.find(r => r.value === '2-day overnight');
    if (overnight) overnight.click();
    
    const numberInput = document.querySelector('input[type="number"]');
    if (numberInput) {
        numberInput.value = '';
    }
  });
  
  await page.type('input[type="number"]', '120');

  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button[type="button"]'));
    const outdoors = buttons.find(b => b.textContent.includes('Outdoors'));
    const food = buttons.find(b => b.textContent.includes('Food'));
    if (outdoors) outdoors.click();
    if (food) food.click();
  });
  
  await page.click('button[type="submit"]');
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'screenshot_plan.png' });
  console.log("Captured plan state (£120).");
  
  // 3. £0 budget fallback
  await page.evaluate(() => {
    const numberInput = document.querySelector('input[type="number"]');
    if (numberInput) {
        numberInput.value = '';
    }
  });
  
  await page.type('input[type="number"]', '0');
  await page.click('button[type="submit"]');
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'screenshot_fallback.png' });
  console.log("Captured fallback state (£0).");
  
  await browser.close();
  server.kill();
  console.log("Done.");
  process.exit(0);
})();
