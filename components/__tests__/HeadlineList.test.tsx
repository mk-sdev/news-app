import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { useRouter } from 'expo-router'
import HeadlineList from '@/components/home/HeadlineList'
import { News } from '@/utils/types'
import { Colors } from '@/constants/Colors'
import { generateLink } from '@/utils/functions'

// Mockowanie routera
jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}))

describe('HeadlineList', () => {
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
    // Dodaj inne przykładowe wiadomości jeśli potrzebujesz
  ]

  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue({ push: mockPush })
  })

  it('should render the list of news items', () => {
    const { getByText } = render(<HeadlineList newsList={mockNewsList} />)

    expect(getByText('Breaking News')).toBeTruthy()
    expect(getByText('News Source')).toBeTruthy()
    expect(getByText('2024-07-22')).toBeTruthy()
  })

  it('should navigate to the correct link when an item is pressed', () => {
    const { getByText } = render(<HeadlineList newsList={mockNewsList} />)

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
      <HeadlineList newsList={newsListWithoutImages} />
    )

    expect(queryByText('No Image News')).toBeNull()
  })
})
