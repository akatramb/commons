import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { createMemoryHistory, createLocation } from 'history'
import Faucet from './Faucet'
import { User } from '../context'
import { userMockConnected } from '../../__mocks__/user-mock'

const history = createMemoryHistory()
const location = createLocation('/faucet')

const setup = () => {
    const utils = render(
        <User.Provider value={userMockConnected}>
            <MemoryRouter>
                <Faucet
                    history={history}
                    location={location}
                    match={{ params: '', path: '', url: '', isExact: true }}
                />
            </MemoryRouter>
        </User.Provider>
    )
    const button = utils.getByText('Request Ether')
    const { container } = utils
    return {
        button,
        container,
        ...utils
    }
}

describe('Faucet', () => {
    it('renders without crashing', () => {
        const { container } = setup()
        expect(container.firstChild).toBeInTheDocument()
    })

    it('shows actions when connected', () => {
        const { button } = setup()

        expect(button).toBeInTheDocument()
        expect(button).not.toHaveAttribute('disabled')
    })

    it('fires requestFromFaucet', () => {
        const { button, getByText } = setup()

        fireEvent.click(button)
        expect(userMockConnected.requestFromFaucet).toHaveBeenCalledTimes(1)
        // check for spinner
        expect(getByText('Getting Ether...')).toBeInTheDocument()
    })
})
