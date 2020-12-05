import { getRandom } from '../utils/functions.js';
import dictionary from '../dictionary.js';

export const getTime = () => {
  const time = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return `${getRandom(dictionary.responses.time)} ${time} ${getRandom(
    dictionary.emoticons.time
  )}`;
};
