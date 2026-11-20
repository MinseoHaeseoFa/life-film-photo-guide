#!/usr/bin/env python3
"""67장 신규 이미지 생성 → 900px 폭 JPEG(q80) 경량화.
사용: python3 qa/gen_images.py [from] [to] [parallel]
"""
import os, subprocess, sys
from concurrent.futures import ThreadPoolExecutor

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TSV = os.path.join(ROOT, 'qa', 'img-prompts.tsv')
OUT = os.path.join(ROOT, 'assets', 'img')
STYLE = (', 35mm film photograph, editorial travel photography, natural film grain, '
         'soft muted colors, shallow depth of field, warm cinematic light, '
         'no text, no watermark, no borders')

rows = []
with open(TSV, encoding='utf-8') as f:
    next(f)
    for line in f:
        line = line.rstrip('\n')
        if not line.strip():
            continue
        slug, prompt = line.split('\t', 1)
        rows.append((slug, prompt))

start = int(sys.argv[1]) if len(sys.argv) > 1 else 0
end = int(sys.argv[2]) if len(sys.argv) > 2 else len(rows)
par = int(sys.argv[3]) if len(sys.argv) > 3 else 5
todo = rows[start:end]


def one(item):
    slug, prompt = item
    dst = os.path.join(OUT, slug + '.jpg')
    rel = os.path.join('life-film-photo-guide', 'assets', 'img', slug + '.jpg')
    r = subprocess.run(['images', prompt + STYLE, '--out', rel],
                       capture_output=True, text=True, cwd='/workspace')
    if r.returncode != 0:
        return f'FAIL {slug}: {(r.stdout + r.stderr).strip()[:200]}'
    # 900px 폭, quality 80
    from PIL import Image
    im = Image.open(dst).convert('RGB')
    w, h = im.size
    nw = 900
    nh = round(h * nw / w)
    im = im.resize((nw, nh), Image.LANCZOS)
    im.save(dst, 'JPEG', quality=80, optimize=True, progressive=True)
    return f'OK {slug} {nw}x{nh} {os.path.getsize(dst)//1024}KB'


with ThreadPoolExecutor(max_workers=par) as ex:
    for msg in ex.map(one, todo):
        print(msg, flush=True)
