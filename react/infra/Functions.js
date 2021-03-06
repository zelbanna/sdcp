export async function post_call(url = '', args = {}, headers = {}) {
 const response = await fetch(url, { method:'POST', headers: {'Content-Type': 'application/json', ...headers}, credentials:'include', body: JSON.stringify(args) })
 return await response.json();
}

export async function auth_call(args = {}) {
 const response = await fetch('auth', { method:'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(args) })
 return await response.json();
}

export const rnd = () => Math.floor(Math.random() * 10);

export const int2ip = (x) => ((x >> 24) & 255) + '.' + ((x >> 16) & 255) + '.' + ((x >> 8) & 255) + '.' + (x & 255);

export const ip2int = (x) => (x.split('.').reduce((a, v) => ((a << 8) + (+v)), 0) >>> 0);
