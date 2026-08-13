import os
from playwright.sync_api import sync_playwright

def run_cuj(page):
    # Capture and print all console messages
    page.on("console", lambda msg: print(f"[BROWSER CONSOLE] {msg.text}"))

    print("Navigating to homepage...")
    page.goto("http://localhost:8080")

    # Wait for hydration
    print("Waiting for hydration...")
    page.wait_for_timeout(4000)

    # Scroll down to pricing section to make sure it's loaded/rendered
    print("Scrolling to pricing section...")
    pricing_header = page.locator("#pricing")
    pricing_header.scroll_into_view_if_needed()
    page.wait_for_timeout(1000)

    # Click the GROWTH pricing plan card button on the homepage
    print("Clicking Growth plan start button...")
    growth_btn = page.locator("a:has-text('$ start --growth')").first
    growth_btn.scroll_into_view_if_needed()
    page.wait_for_timeout(500)
    growth_btn.click()
    page.wait_for_timeout(1500)

    print(f"URL after click: {page.url}")
    assert "plan=growth" in page.url, "Error: URL does not contain plan=growth"

    # Scroll to the audit section to make sure it is in view
    print("Scrolling to audit section...")
    page.locator("#audit").scroll_into_view_if_needed()
    page.wait_for_timeout(1000)

    # Ensure selected plan badge is visible
    badge = page.get_by_text("[ selected plan: growth ]")
    assert badge.is_visible(), "Error: [ selected plan: growth ] badge is NOT visible!"
    print("Success: Selected plan badge verified visible on page!")

    page.screenshot(path="verification/screenshots/verification.png")
    page.wait_for_timeout(1000)

    # Click clear button
    print("Clicking clear button...")
    clear_btn = page.get_by_role("button", name="Clear selected plan")
    clear_btn.click()
    page.wait_for_timeout(1500)

    print(f"URL after clear: {page.url}")
    assert "plan=" not in page.url, "Error: URL still contains plan query param"
    assert not badge.is_visible(), "Error: selected plan badge is STILL visible"
    print("Success: Selected plan badge verified cleared and removed!")

    page.screenshot(path="verification/screenshots/verification_cleared.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    os.makedirs("verification/screenshots", exist_ok=True)
    os.makedirs("verification/videos", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        except Exception as e:
            print(f"Exception: {e}")
            raise e
        finally:
            context.close()
            browser.close()
