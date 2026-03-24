from playwright.sync_api import sync_playwright

def verify_feature(page):
  page.goto("http://localhost:3000")
  page.wait_for_timeout(2000)
  page.screenshot(path="verification/verification.png")

if __name__ == "__main__":
  import os
  os.makedirs("verification/video", exist_ok=True)
  with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(record_video_dir="verification/video")
    page = context.new_page()
    try:
      verify_feature(page)
    finally:
      context.close()
      browser.close()
