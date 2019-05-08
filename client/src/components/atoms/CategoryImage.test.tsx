import React from 'react'
import { render } from 'react-testing-library'
import CategoryImage from './CategoryImage'
import formPublish from '../../data/form-publish.json'

describe('CategoryImage', () => {
    it('renders fallback image', () => {
        const { container } = render(<CategoryImage category={''} />)
        expect(container.firstChild).toBeInTheDocument()
        expect(container.firstChild.style.backgroundImage).toMatch(
            /jellyfish-back/
        )
    })

    it('renders all the category images', () => {
        const { options } = formPublish.dataset.steps[1].fields
            ? formPublish.dataset.steps[1].fields.categories
            : []

        options.map((category: string) => {
            const { container } = render(<CategoryImage category={category} />)
            expect(container.firstChild).toBeInTheDocument()
        })
    })
})
