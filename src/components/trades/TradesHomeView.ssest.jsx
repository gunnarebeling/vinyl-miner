import {render, screen} from "@testing-library/react"
import { TradesHomeView } from "./tradesHomeview"
import { it } from "vitest"

it('should display pending vinyl', () => {
    render(<TradesHomeView/>);
    const message = screen.queryByText(/pending/i)
    expect(message).toBeVisible()
})