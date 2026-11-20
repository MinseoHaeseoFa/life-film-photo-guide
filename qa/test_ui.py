import asyncio, json, os, sys, subprocess, time
from playwright.async_api import async_playwright

BASE = "http://127.0.0.1:8777/index.html"
OUT = "/workspace/downloads/life-film-2026-11-20"
os.makedirs(OUT, exist_ok=True)
LIB = "/workspace/.local/lib/chromedeps/usr/lib/x86_64-linux-gnu"
ENV = dict(os.environ)
ENV["LD_LIBRARY_PATH"] = LIB + ":" + ENV.get("LD_LIBRARY_PATH", "")

async def main():
    report = {"console_errors": [], "page_errors": [], "checks": {}}
    srv = subprocess.Popen([sys.executable, "-m", "http.server", "8777", "--bind", "127.0.0.1"],
                           cwd="..",
                           stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(1.2)
    async with async_playwright() as p:
        browser = await p.chromium.launch(env=ENV)
        # ── Desktop 1440 ──────────────────────────────
        ctx = await browser.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=2)
        page = await ctx.new_page()
        page.on("console", lambda m: report["console_errors"].append(m.text) if m.type == "error" else None)
        page.on("pageerror", lambda e: report["page_errors"].append(str(e)))
        await page.goto(BASE, wait_until="networkidle")

        report["checks"]["title"] = await page.title()
        report["checks"]["cards_total"] = await page.locator(".card").count()
        cols = await page.evaluate("getComputedStyle(document.getElementById('grid')).gridTemplateColumns.split(' ').length")
        report["checks"]["desktop_grid_cols"] = cols
        report["checks"]["desktop_no_h_overflow"] = await page.evaluate("document.documentElement.scrollWidth <= document.documentElement.clientWidth")
        report["checks"]["hero_category_chips"] = await page.locator(".chip").count()
        await page.screenshot(path=f"{OUT}/desktop-01-hero.png")
        await page.evaluate("document.getElementById('cards').scrollIntoView()")
        await page.wait_for_timeout(400)
        await page.screenshot(path=f"{OUT}/desktop-02-cards.png")

        # 카테고리 필터
        await page.click('[data-cat="solo"]')
        await page.wait_for_timeout(250)
        report["checks"]["solo_count"] = await page.locator(".card").count()
        await page.screenshot(path=f"{OUT}/desktop-03-filter-solo.png")

        # 검색
        await page.click('[data-cat="all"]')
        await page.fill("#searchInput", "물웅덩이")
        await page.wait_for_timeout(250)
        report["checks"]["search_puddle_count"] = await page.locator(".card").count()
        report["checks"]["search_puddle_title"] = await page.locator(".card h3").first.inner_text()
        await page.fill("#searchInput", "")
        await page.wait_for_timeout(200)

        # 즐겨찾기
        await page.locator('.card__fav[data-fav="puddle"]').click()
        await page.wait_for_timeout(150)
        report["checks"]["fav_pressed"] = await page.get_attribute('.card__fav[data-fav="puddle"]', "aria-pressed")
        report["checks"]["fav_storage"] = await page.evaluate("localStorage.getItem('lifefilm:favs')")
        await page.click("#favFilter")
        await page.wait_for_timeout(200)
        report["checks"]["fav_filter_count"] = await page.locator(".card").count()
        await page.click("#favFilter")
        await page.wait_for_timeout(200)

        # 모달
        await page.click('.card[data-id="puddle"]')
        await page.wait_for_timeout(300)
        report["checks"]["modal_open"] = await page.is_visible("#modal")
        report["checks"]["modal_title"] = await page.inner_text("#mTitle")
        report["checks"]["modal_sources"] = await page.locator("#mSources li").count()
        report["checks"]["modal_steps"] = await page.locator("#mSteps li").count()
        await page.screenshot(path=f"{OUT}/desktop-04-modal-before.png")
        await page.click("#mAfter")
        await page.wait_for_timeout(250)
        report["checks"]["after_active"] = await page.get_attribute("#mAfter", "class")
        await page.screenshot(path=f"{OUT}/desktop-05-modal-after.png")
        await page.click("#mGrid")
        await page.wait_for_timeout(250)
        report["checks"]["grid_pressed"] = await page.get_attribute("#mGrid", "aria-pressed")
        await page.screenshot(path=f"{OUT}/desktop-06-modal-grid.png")
        # 체크리스트
        await page.locator('#mChecks input').first.check()
        await page.wait_for_timeout(150)
        report["checks"]["check_storage"] = await page.evaluate("localStorage.getItem('lifefilm:check:puddle')")
        await page.keyboard.press("Escape")
        await page.wait_for_timeout(250)
        report["checks"]["modal_closed"] = await page.is_hidden("#modal")
        # 체크 유지 확인
        await page.click('.card[data-id="puddle"]')
        await page.wait_for_timeout(250)
        report["checks"]["check_persist"] = await page.locator('#mChecks input').first.is_checked()
        await page.click("#modalClose")
        await page.wait_for_timeout(200)

        # 새로고침 후 즐겨찾기 유지
        await page.reload(wait_until="networkidle")
        report["checks"]["fav_persist"] = await page.get_attribute('.card__fav[data-fav="puddle"]', "aria-pressed")

        # 랜덤
        await page.click("#randomBtn")
        await page.wait_for_timeout(300)
        report["checks"]["random_opens"] = await page.is_visible("#modal")
        await page.click("#modalClose")
        await ctx.close()

        # ── Mobile 390 ────────────────────────────────
        m = await browser.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=3, is_mobile=True, has_touch=True)
        mp = await m.new_page()
        m_err = []
        mp.on("console", lambda x: m_err.append(x.text) if x.type == "error" else None)
        mp.on("pageerror", lambda e: m_err.append(str(e)))
        await mp.goto(BASE, wait_until="networkidle")
        report["checks"]["mobile_no_h_overflow"] = await mp.evaluate("document.documentElement.scrollWidth <= document.documentElement.clientWidth")
        report["checks"]["mobile_scrollWidth"] = await mp.evaluate("document.documentElement.scrollWidth")
        report["checks"]["mobile_clientWidth"] = await mp.evaluate("document.documentElement.clientWidth")
        report["checks"]["mobile_grid_cols"] = await mp.evaluate("getComputedStyle(document.getElementById('grid')).gridTemplateColumns.split(' ').length")
        await mp.screenshot(path=f"{OUT}/mobile-01-hero.png")
        await mp.evaluate("document.getElementById('cards').scrollIntoView()")
        await mp.wait_for_timeout(400)
        await mp.screenshot(path=f"{OUT}/mobile-02-cards.png")
        await mp.click('.chip[data-cat="pose"]')
        await mp.wait_for_timeout(250)
        await mp.screenshot(path=f"{OUT}/mobile-03-filter.png")
        await mp.click('.card[data-id="eye-thirds"]')
        await mp.wait_for_timeout(350)
        await mp.screenshot(path=f"{OUT}/mobile-04-modal-before.png")
        await mp.click("#mAfter")
        await mp.wait_for_timeout(250)
        await mp.click("#mGrid")
        await mp.wait_for_timeout(250)
        await mp.screenshot(path=f"{OUT}/mobile-05-modal-after-grid.png")
        report["checks"]["mobile_modal_overflow"] = await mp.evaluate("document.documentElement.scrollWidth <= document.documentElement.clientWidth")
        # 모바일 모달 스크롤 다운
        await mp.evaluate("document.querySelector('.modal__panel').scrollTop = 700")
        await mp.wait_for_timeout(300)
        await mp.screenshot(path=f"{OUT}/mobile-06-modal-body.png")
        await mp.click("#modalClose")
        report["checks"]["mobile_console_errors"] = m_err
        await m.close()
        await browser.close()
    srv.terminate()
    print(json.dumps(report, ensure_ascii=False, indent=2))

asyncio.run(main())
