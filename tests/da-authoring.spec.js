import { expect, test } from '@playwright/test';

const row = (key, value) => `<div><div>${key}</div><div>${value}</div></div>`;
const picture = (src, alt) => `<picture><source srcset="${src}" type="image/png"><img src="${src}" alt="${alt}"></picture>`;
const articleImage = '/icons/icon-partner.png';
const logoImage = '/icons/icon-support.png';

function record(fields, format) {
  return format === 'fields'
    ? fields.map(([key, value]) => row(key, value)).join('')
    : `<div><div>${fields.map(([key, value]) => `<p>${key}: ${value}</p>`).join('')}</div></div>`;
}

function content(format) {
  const media = (alt) => (format === 'fields' ? picture(articleImage, alt) : `${articleImage} | ${alt}`);
  const categories = format === 'fields'
    ? `${row('Featured', '<p>Gaming</p>')}${row('Selected', 'Gaming')}`
    : '<div><div><p>Featured</p><p>Gaming</p><p>Selected: Gaming</p></div></div>';
  const banners = ['Featured', 'Gaming', 'Gaming'].map((category, i) => record([
    ['Category', category], ['Title', `Banner ${i}`], ['Eyebrow', 'Product news'],
    ['Description', `Description ${i}`], ['CTA', `Explore ${i} | /products/${i} | primary`],
    ['Media Theme', 'light'], ['Text Align', 'center'], ['Image', media(`Banner image ${i}`)],
  ], format)).join('');
  const featuredHeader = record([
    ['Heading', "What's New"], ['View More', 'View More Blogs | /blogs | secondary'],
    ['Intro', 'Latest company news.'],
  ], format);
  const articles = [0, 1, 2].map((i) => record([
    ['Tags', 'AI, Robotics (teal)'], ['Date', 'June 7, 2026'], ['Title', `Article ${i}`],
    ['Description', `Article description ${i}`], ['Image', media(`Article image ${i}`)],
  ], format)).join('');
  const carouselHeader = record([
    ['Title', 'Success Stories'], ['Intro', 'Customer stories.'],
    ['CTA', 'See All Success Stories | /stories | secondary'],
  ], format);
  const stories = [0, 1].map((i) => record([
    ['Category', 'Manufacturing'], ['Logo', `Partner ${i}`],
    ['Logo Image', format === 'fields' ? picture(logoImage, `Partner ${i}`) : logoImage],
    ['Title', `Story ${i}`], ['Description', `Story description ${i}`],
    ['CTA', `Read story ${i} | /stories/${i} | tertiary`], ['Image', media(`Story image ${i}`)],
  ], format)).join('');

  return `<div><div class="home-banner">${categories}${banners}</div></div>
    <div><div class="featured">${featuredHeader}${articles}</div></div>
    <div><div class="carousel">${row('Type', 'success-stories')}${row('Controls', 'none')}${carouselHeader}${stories}</div></div>`;
}

for (const format of ['fields', 'paragraphs']) {
  test(`homepage parses ${format} without losing record boundaries or media`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', (error) => {
      // WebKit can defer KUI resize notifications while changing carousel slides.
      if (error.message !== 'ResizeObserver loop completed with undelivered notifications.') {
        errors.push(error.message);
      }
    });
    await page.route('**/authoring-test', (route) => route.fulfill({
      contentType: 'text/html',
      body: `<!doctype html><html><head>
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <link rel="stylesheet" href="/styles/styles.css">
        <link rel="stylesheet" href="/scripts/kui/foundations-react.bundle.css">
        <script type="importmap">{"imports":{"@kui/foundations-react":"/scripts/kui/foundations-react.bundle.js"}}</script>
      </head><body class="appear"><main>${content(format)}</main></body></html>`,
    }));
    await page.goto('/authoring-test');
    await page.evaluate(async (modulePath) => {
      const { decorateSections, decorateBlocks, loadSections } = await import(modulePath);
      const main = document.querySelector('main');
      decorateSections(main);
      decorateBlocks(main);
      await loadSections(main);
    }, '/scripts/aem.js');

    const banner = page.locator('.home-banner');
    await expect(banner.getByRole('radio', { name: 'Gaming', exact: true })).toBeChecked();
    await banner.getByRole('button', { name: 'Pause carousel' }).click();
    await expect(banner.locator('.home-banner-story')).toHaveCount(2);
    await expect(banner.locator('.home-banner-hero')).toHaveCount(2);
    await expect(banner.locator('.home-banner-hero').first()).toHaveClass(/text-center/);
    await expect(banner.locator('.home-banner-hero').first()).toContainText('Description 1');
    await expect(banner.getByRole('link', { name: 'Explore 1' })).toHaveAttribute('href', '/products/1');
    await expect.poll(() => banner.getByAltText('Banner image 1').evaluate((img) => img.naturalWidth)).toBeGreaterThan(0);
    await banner.locator('label').filter({ has: page.getByRole('radio', { name: 'Featured', exact: true }) }).click();
    await expect(banner.locator('.home-banner-story')).toHaveCount(1);
    await expect(banner.locator('.home-banner-hero')).toContainText('Banner 0');

    const featured = page.locator('.featured');
    await expect(featured.getByRole('heading', { name: "What's New", exact: true })).toBeVisible();
    await expect(featured.getByRole('link', { name: 'View More Blogs' })).toHaveAttribute('href', '/blogs');
    await expect(featured.locator('.featured-hero')).toContainText('Article 0');
    await expect(featured.locator('.featured-grid-wrap li')).toHaveCount(2);
    await expect(featured.locator('.featured-img')).toHaveCount(3);
    await expect(featured.getByAltText('Article image 1')).toHaveAttribute('src', /icon-partner\.png$/);

    const carousel = page.locator('.carousel');
    await expect(carousel.getByRole('heading', { name: 'Success Stories', exact: true })).toBeVisible();
    await expect(carousel.getByRole('link', { name: 'See All Success Stories' })).toHaveAttribute('href', '/stories');
    await expect(carousel.getByRole('tab')).toHaveCount(2);
    await carousel.getByRole('tab', { name: 'Show Partner 1 story' }).click();
    await expect(carousel.getByRole('tabpanel')).toContainText('Story description 1');
    await expect(carousel.getByRole('link', { name: 'Read story 1' })).toHaveAttribute('href', '/stories/1');
    await expect(carousel.locator('.carousel-success-image')).toHaveAttribute('src', /icon-partner\.png$/);
    await expect(carousel.locator('.carousel-success-logo img').first()).toHaveAttribute('src', /icon-support\.png$/);
    expect(errors).toEqual([]);
  });
}
