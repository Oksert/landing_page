export default function initAnalytic (resourseId) {
    window.ga('create', resourseId, 'auto');
    window.ga('send', 'pageview');
    window.addEventListener("hashchange", function () {
        console.log('hash changed')
        window.ga('send', 'pageview', {
            'page': location.pathname + location.search + location.hash
        })
    })
}