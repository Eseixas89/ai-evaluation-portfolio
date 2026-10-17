"""Inspect deployed public HTML and assets; normal TLS verification stays on.
Run from the repository root: python tests/launch-checks.py
Use --include-launch after launch-readiness.html has been deployed.
"""
import concurrent.futures
import datetime
from html.parser import HTMLParser
import json
from pathlib import Path
import struct
import subprocess
import sys
import xml.etree.ElementTree as ET

BASE = 'https://eseixas89.github.io/ai-evaluation-portfolio/'


class Metadata(HTMLParser):
    def __init__(self):
        super().__init__()
        self.meta, self.resources, self.analytics = {}, [], []
        self.canonical = self.favicon = None
        self.title, self.in_title = '', False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'title':
            self.in_title = True
        if tag == 'meta':
            self.meta[attrs.get('property', attrs.get('name', ''))] = attrs.get('content', '')
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonical = attrs.get('href')
        if tag == 'link' and attrs.get('rel') == 'icon':
            self.favicon = attrs.get('href')
        if tag in ['img', 'script', 'link']:
            self.resources.append(attrs.get('src', attrs.get('href', '')))
        if tag == 'script' and any(provider in attrs.get('src', '') for provider in
                                  ['cloudflareinsights', 'googletagmanager', 'google-analytics', 'goatcounter', 'plausible', 'umami']):
            self.analytics.append(attrs.get('src'))

    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False

    def handle_data(self, value):
        if self.in_title:
            self.title += value


def fetch(name):
    result = subprocess.run(['curl', '--fail', '--silent', '--show-error', '--location',
                             '--max-time', '25', '--write-out',
                             '\n%{http_code} %{ssl_verify_result} %{url_effective}', BASE + name],
                            capture_output=True, timeout=30)
    if result.returncode:
        raise RuntimeError(name + ': ' + result.stderr.decode())
    body, details = result.stdout.rsplit(b'\n', 1)
    status, tls, url = details.decode().split(' ', 2)
    return body, {'path': name, 'status': int(status), 'tlsVerificationResult': int(tls), 'url': url}


def check(name):
    try:
        raw, row = fetch(name)
        parser = Metadata()
        parser.feed(raw.decode())
        row.update(title=parser.title, description=parser.meta.get('description'),
                   canonical=parser.canonical, ogImage=parser.meta.get('og:image'),
                   twitterCard=parser.meta.get('twitter:card'), favicon=parser.favicon,
                   mixedContentResources=[url for url in parser.resources if url.startswith('http:')],
                   analyticsScripts=parser.analytics)
        expected = BASE + ('' if name == 'index.html' else name)
        failures = []
        if row['status'] != 200 or row['tlsVerificationResult'] != 0 or not row['url'].startswith('https:'):
            failures.append('HTTPS response or certificate verification')
        if not parser.title or not row['description'] or not parser.favicon:
            failures.append('Missing title, description or favicon')
        if row['mixedContentResources']:
            failures.append('HTTP subresource reference')
        if name != '404.html':
            if parser.canonical != expected:
                failures.append('Unexpected canonical: ' + str(parser.canonical))
            if row['ogImage'] != BASE + 'assets/social-preview.png':
                failures.append('Unexpected social image: ' + str(row['ogImage']))
            if row['twitterCard'] != 'summary_large_image':
                failures.append('Unexpected Twitter card: ' + str(row['twitterCard']))
        row['failures'], row['passed'] = failures, not failures
        return row
    except Exception as error:
        return {'path': name, 'passed': False, 'error': str(error)}


names = sorted(page.name for page in Path('.').glob('*.html')
               if page.name != 'launch-readiness.html' or '--include-launch' in sys.argv)
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
    pages = list(executor.map(check, names))
favicon, favicon_check = fetch('favicon.svg')
ET.fromstring(favicon)
image, image_check = fetch('assets/social-preview.png')
dimensions = struct.unpack('>II', image[16:24])
assert dimensions == (1200, 630)
report = {
    'checkedAt': datetime.datetime.now(datetime.timezone.utc).isoformat(),
    'method': 'Public HTTPS GET with normal certificate verification; deployed HTML metadata inspected',
    'finalUrl': BASE,
    'addressChoice': 'Existing free GitHub Pages subdomain retained under the portal Q&A fallback; no paid custom domain or DNS change made.',
    'pages': pages, 'favicon': favicon_check,
    'socialPreview': dict(image_check, width=dimensions[0], height=dimensions[1]),
    'analytics': {'status': 'script detected; collection not verified' if any(page.get('analyticsScripts') for page in pages) else 'not installed', 'reason': 'A dashboard visit must be verified separately; script detection alone does not prove collection.'},
    'badge': {'status': 'awaiting issued credential details', 'reason': 'No issued credential ID has been provided; issuance status has not been confirmed.'},
    'physicalPhoneRecheck': {'status': 'pending', 'device': 'Samsung A15', 'note': 'Earlier testing is recorded separately; this assignment requests opening the address again.'},
    'sharePreviewPlatformCheck': 'Metadata and image delivery checked; platform-specific cache refresh not observed.',
    'passedPublicChecks': all(page['passed'] for page in pages),
}
Path('assets/launch').mkdir(exist_ok=True)
Path('assets/launch/launch-checks.json').write_text(json.dumps(report, indent=2) + '\n')
print(json.dumps({'pages': len(pages), 'passed': report['passedPublicChecks'],
                  'failures': [page for page in pages if not page['passed']]}, indent=2))
sys.exit(0 if report['passedPublicChecks'] else 1)
