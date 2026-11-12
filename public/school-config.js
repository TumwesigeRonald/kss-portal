/* ---------------------------------------------------------------
   SCHOOL CONFIG — edit this file to change school details used in
   printed documents (report cards, mark sheets, receipts, finance
   reports, teacher-toolbox printouts) and on the login/sidebar.
   Loaded before every other script in index.html.
   Also edit manifest.json (app name) if you rename the school again.
   --------------------------------------------------------------- */
window.SCHOOL = {
    name: 'KALONGO SEED SEC. SCHOOL',
    shortName: 'KSS',
    motto: 'Persevere To Be Sure',
    // Printed under the school name on documents. Leave '' to hide a line.
    address: '',   // e.g. 'P.O BOX 123, KALONGO-UGANDA'
    phone: '',     // e.g. '0700 000000 / 0750 000000'
    idPrefix: 'KSS',
    // Backend API URL. '/api' = same Vercel project as this site (deployed).
    // When the page is opened from localhost on any port other than 5000
    // (e.g. VS Code Live Server on :5500), use the local backend instead.
    backendUrl: (function () {
        var h = location.hostname, p = location.port;
        var local = (h === 'localhost' || h === '127.0.0.1') && p && p !== '5000';
        return local ? 'http://localhost:5000/api' : '/api';
    })()
};
window.SCHOOL.mottoUpper = window.SCHOOL.motto.toUpperCase();

function schoolContactHTML(cls) {
    var a = cls ? ' class="' + cls + '"' : '';
    var out = '';
    if (SCHOOL.address) out += '<p' + a + '>' + SCHOOL.address + '</p>';
    if (SCHOOL.phone) out += '<p' + a + '>TEL: ' + SCHOOL.phone + '</p>';
    return out;
}
function schoolMottoHTML(tag, cls) {
    if (!SCHOOL.motto) return '';
    return '<' + tag + ' class="' + cls + '">&ldquo;' + SCHOOL.mottoUpper + '&rdquo;</' + tag + '>';
}
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-school]').forEach(function (el) {
        var v = SCHOOL[el.getAttribute('data-school')];
        if (v) el.textContent = el.hasAttribute('data-school-quote') ? '\u201C' + v + '\u201D' : v;
    });
});
