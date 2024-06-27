import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { useRouter } from 'expo-router'
import TopHeadlineSlider from '@/components/home/TopHeadlineSlider'
import { News } from '@/utils/types'
import { generateLink } from '@/utils/functions'

// Mockowanie useRouter
jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}))

describe('TopHeadlineSlider', () => {
  const mockPush = jest.fn()
  const mockNewsList: News[] = [
    {
      title: 'Breaking News',
      urlToImage: 'https://example.com/image.jpg',
      content: 'Content',
      url: 'https://example.com/news',
      author: 'John Doe',
      publishedAt: '2024-07-22T12:34:56Z',
      description: 'Description',
      source: { id: '1', name: 'News Source' },
    },
    // Możesz dodać więcej elementów, jeśli chcesz
  ]

  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue({ push: mockPush })
  })

  it('should render the list of news items', () => {
    const { getByText } = render(<TopHeadlineSlider newsList={mockNewsList} />)

    expect(getByText('Breaking News')).toBeTruthy()
  })

  it('should call router.push with correct link when an item is pressed', () => {
    const { getByText } = render(<TopHeadlineSlider newsList={mockNewsList} />)

    const newsItem = getByText('Breaking News').parent

    // Sprawdzenie, czy newsItem nie jest null przed próbą użycia fireEvent.press
    if (newsItem) {
      fireEvent.press(newsItem)
      expect(mockPush).toHaveBeenCalledWith(generateLink(mockNewsList[0]))
    } else {
      throw new Error('News item not found')
    }
  })

  it('should not render items without urlToImage', () => {
    const newsListWithoutImages: News[] = [
      {
        title: 'No Image News',
        urlToImage: '',
        content: 'Content',
        url: 'https://example.com/news',
        author: 'John Doe',
        publishedAt: '2024-07-22T12:34:56Z',
        description: 'Description',
        source: { id: '1', name: 'News Source' },
      },
    ]
    const { queryByText } = render(
      <TopHeadlineSlider newsList={newsListWithoutImages} />
    )

    expect(queryByText('No Image News')).toBeNull()
  })
})
