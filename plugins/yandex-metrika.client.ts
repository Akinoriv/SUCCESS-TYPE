/**
 * Плагин для инициализации Яндекс.Метрики
 */
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  if (process.client && config.public.yandexMetrikaId) {
    // Создаём скрипт для загрузки Яндекс.Метрики
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = `
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

      ym(${config.public.yandexMetrikaId}, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
      });
    `;

    document.head.appendChild(script);

    // Создаём noscript тег для случаев без JavaScript
    const noscript = document.createElement("noscript");
    noscript.innerHTML = `
      <div><img src="https://mc.yandex.ru/watch/${config.public.yandexMetrikaId}" style="position:absolute; left:-9999px;" alt="" /></div>
    `;
    document.body.appendChild(noscript);
  }
});
