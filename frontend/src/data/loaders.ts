import qs from 'qs';
import { flattenAttributes, getStrapiURL } from '@/lib/utils';
import { unstable_noStore as noStore } from 'next/cache';

const baseUrl = getStrapiURL();

async function fetchData(url: string) {
  const authToken = null; // will be implemented later...
  const headers: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    const response = await fetch(url, authToken ? headers : {});
    const data = await response.json();
    return flattenAttributes(data);
  } catch (error) {
    console.error('Error fetchingdata:', error);
    throw error;
  }
}

export async function getHomePageData() {
  const url = new URL('/api/home-page', baseUrl);
  url.search = qs.stringify({
    populate: {
      blocks: {
        populate: {
          image: {
            fields: ['url', 'alternativeText'],
          },
          link: {
            populate: true,
          },
          feature: {
            populate: true,
          },
        },
      },
    },
  });

  return fetchData(url.href);
}

export async function getGlobalPageData() {
  // manually opting out of caching for the globals data
  noStore();

  const url = new URL('/api/global', baseUrl);
  url.search = qs.stringify({
    populate: [
      'header.logoText',
      'header.ctaButton',
      'footer.logoText',
      'footer.socialLink',
    ],
  });

  return fetchData(url.href);
}
