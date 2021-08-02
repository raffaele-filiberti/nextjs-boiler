declare global {
  interface Window {
    gtag: any;
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string): void => {
  window.gtag('config', process.env.GA_TRACKING_ID, {
    page_path: url,
    anonymize_ip: true,
  });
};

type Options = {
  action: string;
  category: string;
  label: string;
  value: string;
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = (
  {
    action,
    category,
    label,
    value,
  }: Options,
): void => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};
