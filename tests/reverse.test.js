const { reverse } = require('../for_testing.js')

test('reverse of isaac', () => {
    const result = reverse('isaac')

    expect(result).toBe('caasi')
})