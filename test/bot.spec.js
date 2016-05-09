/* globals before, should, done, expect */
'use strict';

const Bot = require('../class/bot');

describe('Class Bot', () => {

	beforeEach(() => {
		// nothing
	});

	describe('when creating a new bot', () => {

		it('should take in options', () => {
			let bot = new Bot({foo: 1, bar: 2});
			expect(bot.options).to.exist;
		});

		it('Should require params');

	});

});
