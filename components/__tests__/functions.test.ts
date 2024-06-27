import { generateLink } from '../../utils/functions'
import { News } from '../../utils/types'

describe('generateLink', () => {
  it('should generate a correct URL based on news object', () => {
    const news: News = {
      title: 'Breaking News',
      urlToImage: 'https://example.com/image.jpg',
      content: 'This is the content of the news.',
      url: 'https://example.com/news',
      author: 'John Doe',
      publishedAt: '2024-07-22T12:34:56Z',
      description: 'This is the description of the news.',
      source:{id: null, name: "name"}
    }

    const expectedLink =
      '/Article?title=Breaking News&urlToImage=https://example.com/image.jpg&content=This is the content of the news.&url=https://example.com/news&author=John Doe&publishedAt=2024-07-22T12:34:56Z&description=This is the description of the news.'

    expect(generateLink(news)).toBe(expectedLink)
  })
})

/****************/

import { removeLastChars } from '../../app/Article' 

describe('removeLastChars', () => {
  it('should remove the last 15 characters from a string longer than 15 characters', () => {
    const input = 'This is a long string that exceeds fifteen characters'
    const expectedOutput = 'This is a long string that exceeds fif'
    expect(removeLastChars(input)).toBe(expectedOutput)
  })

  it('should return an empty string if the input length is exactly 15 characters', () => {
    const input = '123456789012345'
    const expectedOutput = ''
    expect(removeLastChars(input)).toBe(expectedOutput)
  })

  it('should return an empty string if the input length is less than 15 characters', () => {
    const input = 'Short string'
    const expectedOutput = ''
    expect(removeLastChars(input)).toBe(expectedOutput)
  })

  it('should handle an empty string as input', () => {
    const input = ''
    const expectedOutput = ''
    expect(removeLastChars(input)).toBe(expectedOutput)
  })
})
