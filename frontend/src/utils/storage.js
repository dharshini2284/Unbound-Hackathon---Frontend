export function setApiKey(k){ localStorage.setItem('apiKey', k) }
export function getApiKey(){ return localStorage.getItem('apiKey') }
export function clearApiKey(){ localStorage.removeItem('apiKey') }
