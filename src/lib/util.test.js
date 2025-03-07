import assert from 'assert'
import Del from 'del'
import { GetRequiredPNGImageSizes } from './png-generator.js'
import { GetRequiredFavoriteImageSizes } from './favicon-generator.js'
import { GetRequiredICNSImageSizes } from './icns-generator.js'
import { GetRequiredICOImageSizes } from './ico-generator.js'
import Util from './util.js'

/** @test {Util} */
describe('Util', () => {
  /** @test {Util#createWorkDir} */
  it('createWorkDir', () => {
    const dir = Util.createWorkDir()
    assert(dir)

    Del.sync([dir], { force: true })
  })

  /** @test {Util#filterImagesBySizes} */
  it('filterImagesBySizes', () => {
    const targets = GetRequiredPNGImageSizes().map((size) => {
      return { size: size }
    })

    let actual = GetRequiredICOImageSizes()
    let expected = Util.filterImagesBySizes(targets, actual)
    assert(expected.length === actual.length)

    actual = GetRequiredICNSImageSizes()
    expected = Util.filterImagesBySizes(targets, actual)
    assert(expected.length === actual.length)

    actual = GetRequiredFavoriteImageSizes()
    expected = Util.filterImagesBySizes(targets, actual)
    assert(expected.length === actual.length)
  })

  /** @test {Util#flattenValues} */
  it('flattenValues', () => {
    const values = ['A', 'B', ['C', 'D']]
    const actual = ['A', 'B', 'C', 'D']
    const expected = Util.flattenValues(values)

    assert.deepStrictEqual(expected, actual)
  })
})
