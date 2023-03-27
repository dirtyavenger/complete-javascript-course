import { TIMEOUT_SEC } from './config.js';

const timeout = function (s = TIMEOUT_SEC) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeout()]);

    const data = await response.json();

    if (!response.ok)
      throw new Error(`${data.message} Status code:${response.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });

    const response = await Promise.race([fetchPro, timeout()]);

    const data = await response.json();

    if (!response.ok)
      throw new Error(`${data.message} Status code:${response.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};
