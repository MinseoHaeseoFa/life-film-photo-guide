import asyncio, os, subprocess, sys, time
from playwright.async_api import async_playwright

LIB = "/workspace/.local/lib/chromedeps/usr/lib/x86_64-linux-gnu"
ENV = dict(os.environ); ENV["LD_LIBRARY_PATH"] = LIB + ":" + ENV.get("LD_LIBRARY_PATH", "")
OUT = "/workspace/downloads/life-film-2026-11-20/qa"
os.makedirs(OUT, exist_ok=True)

async def main():
    srv = subprocess.Popen([sys.executable, "-m", "http.server", "8777", "--bind", "127.0.0.1"],
                           cwd="..",
                           stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(1.2)
    async with async_playwright() as p:
        b = await p.chromium.launch(env=ENV)
        ctx = await b.new_context(viewport={"width": 1440, "height": 950}, device_scale_factor=2)
        pg = await ctx.new_page()
        await pg.goto("http://127.0.0.1:8777/index.html", wait_until="networkidle")
        for cid in ["puddle", "eye-thirds", "selfie-height", "night-city", "overhead-food" if False else "food-overhead"]:
            await pg.click(f'.card[data-id="{cid}"]')
            await pg.wait_for_timeout(300)
            await pg.click("#mAfter")
            await pg.click("#mGrid")
            await pg.wait_for_timeout(300)
            await pg.locator(".vf").screenshot(path=f"{OUT}/{cid}-after-grid.png")
            await pg.click("#mBefore")
            await pg.wait_for_timeout(200)
            await pg.locator(".vf").screenshot(path=f"{OUT}/{cid}-before.png")
            print(cid, "lines:", await pg.evaluate("document.querySelectorAll('#mStage line').length"))
            await pg.click("#modalClose")
            await pg.wait_for_timeout(200)
        await b.close()
    srv.terminate()

asyncio.run(main())
