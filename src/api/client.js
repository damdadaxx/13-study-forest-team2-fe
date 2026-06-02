const BASE_URL = import.meta.env.VITE_API_BASE_URL; // .env.~ 에서 주입된 기본 URL

// 모든 API 호출의 공통 로직을 담당하는 함수
async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers, // 호출 시 추가 헤더가 있으면 병합
    },
    ...options, // method, body 등 나머지 옵션 병합
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || `${res.status} ${res.statusText}`);
  }
  return res.json();
}

export const get = (path) => request(path);
export const post = (path, body) =>
  request(path, { method: 'POST', body: JSON.stringify(body) });
export const patch = (path, body) =>
  request(path, { method: 'PATCH', body: JSON.stringify(body) });
export const del = (path) => request(path, { method: 'DELETE' });
