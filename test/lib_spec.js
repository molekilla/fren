var $ = require('cheerio');
var Fren = require('../lib');
var _ = require('underscore');
var Menio = require('menio');

// add template directory
var menio = new Menio(__dirname + '/../templates');

describe("Loteria spec", function () {

    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 16 * 1000;

    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });


    it("when html is requested, should return a model", function (done) {

        var fren = new Fren();
        var ua = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.102 Safari/537.36';

        var MAIN_URL = 'http://www.idaan.gob.pa',
            BILLING_URL = 'http://www.idaan.gob.pa//';

        fren
            .step({
                name: 'init',
                method: 'get',
                url: BILLING_URL,
                options: {
                    headers: {
                        Referer: MAIN_URL,
                        'User-Agent': ua
                    },
                    jar: true
                },
                reduce: function ($state, response, body) {
                    var init = menio.parse(body, 'idaan');

                    var nodes = {
                        form: {
                            nic: 123456,
                            op: init.op,
                            form_build_id: init.form_build_id,
                            form_id: init.form_id
                        }
                    };

                    return $state.go('bill', {
                        options: nodes
                    });
                }
            })
            .step({
                name: 'bill',
                url: BILLING_URL,
                method: 'post',
                options: {
                    headers: {
                        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                        "Cache-Control": "max-age=0",
                        "Connection": "keep-alive",
                        "Referer": MAIN_URL + '/',
                        "User-Agent": ua
                    },
                    jar: true
                },
                reduce: function ($state, response) {
                    return $state.go('show_bill', {
                        url: response.headers.location
                    });
                }
            })
            .step({
                name: 'show_bill',
                method: 'get',
                options: {
                    jar: true,
                    headers: {
                        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                        "Cache-Control": "max-age=0",
                        "Connection": "keep-alive",
                        "Referer": MAIN_URL + '/',
                        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36"
                    }
                },
                reduce: function ($state, response, body) {
                    try {
                        var bill = menio.parse(body, 'dashboardPart1');

                        expect(bill.dateFormatISO).toBe('es-pa');
                        done();
                    } catch (e) {
                        throw e;
                        done();
                    }
                }
            })
            .start();

    });
});