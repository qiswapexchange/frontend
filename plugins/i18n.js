import Cookie from 'cookie';
import { createLocaleFromRouteGetter } from '~/.nuxt/nuxt-i18n/utils-common';
import {
  detectBrowserLanguage,
  localeCodes,
  vueI18n,
  routesNameSeparator,
  defaultLocaleRouteNameSuffix,
} from '~/.nuxt/nuxt-i18n/options';
const getLocaleFromRoute = createLocaleFromRouteGetter(localeCodes, {
  routesNameSeparator,
  defaultLocaleRouteNameSuffix,
});

export default ({ route, isHMR, req, res, redirect }) => {
  if (isHMR) {
    return;
  }
  const setLocaleCookie = (locale) => {
    const date = new Date();
    const cookieOptions = {
      expires: new Date(date.setDate(date.getDate() + 365)),
      path: '/',
      sameSite: 'lax',
    };
    if (res) {
      let headers = res.getHeader('Set-Cookie') || [];
      if (typeof headers === 'string') {
        headers = [headers];
      }
      const redirectCookie = Cookie.serialize(cookieKey, locale, cookieOptions);
      headers.push(redirectCookie);
      res.setHeader('Set-Cookie', headers);
    }
  };

  const routeLocale = getLocaleFromRoute(route);
  const { cookieKey } = detectBrowserLanguage;
  let cookieLocale;
  if (req && typeof req.headers.cookie !== 'undefined') {
    const cookies =
      req.headers && req.headers.cookie ? Cookie.parse(req.headers.cookie) : {};
    cookieLocale = cookies[cookieKey];
  }
  // redirect for root
  if (routeLocale === null) {
    // cookie first
    let redirectLocale = cookieLocale;
    // browser second
    if (
      !redirectLocale &&
      req &&
      typeof req.headers['accept-language'] !== 'undefined'
    ) {
      redirectLocale = req.headers['accept-language']
        .split(',')[0]
        .toLocaleLowerCase()
        .substring(0, 2);
    }
    // fallback third
    if (!localeCodes.includes(redirectLocale)) {
      redirectLocale = vueI18n.fallbackLocale;
    }
    if (req && req.headers) {
      req.headers.cookie += `;${cookieKey}=${routeLocale}`;
    }
    setLocaleCookie(redirectLocale);
    redirect(
      `/${redirectLocale}${route.path}`.replace(/^(.+)?\/+$/, '$1'),
      route.query
    );
    return res.end();
  }
  // redirect for not matching cookie
  if (routeLocale !== null && routeLocale !== cookieLocale) {
    if (req && req.headers) {
      if (req.headers.cookie) {
        req.headers.cookie = req.headers.cookie.replace(
          new RegExp(`${cookieKey}=${cookieLocale}`),
          `${cookieKey}=${routeLocale}`
        );
      } else {
        req.headers.cookie = `${cookieKey}=${routeLocale}`;
      }
    }
    setLocaleCookie(routeLocale);
  }
};
