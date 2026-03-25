from playwright.sync_api import sync_playwright, expect

def verify_feature(page):
  page.goto("http://localhost:3000")
  page.wait_for_timeout(2000)

  print("Testing Login Bypass (Mock Auth)")
  # Check if we need to click the login button
  try:
    page.get_by_role("button", name="Continue with Google").click(timeout=2000)
    page.wait_for_timeout(2000)
  except:
    pass

  print("Testing Navigation...")
  # Sidebar Navigation
  tabs = ["Dashboard", "First Client", "First Sale", "CRM & Leads", "Target Acquisition", "Target Audit", "Automations", "Trending Niches", "Tools", "Addons", "Money Makers", "Demon Mode", "Execution 101", "Glossary", "Competitors", "Objections", "Calculator", "Roadmap", "Mastery", "AI Agent"]

  for tab in tabs:
      try:
          print(f"Clicking tab: {tab}")
          page.get_by_role("button", name=tab).click(timeout=1000)
          page.wait_for_timeout(200)
      except Exception as e:
          print(f"Failed to click {tab}: {e}")

  print("Testing Target Acquisition (LeadGen Pro)...")
  try:
      page.get_by_role("button", name="Target Acquisition").click(timeout=2000)
      page.wait_for_timeout(500)
  except:
      pass

  # Settings
  try:
    page.get_by_role("button", name="Settings", exact=True).click(timeout=1000)
    page.wait_for_timeout(500)
    page.get_by_role("button", name="Save & Close").click(timeout=1000)
  except:
      pass

  # Modes
  try:
    page.get_by_text("Night Shift (Auto)").click(timeout=1000)
    page.wait_for_timeout(200)
    page.get_by_text("Manual Hunt").click(timeout=1000)
    page.wait_for_timeout(200)
  except:
      pass

  # Mode Subtabs
  try:
    page.get_by_text("Global Roulette").click(timeout=1000)
    page.wait_for_timeout(200)
    page.get_by_text("Infinite Loop").click(timeout=1000)
    page.wait_for_timeout(200)
    page.get_by_text("Specific Target").click(timeout=1000)
    page.wait_for_timeout(200)
  except:
      pass

  # Hunt buttons
  print("Starting mock hunt...")
  try:
    page.get_by_role("button", name="Hunt", exact=True).click(timeout=1000)
    page.wait_for_timeout(5000) # Wait for generation
  except:
      pass

  # Check if leads appeared
  page.screenshot(path="verification/verification.png")
  print("Testing completed.")

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
