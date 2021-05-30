import { expect } from 'chai';

import { timestampToDateTime } from '../../utils/converters';

describe('Converters', () => {
  describe('timestampToDateTime', () => {
    const testCases = [
      {
        value: new Date(
          'Sat Apr 24 2021 14:11:21 GMT+0200 (czas środkowoeuropejski letni)'
        ),
        expected: '2021-4-24 14:11:21',
        msg: 'returns properly formatted DateTime for provided valid DateTime',
      },
      {
        value: new Date('invalid'),
        expected: null,
        msg: 'throws a TypeError if provided DateTime is invalid',
      },
    ];

    testCases.forEach(({ value, expected, msg }) => {
      it(msg, () => {
        if (expected) {
          expect(timestampToDateTime(value)).to.be.equal(expected);
        } else {
          expect(() => timestampToDateTime(value)).to.throw(
            TypeError,
            'Invalid date'
          );
        }
      });
    });
  });
});
