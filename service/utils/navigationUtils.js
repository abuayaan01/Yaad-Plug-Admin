// navigationUtils.js
import { useRouter } from 'next/navigation';

const navigateTo = (path) => {
  const router = useRouter();
  
  // Check if the router is available (client side) before pushing to the path
  if (router) {
    router.push(path);
  } else {
    // Handle the case where useRouter is not available
    console.error('Unable to navigate, useRouter is not available.');
  }
};

export { navigateTo };
