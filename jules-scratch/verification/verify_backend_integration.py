from playwright.sync_api import sync_playwright, expect
import os
import re

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the local index.html file
        file_path = os.path.abspath('index.html')
        page.goto(f'file://{file_path}')

        # Select "English" as the output language and "Friendly" for style
        page.select_option("#output-language", "en")
        page.select_option("#email-style", "friendly")

        # Fill in the context and draft
        page.locator("#email-context").fill("The project deadline is approaching fast.")
        page.locator("#user-draft").fill("We need to hurry up.")

        # Click the improve button
        page.locator("#improve-btn").click()

        # 1. Wait for the "improving" message to appear.
        expect(page.locator("#improved-draft")).to_have_value("Improving your draft...", timeout=1500)

        # 2. Wait for the server's response to be populated.
        # We check for the placeholder text from the server.
        expect(page.locator("#improved-draft")).to_have_value(
            re.compile("This is a much-improved, AI-generated response"),
            timeout=5000
        )

        # 3. Check if the style and context were correctly received by the server
        expect(page.locator("#improved-draft")).to_contain_text("It has a 'friendly' tone")
        expect(page.locator("#improved-draft")).to_contain_text("The project deadline is approaching fast.")


        # Take a screenshot
        page.screenshot(path="jules-scratch/verification/verification.png")

        browser.close()

if __name__ == "__main__":
    run_verification()