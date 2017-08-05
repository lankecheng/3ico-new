export default function i18n (lang) {
    return require(`./lang/${lang}/index`).default
}
