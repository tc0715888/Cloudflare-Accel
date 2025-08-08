// 更新日期: 2025-08-08，更新内容: 为页面函数转换为模块语法

// 用户配置区域开始 =================================
// 以下变量用于配置代理服务的白名单和安全设置，可根据需求修改。

// ALLOWED_HOSTS: 定义允许代理的域名列表（默认白名单）。
// - 添加新域名：将域名字符串加入数组，如 'docker.io'。
// - 注意：仅支持精确匹配的域名（如 'github.com'），不支持通配符。
// - 只有列出的域名会被处理，未列出的域名将返回 400 错误。
// 示例：const ALLOWED_HOSTS = ['github.com', 'docker.io'];
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

// RESTRICT_PATHS: 控制是否限制 GitHub 和 Docker 请求的路径。
// - 设置为 true：只允许 ALLOWED_PATHS 中定义的路径关键字。
// - 设置为 false：允许 ALLOWED_HOSTS 中的所有路径。
// 示例：const RESTRICT_PATHS = true;
const RESTRICT_PATHS = false;

// ALLOWED_PATHS: 定义 GitHub 和 Docker 的允许路径关键字。
// - 添加新关键字：加入数组，如 'user-id-3' 或 'my-repo'。
// - 用于匹配请求路径（如 'library' 用于 Docker Hub 官方镜像）。
// - 路径检查对大小写不敏感，仅当 RESTRICT_PATHS = true 时生效。
// 示例：const ALLOWED_PATHS = ['library', 'my-user', 'my-repo'];
const ALLOWED_PATHS = [
  'library',   // Docker Hub 官方镜像仓库的命名空间
  'user-id-1',
  'user-id-2',
];

// 用户配置区域结束 =================================

// 闪电 SVG 图标（Base64 编码）
const LIGHTNING_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
</svg>`;

// 首页 HTML
const HOMEPAGE_HTML = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Cloudflare 加速面板</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

  :root {
    --bg-dark: #0d0d0d;
    --bg-light: #f9f9f9;
    --text-dark: #111;
    --text-light: #f5f5f5;
    --accent: #4da3ff;
    --card-bg-dark: rgba(255,255,255,0.04);
    --card-bg-light: rgba(255,255,255,0.9);
    --border-dark: rgba(255,255,255,0.08);
    --border-light: #e5e5e5;
  }

  body {
    font-family: 'Inter', sans-serif;
    background: var(--bg-dark);
    color: var(--text-light);
    margin: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    transition: background 0.4s ease, color 0.4s ease;
  }
  body.light-mode {
    background: var(--bg-light);
    color: var(--text-dark);
  }

  .container {
    width: 100%;
    max-width: 760px;
    background: var(--card-bg-dark);
    backdrop-filter: blur(20px);
    border-radius: 1rem;
    padding: 2.5rem;
    border: 1px solid var(--border-dark);
    box-shadow: 0 20px 50px rgba(0,0,0,0.4);
    transition: all 0.4s ease;
  }
  body.light-mode .container {
    background: var(--card-bg-light);
    border: 1px solid var(--border-light);
    box-shadow: 0 20px 40px rgba(0,0,0,0.08);
  }

  h1 {
    font-size: 2.4rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 2rem;
    letter-spacing: -0.5px;
  }

  .section-box {
    background: rgba(255,255,255,0.03);
    padding: 1.8rem;
    border-radius: 0.8rem;
    border: 1px solid rgba(255,255,255,0.06);
    margin-bottom: 2rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  body.light-mode .section-box {
    background: #fff;
    border: 1px solid #eee;
  }
  .section-box:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  }

  label {
    font-weight: 600;
    font-size: 0.95rem;
    display: block;
    margin-bottom: 0.5rem;
  }

  input, select, button {
    width: 100%;
    padding: 0.9rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.05);
    color: inherit;
    font-size: 1rem;
    transition: all 0.3s ease;
    outline: none;
  }
  body.light-mode input,
  body.light-mode select {
    background: #fafafa;
    border: 1px solid #ddd;
    color: var(--text-dark);
  }
  input:focus, select:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 2px rgba(77,163,255,0.3);
  }

  button {
    background: var(--accent);
    border: none;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  button:hover {
    background: #368ae6;
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(77,163,255,0.4);
  }

  .result-box {
    background: rgba(255,255,255,0.05);
    padding: 1rem;
    border-radius: 0.5rem;
    word-break: break-all;
    margin-top: 1rem;
    font-size: 0.95rem;
    border: 1px solid rgba(255,255,255,0.08);
  }
  body.light-mode .result-box {
    background: #f5f5f5;
    border: 1px solid #ddd;
  }

  .toggle-mode {
    display: inline-block;
    cursor: pointer;
    font-size: 0.9rem;
    margin-top: -1rem;
    margin-bottom: 1.5rem;
    text-align: right;
    width: 100%;
    color: var(--accent);
  }
</style>
</head>
<body>
<div class="container">
  <div class="toggle-mode" onclick="document.body.classList.toggle('light-mode')">🌙 切换模式</div>
  <h1>⚡ Cloudflare 加速面板</h1>

  <div class="section-box">
    <label for="target">目标网址</label>
    <input type="text" id="target" placeholder="例如：https://example.com">
  </div>

  <div class="section-box">
    <label for="speed">加速等级</label>
    <select id="speed">
      <option value="1">普通</option>
      <option value="2">快速</option>
      <option value="3">极速</option>
    </select>
  </div>

  <div class="section-box">
    <button onclick="startAccelerate()">🚀 开始加速</button>
    <div class="result-box" id="result">等待输入...</div>
  </div>
</div>

<script>
  function startAccelerate(){
    const url = document.getElementById('target').value.trim();
    const level = document.getElementById('speed').value;
    if(!url){
      document.getElementById('result').textContent = '❌ 请输入网址';
      return;
    }
    document.getElementById('result').textContent = `正在以等级 ${level} 加速 ${url} ...`;
    // 模拟处理逻辑
    setTimeout(()=>{
      document.getElementById('result').textContent = `✅ 加速完成：${url}`;
    },1500);
  }
</script>
</body>
</html>

`;

async function handleToken(realm, service, scope) {
  const tokenUrl = `${realm}?service=${service}&scope=${scope}`;
  console.log(`Fetching token from: ${tokenUrl}`);
  try {
    const tokenResponse = await fetch(tokenUrl, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    if (!tokenResponse.ok) {
      console.log(`Token request failed: ${tokenResponse.status} ${tokenResponse.statusText}`);
      return null;
    }
    const tokenData = await tokenResponse.json();
    const token = tokenData.token || tokenData.access_token;
    if (!token) {
      console.log('No token found in response');
      return null;
    }
    console.log('Token acquired successfully');
    return token;
  } catch (error) {
    console.log(`Error fetching token: ${error.message}`);
    return null;
  }
}

async function handleRequest(request, redirectCount = 0) {
  const MAX_REDIRECTS = 5; // 最大重定向次数
  const url = new URL(request.url);
  let path = url.pathname;

  // 记录请求信息
  console.log(`Request: ${request.method} ${path}`);

  // 首页路由
  if (path === '/' || path === '') {
    return new Response(HOMEPAGE_HTML, {
      status: 200,
      headers: { 'Content-Type': 'text/html' }
    });
  }

  // 处理 Docker V2 API 或 GitHub 代理请求
  let isV2Request = false;
  if (path.startsWith('/v2/')) {
    isV2Request = true;
    path = path.replace('/v2/', '');
  }

  // 提取目标域名和路径
  const pathParts = path.split('/').filter(part => part);
  if (pathParts.length < 1) {
    return new Response('Invalid request: target domain or path required\n', { status: 400 });
  }

  let targetDomain, targetPath, isDockerRequest = false;

  // 检查路径是否以 https:// 或 http:// 开头
  const fullPath = path.startsWith('/') ? path.substring(1) : path;

  if (fullPath.startsWith('https://') || fullPath.startsWith('http://')) {
    // 处理 /https://domain.com/... 或 /http://domain.com/... 格式
    const urlObj = new URL(fullPath);
    targetDomain = urlObj.hostname;
    targetPath = urlObj.pathname.substring(1) + urlObj.search; // 移除开头的斜杠

    // 检查是否为 Docker 请求
    isDockerRequest = ['quay.io', 'gcr.io', 'k8s.gcr.io', 'registry.k8s.io', 'ghcr.io', 'docker.cloudsmith.io', 'registry-1.docker.io'].includes(targetDomain);
  } else {
    // 原有的处理逻辑
    if (!ALLOWED_HOSTS.includes(pathParts[0])) {
      // Docker Hub 默认命名空间（如 nginx）
      isDockerRequest = true;
      targetDomain = 'registry-1.docker.io';
      targetPath = `library/${pathParts.join('/')}`;
    } else {
      // Docker 镜像仓库（如 ghcr.io）或 GitHub 域名（如 github.com）
      targetDomain = pathParts[0];
      targetPath = pathParts.slice(1).join('/') + url.search;
      isDockerRequest = ['quay.io', 'gcr.io', 'k8s.gcr.io', 'registry.k8s.io', 'ghcr.io', 'docker.cloudsmith.io', 'registry-1.docker.io'].includes(targetDomain);
    }
  }

  // 默认白名单检查：只允许 ALLOWED_HOSTS 中的域名
  if (!ALLOWED_HOSTS.includes(targetDomain)) {
    console.log(`Blocked: Domain ${targetDomain} not in allowed list`);
    return new Response(`Error: Invalid target domain.\n`, { status: 400 });
  }

  // 路径白名单检查（仅当 RESTRICT_PATHS = true 时）
  if (RESTRICT_PATHS) {
    const checkPath = isDockerRequest ? targetPath : path;
    console.log(`Checking whitelist against path: ${checkPath}`);
    const isPathAllowed = ALLOWED_PATHS.some(pathString =>
      checkPath.toLowerCase().includes(pathString.toLowerCase())
    );
    if (!isPathAllowed) {
      console.log(`Blocked: Path ${checkPath} not in allowed paths`);
      return new Response(`Error: The path is not in the allowed paths.\n`, { status: 403 });
    }
  }

  // 构建目标 URL
  const targetUrl = isDockerRequest
    ? `https://${targetDomain}/${isV2Request ? 'v2/' : ''}${targetPath}`
    : `https://${targetDomain}/${targetPath}`;
  console.log(`Target URL: ${targetUrl}`);

  // 处理 /v2/ 根请求（Docker 特有）
  if (isDockerRequest && isV2Request && targetPath === '') {
    console.log('Handling /v2/ root request');
    return new Response('{}', {
      status: 200,
      headers: { 'Docker-Distribution-API-Version': 'registry/2.0' }
    });
  }

  // 创建请求
  const newRequestHeaders = new Headers(request.headers);
  newRequestHeaders.set('Host', targetDomain);
  const newRequest = new Request(targetUrl, {
    method: request.method,
    headers: newRequestHeaders,
    body: request.body,
    redirect: 'follow' // 改为 follow 以支持 GitHub 反向代理
  });

  try {
    // 尝试直接请求
    let response = await fetch(newRequest);
    console.log(`Initial response: ${response.status} ${response.statusText}`);

    // 处理 Docker 认证挑战
    if (isDockerRequest && response.status === 401) {
      const wwwAuth = response.headers.get('WWW-Authenticate');
      if (wwwAuth) {
        const authMatch = wwwAuth.match(/Bearer realm="([^"]+)",service="([^"]*)",scope="([^"]*)"/);
        if (authMatch) {
          const [, realm, service, scope] = authMatch;
          console.log(`Auth challenge: realm=${realm}, service=${service || targetDomain}, scope=${scope}`);

          const token = await handleToken(realm, service || targetDomain, scope);
          if (token) {
            const authHeaders = new Headers(request.headers);
            authHeaders.set('Authorization', `Bearer ${token}`);
            authHeaders.set('Host', targetDomain);
            const authRequest = new Request(targetUrl, {
              method: request.method,
              headers: authHeaders,
              body: request.body,
              redirect: 'follow'
            });
            console.log('Retrying with token');
            response = await fetch(authRequest);
            console.log(`Token response: ${response.status} ${response.statusText}`);
          } else {
            console.log('No token acquired, falling back to anonymous request');
            const anonHeaders = new Headers(request.headers);
            anonHeaders.delete('Authorization');
            anonHeaders.set('Host', targetDomain);
            const anonRequest = new Request(targetUrl, {
              method: request.method,
              headers: anonHeaders,
              body: request.body,
              redirect: 'follow'
            });
            response = await fetch(anonRequest);
            console.log(`Anonymous response: ${response.status} ${response.statusText}`);
          }
        } else {
          console.log('Invalid WWW-Authenticate header');
        }
      } else {
        console.log('No WWW-Authenticate header in 401 response');
      }
    }

    // 处理 S3 重定向（Docker 镜像层）
    if (isDockerRequest && (response.status === 307 || response.status === 302)) {
      const redirectUrl = response.headers.get('Location');
      if (redirectUrl && redirectUrl.includes('amazonaws.com')) {
        console.log(`S3 redirect detected: ${redirectUrl}`);
        const EMPTY_BODY_SHA256 = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
        const redirectHeaders = new Headers(request.headers);
        redirectHeaders.set('x-amz-content-sha256', EMPTY_BODY_SHA256);
        redirectHeaders.set('x-amz-date', new Date().toISOString().replace(/[-:T]/g, '').slice(0, -5) + 'Z');
        redirectHeaders.set('Host', new URL(redirectUrl).hostname);
        if (response.headers.get('Authorization')) {
          redirectHeaders.set('Authorization', response.headers.get('Authorization'));
        }

        const redirectRequest = new Request(redirectUrl, {
          method: request.method,
          headers: redirectHeaders,
          body: request.body,
          redirect: 'follow'
        });
        response = await fetch(redirectRequest);
        console.log(`S3 redirect response: ${response.status} ${response.statusText}`);

        if (!response.ok) {
          console.log('S3 request failed, returning original redirect response');
          return new Response(response.body, {
            status: response.status,
            headers: response.headers
          });
        }
      }
    }

    // 复制响应并添加 CORS 头
    const newResponse = new Response(response.body, response);
    newResponse.headers.set('Access-Control-Allow-Origin', '*');
    newResponse.headers.set('Access-Control-Allow-Methods', 'GET, HEAD, POST, OPTIONS');
    if (isDockerRequest) {
      newResponse.headers.set('Docker-Distribution-API-Version', 'registry/2.0');
    }
    return newResponse;
  } catch (error) {
    console.log(`Fetch error: ${error.message}`);
    return new Response(`Error fetching from ${targetDomain}: ${error.message}\n`, { status: 500 });
  }
}

export default {
  async fetch(request, env, ctx) {
    return handleRequest(request);
  }
};
