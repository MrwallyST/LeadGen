import subprocess
import sys

def verify_build():
    print("Running production build check (npm run build)...")
    try:
        # Run Vite build to catch any TypeScript, import, or syntax errors
        result = subprocess.run(["npm", "run", "build"], capture_output=True, text=True, check=True, shell=True)
        print("✅ SUCCESS: Build compiled perfectly. No TypeScript or syntax errors found.")
        print(result.stdout)
        sys.exit(0)
    except subprocess.CalledProcessError as e:
        print("❌ ERROR: Build failed. There are code or dependency issues that need fixing.", file=sys.stderr)
        print(e.stdout, file=sys.stderr)
        print(e.stderr, file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    verify_build()
