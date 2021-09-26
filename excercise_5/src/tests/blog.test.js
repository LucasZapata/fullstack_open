import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'

const blog_example = {
    title: 'example title',
    author: 'somebody',
    url: 'www.meh.com',
    likes: 0
}

describe('blog_test', () => {
    let component
    let mockLike

    beforeEach(() => {
        mockLike = jest.fn()
        component = render(
            <Blog blog={blog_example}  onLike={mockLike}/>
        )})
    test('render_content', () => {
        expect(component.container).toHaveTextContent(blog_example.title)
    })

    test('hide_likes', () => {
        const hidden = component.container.querySelector('.hiddenContent')
        expect(hidden).toHaveStyle('display: none')
    })

    test('show_likes', () => {
        const hidden = component.container.querySelector('.hiddenContent')
        const button = component.getByText('show')
        fireEvent.click(button)
        expect(hidden).not.toHaveStyle('display: none')
    })

    test('likes_button', () => {
        const button = component.container.querySelector('.likeButton')
        fireEvent.click(button)
        fireEvent.click(button)
        expect(mockLike.mock.calls).toHaveLength(2)
    })
})