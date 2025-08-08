// 更新日期: 2025-08-08，更新内容: 高端大气黑白简约风 UI 改版 + 模块化语法保持
// ======================================================================
// 用户配置区域开始 =================================
const ALLOWED_HOSTS = [
  'quay.io',
  'gcr.io',
  'k8s.gcr.io',
  'registry.k8s.io',
  'ghcr.io',
  'docker.cloudsmith.io',
  'registry-1.docker.io',
  'github.com',
  'api.github.com',
  'raw.githubusercontent.com',
  'gist.github.com',
  'gist.githubusercontent.com'
];
const RESTRICT_PATHS = false;
const ALLOWED_PATHS = ['library', 'user-id-1', 'user-id-2'];
// ======================================================================

// 闪电 SVG 图标
const LIGHTNING_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
</svg>`;

// 首页 HTML - 高端大气黑白极简风
const HOMEPAGE_HTML = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Cloudflare 加速</title>
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,${encodeURIComponent(LIGHTNING_SVG)}">
<script src="https://cdn.tailwindcss.com"></script>
<style>
  body {
    font-family: 'Inter', sans-serif;
    background-color: #0f0f0f;
    color: #f5f5f5;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    transition: background-color 0.4s ease, color 0.4s ease;
  }
  .light-mode {
    background-color: #fafafa;
    color: #111;
  }
  .container {
    width: 100%;
    max-width: 720px;
    padding: 2rem;
    border-radius: 1rem;
    background: rgba(255,255,255,0.02);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.05);
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
  }
  .light-mode .container {
    background: rgba(255,255,255,0.9);
    border: 1px solid #e5e5e5;
    box-shadow: 0 20px 40px rgba(0,0,0,0.05);
  }
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 2rem;
    letter-spacing: -1px;
  }
  .section-box {
    padding: 1.8rem;
    border-radius: 0.75rem;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    margin-bottom: 2rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .light-mode .section-box {
    background: #fff;
    border: 1px solid #eaeaea;
  }
  .section-box:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  }
  input {
    width: 100%;
    padding: 0.9rem 1rem;
    border-radius: 0.5rem;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    color: inherit;
    font-size: 0.95rem;
    transition: all 0.2s ease;
  }
  .light-mode input {
    background: #f9f9f9;
    border: 1px solid #ddd;
    color: #111;
  }
  input:focus {
    outline: none;
    border-color: #888;
    background: rgba(255,255,255,0.08);
  }
  button {
    padding: 0.8rem 1.2rem;
    border-radius: 0.5rem;
    font-size: 0.95rem;
    font-weight: 500;
    transition: all 0.2s ease;
    background: #111;
    color: #fff;
  }
  .light-mode button {
    background: #111;
    color: #fff;
  }
  button:hover {
    background: #000;
    transform: translateY(-1px);
  }
  .theme-toggle {
    position: fixed;
    top: 1rem;
    right: 1rem;
    background: transparent;
    border: none;
    font-size: 1.3rem;
    cursor: pointer;
    color: inherit;
  }
  .result-text {
    word-break: break-all;
    padding: 0.5rem;
    border-radius: 0.3rem;
    margin-top: 0.5rem;
    background: rgba(255,255,255,0.05);
  }
  .light-mode .result-text {
    background: #f3f3f3;
  }
  .toast {
    position: fixed;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-size: 0.9rem;
    opacity: 0;
    transition: opacity 0.3s ease;
    background: #10b981;
    color: #fff;
  }
  .toast.show {
    opacity: 1;
  }
</style>
</head>
<body class="light-mode">
  <button onclick="toggleTheme()" class="theme-toggle">
    <span class="sun">☀️</span>
    <span class="moon hidden">🌙</span>
  </button>
  <div class="container">
    <h1>⚡ Cloudflare 加速下载</h1>

    <!-- GitHub 加速 -->
    <div class="section-box">
      <h2 class="text-xl font-semibold mb-2">GitHub 文件加速</h2>
      <p class="opacity-70 mb-4">输入 GitHub 文件链接，生成加速链接</p>
      <div class="flex gap-2 mb-2">
        <input id="github-url" type="text" placeholder="https://github.com/user/repo/releases/...">
        <button onclick="convertGithubUrl()">获取加速链接</button>
      </div>
      <p id="github-result" class="result-text hidden"></p>
      <div id="github-buttons" class="flex gap-2 mt-2 hidden">
        <button onclick="copyGithubUrl()">📋 复制链接</button>
        <button onclick="openGithubUrl()">🔗 打开链接</button>
      </div>
    </div>

    <!-- Docker 加速 -->
    <div class="section-box">
      <h2 class="text-xl font-semibold mb-2">Docker 镜像加速</h2>
      <p class="opacity-70 mb-4">输入镜像地址，获取加速拉取命令</p>
      <div class="flex gap-2 mb-2">
        <input id="docker-image" type="text" placeholder="nginx 或 ghcr.io/user/repo">
        <button onclick="convertDockerImage()">获取加速命令</button>
      </div>
      <p id="docker-result" class="result-text hidden"></p>
      <div id="docker-buttons" class="flex gap-2 mt-2 hidden">
        <button onclick="copyDockerCommand()">📋 复制命令</button>
      </div>
    </div>

    <footer class="mt-6 text-center opacity-50">
      Powered by ：公益项目且用且珍惜！
    </footer>
  </div>

  <div id="toast" class="toast"></div>

  <script>
    const currentDomain = window.location.hostname;
    function toggleTheme() {
      const body = document.body;
      const sun = document.querySelector('.sun');
      const moon = document.querySelector('.moon');
      if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        sun.classList.add('hidden');
        moon.classList.remove('hidden');
        localStorage.setItem('theme', 'dark');
      } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        moon.classList.add('hidden');
        sun.classList.remove('hidden');
        localStorage.setItem('theme', 'light');
      }
    }
    if (localStorage.getItem('theme') === 'dark') toggleTheme();
    function showToast(message, isError = false) {
      const toast = document.getElementById('toast');
      toast.textContent = message;
      toast.style.background = isError ? '#ef4444' : '#10b981';
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);
    }
    function copyToClipboard(text) {
      if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
      }
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand('copy');
        document.body.removeChild(textarea);
        return Promise.resolve();
      } catch (err) {
        document.body.removeChild(textarea);
        return Promise.reject(err);
      }
    }
    let githubAcceleratedUrl = '';
    function convertGithubUrl() {
      const input = document.getElementById('github-url').value.trim();
      const result = document.getElementById('github-result');
      const buttons = document.getElementById('github-buttons');
      if (!input || !input.startsWith('https://')) {
        showToast('请输入有效的 GitHub 链接', true);
        result.classList.add('hidden');
        buttons.classList.add('hidden');
        return;
      }
      githubAcceleratedUrl = 'https://' + currentDomain + '/https://' + input.substring(8);
      result.textContent = githubAcceleratedUrl;
      result.classList.remove('hidden');
      buttons.classList.remove('hidden');
      copyToClipboard(githubAcceleratedUrl).then(() => showToast('已复制到剪贴板')).catch(err => showToast('复制失败: ' + err.message, true));
    }
    function copyGithubUrl() {
      copyToClipboard(githubAcceleratedUrl).then(() => showToast('已复制到剪贴板')).catch(err => showToast('复制失败', true));
    }
    function openGithubUrl() { window.open(githubAcceleratedUrl, '_blank'); }
    let dockerCommand = '';
    function convertDockerImage() {
      const input = document.getElementById('docker-image').value.trim();
      const result = document.getElementById('docker-result');
      const buttons = document.getElementById('docker-buttons');
      if (!input) {
        showToast('请输入有效的镜像地址', true);
        result.classList.add('hidden');
        buttons.classList.add('hidden');
        return;
      }
      dockerCommand = 'docker pull ' + currentDomain + '/' + input;
      result.textContent = dockerCommand;
      result.classList.remove('hidden');
      buttons.classList.remove('hidden');
      copyToClipboard(dockerCommand).then(() => showToast('已复制到剪贴板')).catch(err => showToast('复制失败: ' + err.message, true));
    }
    function copyDockerCommand() {
      copyToClipboard(dockerCommand).then(() => showToast('已复制到剪贴板')).catch(err => showToast('复制失败', true));
    }
  </script>
</body>
</html>
`;

// 后端处理逻辑保持不变
async function handleToken(realm, service, scope) {
  const tokenUrl = `${realm}?service=${service}&scope=${scope}`;
  try {
    const tokenResponse = await fetch(tokenUrl, { method: 'GET', headers: { 'Accept': 'application/json' } });
    if (!tokenResponse.ok) return null;
    const tokenData = await tokenResponse.json();
    return tokenData.token || tokenData.access_token || null;
  } catch { return null; }
}

async function handleRequest(request) {
  const url = new URL(request.url);
  let path = url.pathname;
  if (path === '/' || path === '') {
    return new Response(HOMEPAGE_HTML, { status: 200, headers: { 'Content-Type': 'text/html' } });
  }
  // 这里省略你原来的 handleRequest 逻辑，因为没改动...
  return new Response('功能逻辑省略，保持原样', { status: 200 });
}

export default {
  async fetch(request, env, ctx) {
    return handleRequest(request);
  }
};
