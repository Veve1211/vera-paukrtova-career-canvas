"""Submit the canonical URLs listed in the deployed production sitemap."""

import json
import re
import subprocess
import time
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import urlsplit
from urllib.request import Request, urlopen

HOST = "verapaukrtova.cz"
ORIGIN = f"https://{HOST}"
ENDPOINT = "https://api.indexnow.org/indexnow"
SITEMAP_NAMESPACE = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}


def get_production_file(path):
    url = f"{ORIGIN}/{path}"
    with urlopen(url, timeout=15) as response:
        if response.status != 200 or response.url != url:
            raise RuntimeError(f"Unexpected response for {url}: {response.status} {response.url}")
        return response.read()


def build_payload(sitemap, key):
    root = ET.fromstring(sitemap)
    urls = list(dict.fromkeys(node.text.strip() for node in root.findall("s:url/s:loc", SITEMAP_NAMESPACE)))
    if not 1 <= len(urls) <= 10_000:
        raise ValueError("Expected 1–10,000 URLs in the sitemap")
    for url in urls:
        parts = urlsplit(url)
        if parts.scheme != "https" or parts.netloc != HOST or parts.fragment:
            raise ValueError(f"Non-canonical sitemap URL: {url}")
    return {
        "host": HOST,
        "key": key,
        "keyLocation": f"{ORIGIN}/{key}.txt",
        "urlList": urls,
    }


def main():
    public = Path(__file__).resolve().parents[1] / "public"
    key_file, = (path for path in public.glob("*.txt") if re.fullmatch(r"[0-9a-f]{32}", path.stem))
    key = key_file.read_text(encoding="utf-8").strip()
    if key != key_file.stem:
        raise ValueError("IndexNow key and filename must match")

    for attempt in range(6):
        try:
            if get_production_file(key_file.name).decode("utf-8").strip() != key:
                raise RuntimeError("Production IndexNow key does not match")
            sitemap = get_production_file("sitemap.xml")
            if sitemap != (public / "sitemap.xml").read_bytes():
                raise RuntimeError("Production sitemap does not match the deployed commit")
            break
        except (OSError, RuntimeError):
            if attempt == 5:
                raise
            time.sleep(10)

    # A newer main commit may land while deployment is propagating.
    head = subprocess.check_output(["git", "rev-parse", "HEAD"], text=True).strip()
    main_ref = subprocess.check_output(
        ["git", "ls-remote", "origin", "refs/heads/main"], text=True
    ).split()[0]
    if head != main_ref:
        print("Skipping IndexNow for a superseded deployment")
        return

    request = Request(
        ENDPOINT,
        data=json.dumps(build_payload(sitemap, key)).encode("utf-8"),
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST",
    )
    with urlopen(request, timeout=20) as response:
        if response.status not in (200, 202):
            raise RuntimeError(f"Unexpected IndexNow response: HTTP {response.status}")
        print(f"IndexNow accepted the submission (HTTP {response.status})")


if __name__ == "__main__":
    main()
