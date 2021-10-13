import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from '../components/BlogForm'

const blog_example = {
    title: 'example title',
    author: 'somebody',
    url: 'www.meh.com'
}

describe('blog_test', () => {
    let component
    let mockSend

    beforeEach(() => {
        mockSend = jest.fn()
        component = render(
            <BlogForm addBlog={mockSend}/>
        )})
    test('submit_blog', async() => {
        const titleForm = await component.container.querySelector('.titleForm')
        const authorForm = await component.container.querySelector('.authorForm')
        const urlForm = await component.container.querySelector('.urlForm')
        fireEvent.change(titleForm, { target:{ value: blog_example.title } })
        fireEvent.change(authorForm, { target:{ value: blog_example.author } })
        fireEvent.change(urlForm, { target:{ value: blog_example.url } })
        fireEvent.click(component.container.querySelector('.submitButton'))
        console.log('AAAAAAAAAAAAAAAAAA', mockSend.mock.calls)
        expect(mockSend.mock.calls).toHaveLength(1)
        expect(mockSend.mock.calls[0][0]).toEqual(blog_example)
    })
})